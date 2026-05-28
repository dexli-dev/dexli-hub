// RSS handler tests — bar item 10 mechanical coverage for item 6.
// Invokes the GET handler directly and asserts response shape + XML body.

import { describe, expect, it } from 'vitest';
import { GET } from '../src/routes/blog/rss.xml/+server';
import { POSTS } from '../src/lib/content/blog/index';

async function fetchRss(): Promise<{ status: number; ct: string; xml: string }> {
	const resp = await GET({} as Parameters<typeof GET>[0]);
	return {
		status: resp.status,
		ct: resp.headers.get('content-type') || '',
		xml: await resp.text()
	};
}

describe('/blog/rss.xml endpoint', () => {
	it('returns 200', async () => {
		const r = await fetchRss();
		expect(r.status).toBe(200);
	});

	it('serves application/rss+xml or application/xml', async () => {
		const r = await fetchRss();
		expect(r.ct).toMatch(/application\/(rss\+xml|xml)/);
	});

	it('is well-formed XML with a single rss root', async () => {
		const r = await fetchRss();
		expect(r.xml).toMatch(/^<\?xml version="1.0"/);
		expect(r.xml.match(/<rss\b/g)?.length).toBe(1);
		expect(r.xml.match(/<\/rss>/g)?.length).toBe(1);
		expect(r.xml).toMatch(/<rss version="2\.0">/);
	});

	it('has exactly one channel with required elements', async () => {
		const r = await fetchRss();
		expect(r.xml.match(/<channel>/g)?.length).toBe(1);
		expect(r.xml.match(/<\/channel>/g)?.length).toBe(1);
		expect(r.xml).toMatch(/<title>dexli\.dev blog<\/title>/);
		expect(r.xml).toMatch(/<link>https:\/\/dexli\.dev\/blog<\/link>/);
		expect(r.xml).toMatch(/<description>[^<]+<\/description>/);
		expect(r.xml).toMatch(/<language>en<\/language>/);
	});

	it('has one <item> per registered post (or capped at 50)', async () => {
		const r = await fetchRss();
		const itemCount = (r.xml.match(/<item>/g) || []).length;
		expect(itemCount).toBe(Math.min(POSTS.length, 50));
	});

	it('each item has title + link + description (CDATA) + pubDate (RFC 822) + guid', async () => {
		const r = await fetchRss();
		const items = r.xml.match(/<item>[\s\S]*?<\/item>/g) || [];
		expect(items.length).toBeGreaterThan(0);
		for (const item of items) {
			expect(item).toMatch(/<title>[^<]+<\/title>/);
			expect(item).toMatch(/<link>https:\/\/dexli\.dev\/blog\/[a-z0-9-]+<\/link>/);
			expect(item).toMatch(/<description><!\[CDATA\[[\s\S]+\]\]><\/description>/);
			// RFC 822 pubDate via toUTCString() — "Day, DD Mon YYYY HH:MM:SS GMT"
			expect(item).toMatch(
				/<pubDate>(Mon|Tue|Wed|Thu|Fri|Sat|Sun), \d{2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4} \d{2}:\d{2}:\d{2} GMT<\/pubDate>/
			);
			expect(item).toMatch(/<guid isPermaLink="true">https:\/\/dexli\.dev\/blog\/[a-z0-9-]+<\/guid>/);
		}
	});

	it('items are reverse-chronological (latest first)', async () => {
		const r = await fetchRss();
		const pubDates = [...r.xml.matchAll(/<pubDate>([^<]+)<\/pubDate>/g)].map((m) =>
			Date.parse(m[1])
		);
		expect(pubDates.length).toBe(POSTS.length);
		for (let i = 1; i < pubDates.length; i++) {
			expect(pubDates[i - 1]).toBeGreaterThanOrEqual(pubDates[i]);
		}
	});

	it('guid matches the link for each item (isPermaLink=true contract)', async () => {
		const r = await fetchRss();
		const items = r.xml.match(/<item>[\s\S]*?<\/item>/g) || [];
		for (const item of items) {
			const link = item.match(/<link>([^<]+)<\/link>/)?.[1];
			const guid = item.match(/<guid[^>]*>([^<]+)<\/guid>/)?.[1];
			expect(link).toBe(guid);
		}
	});

	it('caps at MAX_ITEMS=50', async () => {
		const r = await fetchRss();
		const itemCount = (r.xml.match(/<item>/g) || []).length;
		expect(itemCount).toBeLessThanOrEqual(50);
	});
});

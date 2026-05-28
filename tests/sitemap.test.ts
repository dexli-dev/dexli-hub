// Sitemap handler tests — bar item 10 mechanical coverage for item 7.
// CTO nudge 2 explicitly: apex <loc> literal preservation across the
// static→dynamic swap; apex <lastmod> may only move forward to reflect
// the latest post date.

import { describe, expect, it } from 'vitest';
import { GET } from '../src/routes/sitemap.xml/+server';
import { POSTS } from '../src/lib/content/blog/index';

async function fetchSitemap(): Promise<{ status: number; ct: string; xml: string }> {
	const resp = await GET({} as Parameters<typeof GET>[0]);
	return {
		status: resp.status,
		ct: resp.headers.get('content-type') || '',
		xml: await resp.text()
	};
}

describe('/sitemap.xml endpoint', () => {
	it('returns 200', async () => {
		const r = await fetchSitemap();
		expect(r.status).toBe(200);
	});

	it('serves application/xml', async () => {
		const r = await fetchSitemap();
		expect(r.ct).toMatch(/application\/xml/);
	});

	it('is well-formed XML with a single urlset root', async () => {
		const r = await fetchSitemap();
		expect(r.xml).toMatch(/^<\?xml version="1.0"/);
		expect(r.xml.match(/<urlset\b/g)?.length).toBe(1);
		expect(r.xml.match(/<\/urlset>/g)?.length).toBe(1);
	});

	it('apex <loc> literal preserved from D2 (CTO nudge 2)', async () => {
		const r = await fetchSitemap();
		// The apex entry must keep https://dexli.dev/ as its <loc> literal
		// across the static→dynamic swap.
		expect(r.xml).toMatch(/<loc>https:\/\/dexli\.dev\/<\/loc>/);
	});

	it('apex <lastmod> only reflects the latest post date (forward-only)', async () => {
		const r = await fetchSitemap();
		const apexBlock = r.xml.match(/<url>\s*<loc>https:\/\/dexli\.dev\/<\/loc>[\s\S]*?<\/url>/);
		expect(apexBlock).toBeTruthy();
		const lastmod = apexBlock?.[0].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
		expect(lastmod).toBeTruthy();
		// Lastmod >= the D2 baseline 2026-05-28; tightens against a future
		// regression that would shrink it.
		expect(Date.parse(lastmod!)).toBeGreaterThanOrEqual(Date.parse('2026-05-28'));
	});

	it('includes /blog index URL', async () => {
		const r = await fetchSitemap();
		expect(r.xml).toMatch(/<loc>https:\/\/dexli\.dev\/blog<\/loc>/);
	});

	it('includes one entry per registered post', async () => {
		const r = await fetchSitemap();
		for (const post of POSTS) {
			const expected = `https://dexli.dev/blog/${post.metadata.slug}`;
			expect(r.xml).toContain(`<loc>${expected}</loc>`);
		}
	});

	it('total URL count = 2 + posts (apex + /blog + each post)', async () => {
		const r = await fetchSitemap();
		const locCount = (r.xml.match(/<loc>/g) || []).length;
		expect(locCount).toBe(2 + POSTS.length);
	});

	it('all <loc> values are absolute https URLs', async () => {
		const r = await fetchSitemap();
		const locs = [...r.xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
		expect(locs.length).toBeGreaterThan(0);
		for (const loc of locs) {
			expect(loc).toMatch(/^https:\/\/dexli\.dev\//);
		}
	});

	it('every <url> entry has a <lastmod>', async () => {
		const r = await fetchSitemap();
		const urls = r.xml.match(/<url>[\s\S]*?<\/url>/g) || [];
		for (const url of urls) {
			expect(url).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}/);
		}
	});

	it('per-post <lastmod> matches metadata datePublished or dateModified', async () => {
		const r = await fetchSitemap();
		for (const post of POSTS) {
			const expected = post.metadata.dateModified ?? post.metadata.datePublished;
			const slugBlock = r.xml.match(
				new RegExp(
					`<loc>https://dexli\\.dev/blog/${post.metadata.slug}</loc>\\s*<lastmod>([^<]+)</lastmod>`
				)
			);
			expect(slugBlock).toBeTruthy();
			expect(slugBlock?.[1]).toBe(expected);
		}
	});
});

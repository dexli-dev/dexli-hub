// Live-HTML walk tests — bar item 10:
//   * Tests covering items 1, 2 (route rendering)
//   * Item 3 (Wordmark + footer component-level inheritance)
//   * Item 4 (per-page metadata cardinality)
//   * Item 5 (JSON-LD shape, Article + CollectionPage)
//   * Item 9 (substrate refinements — 9a single meta description,
//             9c parallel analytics-snippet cardinality via CTO nudge 1)
//
// Approach: globalSetup spawns the production `node build/index.js` server
// on 127.0.0.1:3300; these tests fetch live HTML and assert against it.
// "Headless browser pass" — implemented as fetch + regex/string assertions
// against SSR-rendered HTML rather than a layout-rendering browser, because
// puppeteer-core would require touching package.json (engineer-out-of-scope
// per CTO scope list). The mechanical assertions a browser-walk would make
// on the SSR HTML — DOM presence, attribute values, cardinality — are all
// string-derivable from the served response without a JS engine.
//
// 2026-05-29 content integration: placeholder stubs replaced with real
// CEO-authored posts. Routes derive from POSTS dynamically; per-post slug
// assertions pick the first POST; typography 11-element coverage moved
// to a non-published fixture (see tests/typography-coverage.test.ts).

import { describe, expect, it, beforeAll } from 'vitest';
import { POSTS } from '../src/lib/content/blog/index';

let baseUrl: string;

beforeAll(() => {
	baseUrl = process.env.TEST_SERVER_URL || 'http://127.0.0.1:3300';
});

async function fetchHtml(path: string): Promise<{ status: number; html: string }> {
	const resp = await fetch(`${baseUrl}${path}`);
	return { status: resp.status, html: await resp.text() };
}

function countOccurrences(haystack: string, needleRegex: RegExp): number {
	return (haystack.match(needleRegex) || []).length;
}

// Routes walked for cardinality / inheritance / negative-oracle assertions.
// Derived from POSTS so the suite tracks the registry without per-cycle
// hardcoded slug maintenance.
const POST_ROUTES = POSTS.map((p) => `/blog/${p.metadata.slug}`);
const ROUTES_FOR_CARDINALITY = ['/blog', ...POST_ROUTES];
const FIRST_POST = POSTS[0]; // newest post (registry is reverse-chronological)
const FIRST_POST_ROUTE = `/blog/${FIRST_POST.metadata.slug}`;

describe('route rendering — bar items 1 + 2', () => {
	it('GET /blog returns 200 with reverse-chrono listing', async () => {
		const r = await fetchHtml('/blog');
		expect(r.status).toBe(200);
		expect(r.html).toMatch(/<h1[^>]*>blog<\/h1>/i);
		const slugLinks = [...r.html.matchAll(/href="\/blog\/([a-z0-9-]+)"/g)].map((m) => m[1]);
		// Every registered post appears in the listing
		for (const post of POSTS) {
			expect(slugLinks).toContain(post.metadata.slug);
		}
		// Reverse-chrono: POSTS registry order is reverse-chronological;
		// the slugs in the listing should appear in the same order.
		const orderedSlugs = POSTS.map((p) => p.metadata.slug);
		const slugLinkOrder = orderedSlugs.map((s) => slugLinks.indexOf(s));
		for (let i = 1; i < slugLinkOrder.length; i++) {
			expect(slugLinkOrder[i - 1]).toBeLessThan(slugLinkOrder[i]);
		}
	});

	it('each /blog entry has visible date + datetime attribute + reading time', async () => {
		const r = await fetchHtml('/blog');
		// One <time datetime="YYYY-MM-DD..."> per registered post
		const timeEls = r.html.match(/<time\s+datetime="\d{4}-\d{2}-\d{2}[^"]*"[^>]*>/g) || [];
		expect(timeEls.length).toBeGreaterThanOrEqual(POSTS.length);
		// One "X min read" reading time per post
		const readingTime = r.html.match(/\d+ min read/g) || [];
		expect(readingTime.length).toBeGreaterThanOrEqual(POSTS.length);
	});

	it('GET /blog/[slug] returns 200 with H1, time, reading-time, body', async () => {
		const r = await fetchHtml(FIRST_POST_ROUTE);
		expect(r.status).toBe(200);
		// H1 contains the post title (escape any regex specials)
		const escapedTitle = FIRST_POST.metadata.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		expect(r.html).toMatch(new RegExp(`<h1[^>]*>${escapedTitle}<\\/h1>`));
		// Time element with the post's datePublished
		const dateOnly = FIRST_POST.metadata.datePublished.slice(0, 10);
		expect(r.html).toMatch(new RegExp(`<time\\s+datetime="${dateOnly}[^"]*"[^>]*>`));
		// Reading-time string present
		expect(r.html).toMatch(/\d+ min read/);
		// Body has at least one paragraph (per-element typography coverage
		// is exercised by tests/typography-coverage.test.ts against the
		// non-published fixture).
		expect(r.html).toMatch(/<p[\s>]/);
	});

	it('GET /blog/[unknown-slug] returns 404', async () => {
		const r = await fetchHtml('/blog/this-slug-does-not-exist');
		expect(r.status).toBe(404);
	});
});

describe('Wordmark + footer inheritance — bar item 3', () => {
	it.each(ROUTES_FOR_CARDINALITY)('Wordmark renders at topbar position on %s', async (path) => {
		const r = await fetchHtml(path);
		expect(r.html).toMatch(/<header class="topbar wrap[^"]*">[\s\S]*?<a class="brand[^"]*"/);
		// Family-level glyph ❖ verbatim — no per-page glyph variation
		expect(r.html).toMatch(/<span class="logo[^"]*"[^>]*>❖<\/span>/);
		// Distinct from every sibling glyph
		const wordmarkBlock = r.html.match(/<a class="brand[^"]*"[\s\S]*?<\/a>/)?.[0] || '';
		expect(wordmarkBlock).not.toMatch(/[⌁◷∋]/);
	});

	it.each(ROUTES_FOR_CARDINALITY)('Footer DOM matches apex — link inventory + locked literals on %s', async (path) => {
		const r = await fetchHtml(path);
		// Same outer class
		expect(r.html).toMatch(/<footer class="foot wrap[^"]*">/);
		// `.self` literal containing dexli.dev
		expect(r.html).toMatch(/<span class="self[^"]*">dexli\.dev<\/span>/);
		// All 3 sibling hrefs with rel="external" (allow Svelte's scoped class suffix
		// after the rel attribute — bar oracle is href + rel + text content, not no-attrs)
		for (const sibling of ['webhook', 'cron', 'regex']) {
			expect(r.html).toMatch(
				new RegExp(
					`<a\\s+href="https://${sibling}\\.dexli\\.dev"\\s+rel="external"[^>]*>${sibling}\\.dexli\\.dev</a>`
				)
			);
		}
		// `.dim` literal "2026 · dexli.dev"
		expect(r.html).toMatch(/<span class="dim[^"]*">2026 · dexli\.dev<\/span>/);
	});
});

describe('SEO singleton cardinality — bar item 4', () => {
	const SINGLETONS = [
		{ name: 'title', regex: /<title[^>]*>[\s\S]*?<\/title>/g },
		{ name: 'meta description', regex: /<meta\s+name="description"[^>]*>/g },
		{ name: 'canonical', regex: /<link\s+rel="canonical"[^>]*>/g },
		{ name: 'meta robots', regex: /<meta\s+name="robots"[^>]*>/g },
		{ name: 'og:title', regex: /<meta\s+property="og:title"[^>]*>/g },
		{ name: 'og:description', regex: /<meta\s+property="og:description"[^>]*>/g },
		{ name: 'og:url', regex: /<meta\s+property="og:url"[^>]*>/g },
		{ name: 'og:type', regex: /<meta\s+property="og:type"[^>]*>/g },
		{ name: 'og:image', regex: /<meta\s+property="og:image"[^>]*>/g },
		{ name: 'twitter:card', regex: /<meta\s+name="twitter:card"[^>]*>/g },
		{ name: 'twitter:title', regex: /<meta\s+name="twitter:title"[^>]*>/g },
		{ name: 'twitter:description', regex: /<meta\s+name="twitter:description"[^>]*>/g }
	];

	for (const route of ROUTES_FOR_CARDINALITY) {
		describe(`route ${route}`, () => {
			it.each(SINGLETONS)(`has exactly one $name`, async ({ name, regex }) => {
				const r = await fetchHtml(route);
				const count = countOccurrences(r.html, regex);
				expect(count, `${name} count on ${route}`).toBe(1);
			});
		});
	}

	it('canonical href matches the route (absolute)', async () => {
		for (const route of ROUTES_FOR_CARDINALITY) {
			const r = await fetchHtml(route);
			const canonical = r.html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/)?.[1];
			expect(canonical).toBe(`https://dexli.dev${route}`);
		}
	});

	it('og:type is "website" on /blog index and "article" on per-post', async () => {
		const idx = await fetchHtml('/blog');
		expect(idx.html).toMatch(/<meta\s+property="og:type"\s+content="website"/);

		const post = await fetchHtml(FIRST_POST_ROUTE);
		expect(post.html).toMatch(/<meta\s+property="og:type"\s+content="article"/);
	});

	it('twitter:card is summary_large_image on all routes', async () => {
		for (const route of ROUTES_FOR_CARDINALITY) {
			const r = await fetchHtml(route);
			expect(r.html).toMatch(/<meta\s+name="twitter:card"\s+content="summary_large_image"/);
		}
	});

	it('meta robots is index,follow on all routes', async () => {
		for (const route of ROUTES_FOR_CARDINALITY) {
			const r = await fetchHtml(route);
			expect(r.html).toMatch(/<meta\s+name="robots"\s+content="index,follow"/);
		}
	});
});

describe('JSON-LD shape — bar item 5', () => {
	it('every route has exactly one application/ld+json block', async () => {
		for (const route of ROUTES_FOR_CARDINALITY) {
			const r = await fetchHtml(route);
			const count = countOccurrences(
				r.html,
				/<script\s+type="application\/ld\+json">/g
			);
			expect(count, `JSON-LD count on ${route}`).toBe(1);
		}
	});

	it('/blog JSON-LD is @type=CollectionPage with required fields', async () => {
		const r = await fetchHtml('/blog');
		const ld = r.html.match(/<script\s+type="application\/ld\+json">([\s\S]+?)<\/script>/)?.[1];
		expect(ld).toBeTruthy();
		const parsed = JSON.parse(ld!);
		expect(parsed['@type']).toBe('CollectionPage');
		expect(parsed.name).toBeTruthy();
		expect(parsed.url).toBe('https://dexli.dev/blog');
		expect(parsed.description).toBeTruthy();
		// extends D2 WebSite pattern via isPartOf
		expect(parsed.isPartOf?.['@type']).toBe('WebSite');
	});

	it('/blog/[slug] JSON-LD is @type=Article with all seven required fields', async () => {
		const r = await fetchHtml(FIRST_POST_ROUTE);
		const ld = r.html.match(/<script\s+type="application\/ld\+json">([\s\S]+?)<\/script>/)?.[1];
		expect(ld).toBeTruthy();
		const parsed = JSON.parse(ld!);
		expect(parsed['@type']).toBe('Article');
		expect(parsed.headline).toBe(FIRST_POST.metadata.title);
		expect(parsed.datePublished).toBe(FIRST_POST.metadata.datePublished);
		const expectedModified =
			FIRST_POST.metadata.dateModified ?? FIRST_POST.metadata.datePublished;
		expect(parsed.dateModified).toBe(expectedModified);
		expect(parsed.author).toEqual({ '@type': 'Organization', name: 'dexli.dev' });
		expect(parsed.publisher).toEqual({ '@type': 'Organization', name: 'dexli.dev' });
		expect(parsed.mainEntityOfPage).toBe(`https://dexli.dev${FIRST_POST_ROUTE}`);
		// image must match og:image
		const ogImage = r.html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/)?.[1];
		expect(parsed.image).toBe(ogImage);
	});
});

describe('substrate refinement parity — bar item 9', () => {
	it('item 9(a): live HTML at every blog route has exactly one <meta name="description">', async () => {
		for (const route of ROUTES_FOR_CARDINALITY) {
			const r = await fetchHtml(route);
			const count = countOccurrences(r.html, /<meta\s+name="description"[^>]*>/g);
			expect(count, `meta description count on ${route}`).toBe(1);
		}
	});

	it('item 9(c) — analytics-snippet count on /blog equals count on / equals 1 (CTO nudge 1)', async () => {
		// Original D3 oracle was "ANALYTICS_SLOT literal appears exactly
		// once per surface" (the empty-marker stage). After M wired
		// Umami 2026-05-29, the marker was replaced by the real
		// `<script defer src="https://analytics.innersyntax.dev/script.js"
		// data-website-id="aca6a030-619f-438b-b3a6-ec73425b598e"></script>`
		// snippet. Same cardinality discipline — exactly-one, present on
		// every surface — pointed at the live identifier instead of the
		// placeholder. The data-website-id literal is specific enough to
		// avoid false-positives against unrelated content.
		const ANALYTICS_NEEDLE = /data-website-id="aca6a030-619f-438b-b3a6-ec73425b598e"/g;
		const apex = await fetchHtml('/');
		const blogIdx = await fetchHtml('/blog');
		const post = await fetchHtml(FIRST_POST_ROUTE);
		const apexCount = countOccurrences(apex.html, ANALYTICS_NEEDLE);
		const blogIdxCount = countOccurrences(blogIdx.html, ANALYTICS_NEEDLE);
		const postCount = countOccurrences(post.html, ANALYTICS_NEEDLE);
		expect(apexCount).toBe(1);
		expect(blogIdxCount).toBe(1);
		expect(postCount).toBe(1);
		expect(blogIdxCount).toBe(apexCount);
		expect(postCount).toBe(apexCount);
	});
});

describe('out-of-scope DOM-absence — bar item 13', () => {
	const FORBIDDEN = [
		{ name: 'comment form / widget', regex: /<form\b|class="[^"]*comment/i },
		{ name: 'syntax-highlight classes', regex: /class="[^"]*(?:language-|hljs-|token-)/i },
		{ name: 'search input', regex: /<input\b[^>]*type="search"|role="search"/i },
		{ name: 'author byline element', regex: /class="[^"]*(?:byline|author)\b|rel="author"/i },
		{ name: 'share buttons', regex: /class="[^"]*share\b|data-share/i },
		{ name: 'pagination controls', regex: /class="[^"]*pagination\b|aria-label="[^"]*pagination/i },
		{ name: 'tag/category nav', regex: /class="[^"]*(?:tags?|categor)\b|aria-label="(?:[^"]*tags?|categor)/i }
	];

	for (const route of ROUTES_FOR_CARDINALITY) {
		describe(`route ${route}`, () => {
			it.each(FORBIDDEN)(`does not contain $name`, async ({ name, regex }) => {
				const r = await fetchHtml(route);
				expect(r.html, `${name} appeared on ${route}`).not.toMatch(regex);
			});
		});
	}
});

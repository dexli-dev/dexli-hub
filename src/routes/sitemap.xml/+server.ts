// Dynamic sitemap.xml — apex + /blog + every /blog/[slug]. Replaces the
// static/sitemap.xml apex-only file from D2; the static file is removed in
// the same commit. Per CTO nudge: apex <loc> literal preserved; the only
// change to apex <lastmod> is reflecting the latest post date (the
// site's most-recent-content date moves whenever a post is added).

import type { RequestHandler } from './$types';
import { POSTS } from '$lib/content/blog';

const ORIGIN = 'https://dexli.dev';
const APEX_BASELINE_LASTMOD = '2026-05-28';

export const GET: RequestHandler = () => {
	const latestPostDate =
		POSTS.length > 0 ? POSTS[0].metadata.datePublished : APEX_BASELINE_LASTMOD;
	const apexLastmod =
		latestPostDate > APEX_BASELINE_LASTMOD ? latestPostDate : APEX_BASELINE_LASTMOD;

	const postEntries = POSTS.map((p) => {
		const lastmod = p.metadata.dateModified ?? p.metadata.datePublished;
		return `
	<url>
		<loc>${ORIGIN}/blog/${p.metadata.slug}</loc>
		<lastmod>${lastmod}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.6</priority>
	</url>`;
	}).join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>${ORIGIN}/</loc>
		<lastmod>${apexLastmod}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>1.0</priority>
	</url>
	<url>
		<loc>${ORIGIN}/blog</loc>
		<lastmod>${latestPostDate}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
	</url>${postEntries}
</urlset>
`;

	return new Response(xml, {
		headers: {
			'content-type': 'application/xml; charset=utf-8',
			'cache-control': 'public, max-age=3600'
		}
	});
};

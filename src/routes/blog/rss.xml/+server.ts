// RSS 2.0 feed at /blog/rss.xml. Reverse-chronological. Max 50 items per
// channel cap. Each <description> wrapped in CDATA so the post excerpt can
// contain HTML-significant characters without entity-escaping.

import type { RequestHandler } from './$types';
import { POSTS } from '$lib/content/blog';

const ORIGIN = 'https://dexli.dev';
const CHANNEL_TITLE = 'dexli.dev blog';
const CHANNEL_DESCRIPTION =
	'Notes from building the dexli.dev tiny-tools family — implementation choices, browser-side techniques, occasional postmortems.';
const MAX_ITEMS = 50;

function escapeXmlText(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function safeCdata(s: string): string {
	// CDATA cannot contain the literal terminator `]]>`. Split it across two
	// CDATA sections if present so the excerpt remains intact.
	return s.replace(/]]>/g, ']]]]><![CDATA[>');
}

function rfc822(iso: string): string {
	// `toUTCString()` returns RFC 7231 IMF-fixdate which is compatible with
	// RFC 822 / RFC 1123 `pubDate` per the RSS 2.0 spec.
	return new Date(iso).toUTCString();
}

export const GET: RequestHandler = () => {
	const items = POSTS.slice(0, MAX_ITEMS)
		.map((p) => {
			const link = `${ORIGIN}/blog/${p.metadata.slug}`;
			return `
		<item>
			<title>${escapeXmlText(p.metadata.title)}</title>
			<link>${link}</link>
			<description><![CDATA[${safeCdata(p.metadata.excerpt)}]]></description>
			<pubDate>${rfc822(p.metadata.datePublished)}</pubDate>
			<guid isPermaLink="true">${link}</guid>
		</item>`;
		})
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
	<channel>
		<title>${escapeXmlText(CHANNEL_TITLE)}</title>
		<link>${ORIGIN}/blog</link>
		<description>${escapeXmlText(CHANNEL_DESCRIPTION)}</description>
		<language>en</language>${items}
	</channel>
</rss>
`;

	return new Response(xml, {
		headers: {
			'content-type': 'application/rss+xml; charset=utf-8',
			'cache-control': 'public, max-age=3600'
		}
	});
};

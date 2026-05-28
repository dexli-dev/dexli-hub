<script module lang="ts">
	import type { PostMetadata } from './types';

	export const metadata: PostMetadata = {
		title: 'Placeholder: typography reference (1 of 2)',
		slug: 'placeholder-typography-reference-1-of-2',
		datePublished: '2026-05-27',
		excerpt:
			'Placeholder body exercising every typography element the blog renderer supports — headings, paragraphs, code, lists, quotes, links.',
		wordCount: 235
	};
</script>

<p>
	This is placeholder copy, not a real post. It exists so the blog framework
	can render every typography element the rendering pipeline supports before
	any actual writing lands. <em>Replace before public dissemination.</em>
</p>

<h2>Why the placeholder exists</h2>

<p>
	The blog framework went live with two of these so we could verify the
	pipeline end-to-end: routing, metadata, RSS, sitemap, and — most importantly
	— the visual rendering of every element the renderer accepts. A
	<strong>typography-only</strong> proof keeps the verification scope narrow.
</p>

<h3>What this file exercises</h3>

<p>
	A paragraph, a heading-2, a heading-3, an inline <code>example.code</code>
	span, a fenced block, a blockquote, an ordered list, an unordered list, a
	link, italic, and bold.
</p>

<pre><code>const lorem = "ipsum dolor sit amet";
const consectetur = "adipiscing elit, sed do eiusmod";
const tempor = lorem + " " + consectetur;
console.log(tempor.length);
</code></pre>

<blockquote>
	Quotation goes here. The width should match the body column; the left rule
	should be visible at the family palette's muted weight. — placeholder
</blockquote>

<h3>An ordered list</h3>

<ol>
	<li>Lorem ipsum dolor sit amet.</li>
	<li>Consectetur adipiscing elit.</li>
	<li>Sed do eiusmod tempor incididunt.</li>
</ol>

<h3>An unordered list</h3>

<ul>
	<li>Ut labore et dolore magna aliqua.</li>
	<li>Ut enim ad minim veniam.</li>
	<li>Quis nostrud exercitation ullamco.</li>
</ul>

<p>
	A link to a sibling tool —
	<a href="https://regex.dexli.dev" rel="external">regex.dexli.dev</a> — to
	prove anchor styling against the family palette.
</p>

<p>
	The remaining elements: <em>emphasis</em> and <strong>strong emphasis</strong>,
	both inline within a regular paragraph, both inheriting the body face.
</p>

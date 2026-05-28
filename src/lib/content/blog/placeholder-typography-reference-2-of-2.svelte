<script module lang="ts">
	import type { PostMetadata } from './types';

	export const metadata: PostMetadata = {
		title: 'Placeholder: typography reference (2 of 2)',
		slug: 'placeholder-typography-reference-2-of-2',
		datePublished: '2026-05-28',
		excerpt:
			'Second placeholder body — same elements as the first, slightly different filler. Confirms repeated rendering of the typography pipeline.',
		wordCount: 220
	};
</script>

<p>
	A second placeholder. This file exists for the same reason as the first —
	to keep the typography pipeline under regression coverage — and is
	<strong>not publication content</strong>. Both stubs are replaced before
	any real writing lands at this URL.
</p>

<h2>The element inventory, again</h2>

<p>
	One paragraph, a heading-2, a heading-3, an inline <code>code.span</code>,
	a fenced code block, a blockquote, an ordered list, an unordered list, a
	link, italic, and bold. The same elements as the previous stub, with
	different filler so a diff between the two pages is visible.
</p>

<h3>The fenced block</h3>

<pre><code>function greet(name) &lbrace;
  return "hello, " + name;
&rbrace;
greet("placeholder");
</code></pre>

<h3>A short quotation</h3>

<blockquote>
	The blockquote element exists. Its style should be steady and unornamented;
	if it looks loud, the rule wins over the body. — placeholder
</blockquote>

<h3>Ordered list — second instance</h3>

<ol>
	<li>First step is identifying the placeholder.</li>
	<li>Second step is replacing it with content.</li>
	<li>Third step is removing the placeholder file from the repository.</li>
</ol>

<h3>Unordered list — second instance</h3>

<ul>
	<li>Bullet one carries unstructured filler.</li>
	<li>Bullet two carries unstructured filler.</li>
	<li>Bullet three carries unstructured filler.</li>
</ul>

<p>
	A link, for the second time —
	<a href="https://webhook.dexli.dev" rel="external">webhook.dexli.dev</a> —
	confirming anchor styling on this page matches the first stub's render.
</p>

<p>
	One closing paragraph with <em>italic emphasis</em> and
	<strong>strong emphasis</strong> inline, completing the second pass over
	the renderer-supported element set.
</p>

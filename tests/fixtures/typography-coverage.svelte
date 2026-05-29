<!--
	Non-published typography-coverage fixture. Exists to document + enforce
	the 11 typography elements the blog renderer accepts.

	Per CEO recommendation 2026-05-29 (post-D3 ship, real-post content
	integration): the placeholder stubs originally exercised every element
	on one page. Once placeholders left, real posts collectively used ~7
	of the 11 — h3/code/pre/blockquote/ol unused. This fixture is not
	registered as a published post (lives under `tests/fixtures/`, not
	`src/lib/content/blog/`); the registry's `import.meta.glob` does not
	see it. It exists purely so that a future post adding `<blockquote>`
	or `<pre><code>` has documented evidence the renderer supports the
	element with a test that fails loudly if the supported set is
	silently narrowed.

	The test that reads this file (tests/typography-coverage.test.ts)
	asserts each of the 11 elements appears at least once below. If you
	ever need to add a new typography element to the supported set, add
	it here AND extend the test.
-->

<script lang="ts">
	// Intentionally empty — this fixture is consumed as source text by the
	// typography-coverage test rather than rendered. No module-level
	// metadata since this is not a registered post.
</script>

<p>Paragraph element. Inline <em>emphasis</em>, <strong>strong</strong>, and an
<a href="https://example.test/" rel="external">anchor</a>. An inline
<code>example.code</code> span exercises the inline-code path.</p>

<h2>H2 heading</h2>

<p>Body paragraph after an h2.</p>

<h3>H3 heading</h3>

<p>Body paragraph after an h3.</p>

<pre><code>const lorem = "ipsum";
const consectetur = "adipiscing elit";
console.log(lorem + " " + consectetur);
</code></pre>

<blockquote>
	A blockquote element. Width matches the body column; the left rule
	renders at the family palette's muted weight.
</blockquote>

<ol>
	<li>Ordered list item one.</li>
	<li>Ordered list item two.</li>
	<li>Ordered list item three.</li>
</ol>

<ul>
	<li>Unordered list item one.</li>
	<li>Unordered list item two.</li>
	<li>Unordered list item three.</li>
</ul>

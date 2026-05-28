<script lang="ts" module>
	// Per-post SEO + JSON-LD. Cardinality discipline per bar item 4: each
	// meta singleton declared exactly-once; the `{#key}` block forces remount
	// across slug changes so the SSR cardinality holds on every navigation.
	// JSON-LD type is Article with the seven required Article fields.

	const ORIGIN = 'https://dexli.dev';
	const SHARED_OG_IMAGE = `${ORIGIN}/og-card.png`;
	const ORGANIZATION = {
		'@type': 'Organization' as const,
		name: 'dexli.dev'
	};

	function formatDate(iso: string): string {
		const d = new Date(iso);
		return d.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			timeZone: 'UTC'
		});
	}
</script>

<script lang="ts">
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import { findBySlug } from '$lib/content/blog';

	let { data } = $props();

	// Resolve the body component fresh from the registry (server + client see
	// the same import.meta.glob set). The loader already ensured this slug
	// exists, so the non-null assertion is safe here.
	const Body = $derived(findBySlug(data.slug)!.component);

	const seoTitle = $derived(`${data.metadata.title} · dexli.dev`);
	const canonicalUrl = $derived(`${ORIGIN}/blog/${data.slug}`);
	const articleDescription = $derived(data.metadata.excerpt);
	const dateModified = $derived(data.metadata.dateModified ?? data.metadata.datePublished);

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: data.metadata.title,
		datePublished: data.metadata.datePublished,
		dateModified,
		author: ORGANIZATION,
		publisher: ORGANIZATION,
		mainEntityOfPage: canonicalUrl,
		image: SHARED_OG_IMAGE
	});
</script>

<svelte:head>
	<title>{seoTitle}</title>
	<meta name="description" content={articleDescription} />
	<link rel="canonical" href={canonicalUrl} />
	<meta name="robots" content="index,follow" />

	<meta property="og:type" content="article" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={seoTitle} />
	<meta property="og:description" content={articleDescription} />
	<meta property="og:image" content={SHARED_OG_IMAGE} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={seoTitle} />
	<meta name="twitter:description" content={articleDescription} />

	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<div class="page">
	<SiteHeader />

	<main class="wrap">
		<article class="post">
			<header class="post-header">
				<p class="back"><a href="/blog">← blog</a></p>
				<h1 class="post-title">{data.metadata.title}</h1>
				<div class="meta">
					<time datetime={data.metadata.datePublished}>
						{formatDate(data.metadata.datePublished)}
					</time>
					<span aria-hidden="true">·</span>
					<span class="reading-time">{data.readingTimeMin} min read</span>
				</div>
			</header>

			<div class="body">
				<Body />
			</div>
		</article>
	</main>

	<SiteFooter />
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background:
			radial-gradient(800px 420px at 78% -10%, var(--accent-glow), transparent 60%),
			radial-gradient(900px 500px at 8% 110%, rgba(198, 241, 53, 0.05), transparent 60%);
	}
	.wrap {
		width: 100%;
		max-width: var(--maxw);
		margin: 0 auto;
		padding: 0 24px;
	}
	main {
		flex: 1;
		padding-top: 8px;
		padding-bottom: 56px;
	}

	.post {
		max-width: 68ch;
		margin: 0 auto;
	}

	.post-header {
		padding-top: 32px;
		padding-bottom: 32px;
		border-bottom: 1px solid var(--border-soft);
		margin-bottom: 32px;
	}
	.back {
		font-family: var(--mono);
		font-size: 13px;
		color: var(--muted);
		margin: 0 0 24px 0;
	}
	.back a {
		color: var(--muted);
	}
	.back a:hover {
		color: var(--accent);
	}
	.post-title {
		font-family: var(--display);
		font-size: clamp(32px, 5vw, 44px);
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1.1;
		margin: 0 0 18px 0;
	}
	.meta {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px;
		font-family: var(--mono);
		font-size: 12px;
		color: var(--text-faint);
	}
	.meta time,
	.meta .reading-time {
		color: var(--muted);
	}

	/* Body typography — drives item 2 / item 3 family-typography render. */
	.body :global(h2) {
		font-family: var(--display);
		font-size: 26px;
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.2;
		margin: 40px 0 14px 0;
	}
	.body :global(h3) {
		font-family: var(--display);
		font-size: 20px;
		font-weight: 700;
		letter-spacing: -0.01em;
		line-height: 1.25;
		margin: 28px 0 10px 0;
	}
	.body :global(p) {
		font-family: var(--display);
		font-size: 16px;
		line-height: 1.65;
		color: var(--fg);
		margin: 0 0 18px 0;
	}
	.body :global(a) {
		color: var(--accent);
	}
	.body :global(strong) {
		font-weight: 800;
		color: var(--fg);
	}
	.body :global(em) {
		font-style: italic;
	}
	.body :global(code) {
		font-family: var(--mono);
		font-size: 0.9em;
		background: var(--surface-2);
		padding: 2px 6px;
		border-radius: var(--radius-sm);
		color: var(--fg);
	}
	.body :global(pre) {
		background: var(--surface-2);
		border: 1px solid var(--border-soft);
		border-radius: var(--radius);
		padding: 16px 18px;
		margin: 0 0 20px 0;
		overflow-x: auto;
		max-width: 100%;
	}
	.body :global(pre code) {
		background: transparent;
		padding: 0;
		border-radius: 0;
		font-size: 13px;
		line-height: 1.55;
		color: var(--fg);
		white-space: pre;
	}
	.body :global(blockquote) {
		margin: 0 0 20px 0;
		padding: 4px 0 4px 20px;
		border-left: 3px solid var(--accent-dim);
		font-family: var(--display);
		font-size: 16px;
		line-height: 1.6;
		color: var(--muted);
		font-style: italic;
	}
	.body :global(ol),
	.body :global(ul) {
		font-family: var(--display);
		font-size: 16px;
		line-height: 1.65;
		color: var(--fg);
		padding-left: 24px;
		margin: 0 0 20px 0;
	}
	.body :global(li) {
		margin-bottom: 6px;
	}
</style>

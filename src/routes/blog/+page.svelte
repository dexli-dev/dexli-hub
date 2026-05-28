<script lang="ts" module>
	// SEO surface for /blog index per bar items 4 + 5.
	// Cardinality discipline: each meta singleton declared exactly-once below.
	// JSON-LD CollectionPage extending D2's WebSite pattern via `isPartOf`.
	const SEO = {
		title: 'Blog · dexli.dev',
		description:
			'Notes and writing from the dexli.dev tiny-tools family — implementation choices, browser-side techniques, and the occasional postmortem.',
		url: 'https://dexli.dev/blog',
		ogImage: 'https://dexli.dev/og-card.png'
	};
	const JSON_LD = {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: SEO.title,
		url: SEO.url,
		description: SEO.description,
		isPartOf: {
			'@type': 'WebSite',
			name: 'dexli.dev',
			url: 'https://dexli.dev/'
		}
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

	let { data } = $props();
</script>

<svelte:head>
	<title>{SEO.title}</title>
	<meta name="description" content={SEO.description} />
	<link rel="canonical" href={SEO.url} />
	<meta name="robots" content="index,follow" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={SEO.url} />
	<meta property="og:title" content={SEO.title} />
	<meta property="og:description" content={SEO.description} />
	<meta property="og:image" content={SEO.ogImage} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={SEO.title} />
	<meta name="twitter:description" content={SEO.description} />

	<link rel="alternate" type="application/rss+xml" title="dexli.dev blog" href="/blog/rss.xml" />

	{@html `<script type="application/ld+json">${JSON.stringify(JSON_LD)}</script>`}
</svelte:head>

<div class="page">
	<SiteHeader />

	<main class="wrap">
		<section class="hero" aria-label="introduction">
			<h1>blog</h1>
			<p class="lede">
				Notes from building the dexli.dev tiny-tools family — implementation choices, browser-side
				techniques, occasional postmortems.
			</p>
		</section>

		<section class="listing" aria-label="post listing">
			{#if data.posts.length === 0}
				<p class="empty">No posts yet.</p>
			{:else}
				<ol class="posts" reversed>
					{#each data.posts as post (post.slug)}
						<li class="post-entry">
							<h2 class="post-title">
								<a href="/blog/{post.slug}">{post.title}</a>
							</h2>
							<div class="meta">
								<time datetime={post.datePublished}>{formatDate(post.datePublished)}</time>
								<span aria-hidden="true">·</span>
								<span class="reading-time">{post.readingTimeMin} min read</span>
							</div>
							<p class="excerpt">{post.excerpt}</p>
						</li>
					{/each}
				</ol>
			{/if}
		</section>
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

	.hero {
		padding-top: 48px;
		padding-bottom: 32px;
		max-width: 720px;
	}
	.hero h1 {
		font-family: var(--display);
		font-size: clamp(36px, 6vw, 56px);
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1.05;
		margin-bottom: 18px;
	}
	.lede {
		font-family: var(--display);
		font-size: clamp(16px, 2vw, 18px);
		font-weight: 500;
		line-height: 1.5;
		color: var(--muted);
		margin: 0;
	}

	.listing {
		padding-top: 8px;
	}
	.posts {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}
	.post-entry {
		border-top: 1px solid var(--border-soft);
		padding: 28px 0;
	}
	.post-entry:last-child {
		border-bottom: 1px solid var(--border-soft);
	}
	.post-title {
		font-family: var(--display);
		font-size: clamp(22px, 3vw, 28px);
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.15;
		margin: 0 0 10px 0;
	}
	.post-title a {
		color: var(--fg);
		text-decoration: none;
	}
	.post-title a:hover {
		color: var(--accent);
	}
	.meta {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px;
		font-family: var(--mono);
		font-size: 12px;
		color: var(--text-faint);
		margin-bottom: 12px;
	}
	.meta time {
		color: var(--muted);
	}
	.meta .reading-time {
		color: var(--muted);
	}
	.excerpt {
		margin: 0;
		font-family: var(--display);
		font-size: 15px;
		line-height: 1.55;
		color: var(--muted);
		max-width: 65ch;
	}
	.empty {
		font-family: var(--mono);
		color: var(--text-faint);
		padding: 24px 0;
	}
</style>

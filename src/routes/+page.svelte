<script lang="ts" module>
	// SEO surface — per bar item 7. Apex hub is a Schema.org WebSite (the
	// container site for the per-sibling WebApplication siblings), not a
	// WebApplication itself. SearchAction skipped per CTO clarification:
	// hub has no search surface, so a SearchAction would be ornamental.
	const SEO = {
		title: 'dexli — tiny tools · dexli.dev',
		description:
			'Single-page tools that fit in your URL. State serialises into the address bar — bookmark, share, walk away. No accounts, no editor, no install.',
		url: 'https://dexli.dev/',
		ogImage: 'https://dexli.dev/og-card.png'
	};
	const JSON_LD = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'dexli.dev',
		url: SEO.url,
		description: SEO.description
	};
</script>

<script lang="ts">
	// dexli.dev apex hub — D2 cycle scope.
	//
	// CTO SCAFFOLD: this file is the engineer onboarding surface. Two slots
	// marked below — Wordmark/brand-shell (CTO-owned, do not edit), and the
	// hub `<main>` body (FRONTEND slice). The bar's brand-inheritance oracle
	// (item 4) is satisfied by the Wordmark render regardless of what
	// frontend builds in the middle. Footer (item 5) is FRONTEND slice
	// (sibling-link content is per-sibling-tailored — engineer-domain).
	//
	// Bar items engineer fills inside <main>:
	//   1 hub page exists + comprehensible in 5 seconds
	//   2 tool index — 3 visible cards (webhook + cron + regex)
	//   3 anti-IDE positioning copy (foreground, tight, NOT manifesto)
	//   6 D3-blog nav-link placeholder
	//   7 SEO surface meta tags via <svelte:head>
	//   9 mobile 375px reachable + stacked cards
	//
	// Item 4 (Wordmark + family glyph) — kept scaffold default '❖' (diamond,
	// multifaceted index). It composes cleanly at brand-tile size next to
	// the lime sibling-glyph tiles below in main, and reads distinctly
	// from ⌁ / ◷ / ∋ at every size tested.
	//
	// Item 8 (Umami slot) — wired in app.html 2026-05-29 with the
	// production Umami snippet (analytics.innersyntax.dev/script.js +
	// data-website-id literal). Parity test in tests/routes-html.test.ts
	// asserts exactly-one occurrence per surface.
	import Wordmark from '$lib/components/Wordmark.svelte';
	import ToolCard from '$lib/components/ToolCard.svelte';
	import { FAMILY } from '@dexli/family';

	// Apex tools index auto-renders from the @dexli/family registry per
	// CEO two-flag lock 2026-05-29 (see [[feedback_family_brand_template]]).
	// Filter: published === true && apexCard !== null. The narrowing helper
	// `hasApexCard` lets TypeScript see the non-null branch inside the map.
	// Future ventures register in dexli-family and flip `published: true +
	// apexCard: {...}` at ship moment — apex inherits the new card slot
	// automatically via the next submodule pin bump.
	const TOOLS = Object.values(FAMILY)
		.filter((sib) => sib.display.published && sib.display.apexCard !== null)
		.map((sib) => ({
			glyph: sib.display.apexCard!.glyph,
			name: sib.display.apexCard!.title,
			purpose: sib.display.apexCard!.tagline,
			href: sib.baseUrl + sib.path
		}));
</script>

<svelte:head>
	<title>{SEO.title}</title>
	<meta name="description" content={SEO.description} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="dexli.dev" />
	<meta property="og:url" content={SEO.url} />
	<meta property="og:title" content={SEO.title} />
	<meta property="og:description" content={SEO.description} />
	<meta property="og:image" content={SEO.ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={SEO.title} />
	<meta name="twitter:description" content={SEO.description} />
	<meta name="twitter:image" content={SEO.ogImage} />

	<link rel="canonical" href={SEO.url} />

	{@html `<script type="application/ld+json">${JSON.stringify(JSON_LD)}</script>`}
</svelte:head>

<div class="page">
	<!-- BRAND-SHELL :: CTO-owned. Frontend may add nav controls AROUND the
	     Wordmark in the header (D3-blog nav-link per item 6); do not
	     remove or replace the Wordmark itself. -->
	<header class="topbar wrap">
		<Wordmark />
		<nav class="nav" aria-label="primary">
			<a class="nav-link" href="/blog">blog</a>
		</nav>
	</header>

	<!-- HUB BODY :: FRONTEND slice. Build bar items 1, 2, 3 inside <main>
	     plus item 6 nav-link placeholder + item 7 SEO meta in
	     <svelte:head> above + item 9 mobile cards-stack-vertically. -->
	<main class="wrap" data-engineer-slot="hub">
		<section class="hero" aria-label="introduction">
			<h1>tiny tools. one URL each.</h1>
			<p class="lede">
				Single-page tools where the state serialises into the address bar — bookmark, share,
				walk away. No accounts, no editor, no install.
			</p>
		</section>

		<section class="tools" aria-label="tool index">
			<ul class="cards">
				{#each TOOLS as tool (tool.name)}
					<li>
						<ToolCard
							glyph={tool.glyph}
							name={tool.name}
							purpose={tool.purpose}
							href={tool.href}
						/>
					</li>
				{/each}
			</ul>
		</section>
	</main>

	<!-- FAMILY-FOOTER :: FRONTEND slice per bar item 5 (sibling-link
	     content is engineer-content). Should surface "dexli.dev family"
	     identity + links to webhook.dexli.dev + cron.dexli.dev +
	     regex.dexli.dev. -->
	<footer class="foot wrap">
		<span class="family">
			The <span class="self">dexli.dev</span> tiny-tools family —
			<a href="https://webhook.dexli.dev" rel="external">webhook.dexli.dev</a>
			·
			<a href="https://cron.dexli.dev" rel="external">cron.dexli.dev</a>
			·
			<a href="https://regex.dexli.dev" rel="external">regex.dexli.dev</a>
			·
			<a href="https://diff.dexli.dev" rel="external">diff.dexli.dev</a>
		</span>
		<span class="dim">2026 · dexli.dev</span>
	</footer>
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
	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding-top: 22px;
		padding-bottom: 22px;
	}
	.nav {
		display: flex;
		gap: 18px;
	}
	.nav-link {
		font-family: var(--mono);
		font-size: 13px;
		font-weight: 500;
		color: var(--muted);
		padding: 8px 4px;
		min-height: 44px;
		display: inline-flex;
		align-items: center;
	}
	.nav-link:hover {
		color: var(--accent);
		text-decoration: none;
	}
	main {
		flex: 1;
		padding-top: 8px;
		padding-bottom: 56px;
	}

	.hero {
		padding-top: 56px;
		padding-bottom: 40px;
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

	.tools {
		padding-top: 8px;
	}
	.cards {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}
	.cards li {
		display: contents;
	}

	.foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		flex-wrap: wrap;
		padding-top: 18px;
		padding-bottom: 26px;
		border-top: 1px solid var(--border-soft);
		font-size: 12px;
		color: var(--muted);
	}
	.foot .family {
		color: var(--muted);
	}
	.foot .family .self {
		color: var(--fg);
		font-weight: 700;
	}
	.foot .family a {
		color: var(--accent);
	}
	.foot .dim {
		color: var(--text-faint);
	}

	@media (max-width: 880px) {
		.cards {
			grid-template-columns: 1fr;
		}
		.hero {
			padding-top: 36px;
		}
	}
	@media (max-width: 640px) {
		.wrap {
			padding: 0 14px;
		}
		.topbar {
			flex-wrap: wrap;
			gap: 10px;
		}
		.foot {
			flex-direction: column;
			align-items: flex-start;
			gap: 8px;
		}
	}
</style>

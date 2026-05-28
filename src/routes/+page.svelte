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
	// Item 4 (Wordmark + family glyph) — CTO scaffold's Wordmark default is
	// '❖' (diamond — multifaceted index); frontend may override the glyph
	// prop if they pick differently, but the choice must be distinct from
	// every shipped sibling's glyph (⌁ / ◷ / ∋). Wordmark.svelte's comment
	// block names the rule.
	//
	// Item 8 (Umami slot) — already in app.html as <!-- ANALYTICS_SLOT -->.
	// Single grep-discoverable location; no active script.
	import Wordmark from '$lib/components/Wordmark.svelte';
</script>

<svelte:head>
	<title>dexli — tiny tools · dexli.dev</title>
</svelte:head>

<div class="page">
	<!-- BRAND-SHELL :: CTO-owned. Frontend may add nav controls AROUND the
	     Wordmark in the header (D3-blog nav-link per item 6); do not
	     remove or replace the Wordmark itself. -->
	<header class="topbar wrap">
		<Wordmark />
		<!-- FRONTEND: nav controls here — at minimum a /blog placeholder
		     link per bar item 6. -->
	</header>

	<!-- HUB BODY :: FRONTEND slice. Build bar items 1, 2, 3 inside <main>
	     plus item 6 nav-link placeholder + item 7 SEO meta in
	     <svelte:head> above + item 9 mobile cards-stack-vertically. -->
	<main class="wrap" data-engineer-slot="hub">
		<!-- TODO(frontend): anti-IDE positioning copy + 3 tool cards
		     (webhook, cron, regex). Cards per item 2: sibling name +
		     glyph + one-line purpose + click-through link to
		     https://<sibling>.dexli.dev. -->
	</main>

	<!-- FAMILY-FOOTER :: FRONTEND slice per bar item 5 (sibling-link
	     content is engineer-content). Should surface "dexli.dev family"
	     identity + links to webhook.dexli.dev + cron.dexli.dev +
	     regex.dexli.dev. -->
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
		padding-top: 22px;
		padding-bottom: 22px;
	}
	main {
		flex: 1;
		padding-top: 8px;
		padding-bottom: 56px;
	}
</style>

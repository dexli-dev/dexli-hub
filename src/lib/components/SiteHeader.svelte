<script lang="ts">
	// Shared topbar for blog routes. DOM structure intentionally matches the
	// apex hub's topbar verbatim (Wordmark in same first-child position, /blog
	// nav-link in same second-child position) so item 3 "Wordmark renders at
	// same DOM position" holds across pages. Apex hub keeps its inline copy of
	// the same markup — extracting on apex too is a future scaffold refactor.
	import Wordmark from './Wordmark.svelte';
</script>

<header class="topbar wrap">
	<Wordmark />
	<nav class="nav" aria-label="primary">
		<a class="nav-link" href="/blog">blog</a>
	</nav>
</header>

<style>
	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding-top: 22px;
		padding-bottom: 22px;
	}
	.wrap {
		width: 100%;
		max-width: var(--maxw);
		margin: 0 auto;
		padding: 0 24px;
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
	@media (max-width: 640px) {
		.wrap {
			padding: 0 14px;
		}
		.topbar {
			flex-wrap: wrap;
			gap: 10px;
		}
	}
</style>

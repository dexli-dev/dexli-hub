<script lang="ts">
	// Shared family footer for blog routes. DOM matches the apex hub footer
	// verbatim per item 3 ("link inventory + locked literals identical"):
	// same outer class, same `.family` + `.self` + 3 sibling anchors with
	// rel="external" + same trailing `.dim` literal. Apex hub keeps its
	// inline copy; extracting on apex too is a future scaffold refactor.
</script>

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

<style>
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
	.wrap {
		width: 100%;
		max-width: var(--maxw);
		margin: 0 auto;
		padding: 0 24px;
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
	@media (max-width: 640px) {
		.wrap {
			padding: 0 14px;
		}
		.foot {
			flex-direction: column;
			align-items: flex-start;
			gap: 8px;
		}
	}
</style>

<script lang="ts">
	// Sibling tool card for the apex hub index. Visual language mirrors the
	// OG share cards (lime tile + glyph + wordmark + tagline) so the family
	// brand reads consistently across cards, OGs, and per-sibling wordmarks.
	// Whole card is the click-through link per bar item 2.

	interface Props {
		glyph: string;
		name: string;
		purpose: string;
		href: string;
	}
	let { glyph, name, purpose, href }: Props = $props();
</script>

<a class="card" {href} rel="external">
	<span class="tile" aria-hidden="true">{glyph}</span>
	<div class="text">
		<div class="name">{name}<span class="tld">.dexli.dev</span></div>
		<div class="purpose">{purpose}</div>
	</div>
	<span class="arrow" aria-hidden="true">→</span>
</a>

<style>
	.card {
		display: flex;
		align-items: center;
		gap: 18px;
		padding: 20px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--surface);
		color: var(--fg);
		text-decoration: none;
		min-height: 44px;
		transition:
			border-color 0.15s ease,
			background 0.15s ease,
			transform 0.15s ease;
	}
	.card:hover {
		border-color: var(--accent-dim);
		background: var(--surface-2);
		text-decoration: none;
	}
	.card:hover .arrow {
		transform: translateX(3px);
		color: var(--accent);
	}
	.card:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}
	.tile {
		display: grid;
		place-items: center;
		width: 56px;
		height: 56px;
		flex-shrink: 0;
		border-radius: var(--radius);
		background: var(--accent);
		color: var(--bg);
		font-family: var(--display);
		font-size: 32px;
		font-weight: 800;
		line-height: 1;
		box-shadow: 0 0 28px -8px var(--accent-glow);
	}
	.text {
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
		flex: 1;
	}
	.name {
		font-family: var(--display);
		font-size: 22px;
		font-weight: 800;
		letter-spacing: -0.01em;
		line-height: 1.1;
	}
	.tld {
		color: var(--text-faint);
		font-weight: 700;
	}
	.purpose {
		font-size: 13px;
		color: var(--muted);
		line-height: 1.4;
	}
	.arrow {
		font-family: var(--mono);
		font-size: 20px;
		color: var(--text-faint);
		flex-shrink: 0;
		transition:
			transform 0.15s ease,
			color 0.15s ease;
	}
</style>

<script lang="ts">
	// Parametric site wordmark — apex hub variant. Inherits the dexli.dev
	// tiny-tools family Wordmark shape (per webhook / cron / regex
	// Wordmarks); differs only in name/domain/glyph defaults.
	//
	// Glyph rule (bar item 4 D2): the apex hub's family-level glyph must
	// be distinct from every per-sibling glyph:
	//   webhook.dexli.dev → '⌁' (zigzag bolt — trigger/event)
	//   cron.dexli.dev    → '◷' (clock quadrant — schedule/time)
	//   regex.dexli.dev   → '∋' (contains-as-member — matches/membership)
	//   diff.dexli.dev    → reserved-future
	//   dexli.dev (apex)  → '❖' (diamond — multifaceted index / collection)
	//
	// Engineer (frontend) call on the glyph default if they want a
	// different choice. Suggested: '❖' as multifaceted-index OR '※' as
	// see-also-collection. Whichever default, the comment block above must
	// reflect the final choice + assert distinctness from siblings.

	interface Props {
		name?: string;
		domain?: string;
		/** Family-level glyph in the logo tile. Default per bar item 4 above. */
		glyph?: string;
		/** Where the wordmark links to. Root of the site by default. */
		href?: string;
	}
	let { name = 'dexli', domain = '.dev', glyph = '❖', href = '/' }: Props = $props();
</script>

<a class="brand" {href}>
	<span class="logo" aria-hidden="true">{glyph}</span>
	<span class="text">{name}<span class="tld">{domain}</span></span>
</a>

<style>
	.brand {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		color: var(--text);
		font-weight: 700;
		font-size: 15px;
		letter-spacing: -0.01em;
	}
	.brand:hover {
		text-decoration: none;
	}
	.logo {
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		border-radius: 8px;
		background: var(--accent);
		color: #0a0b0d;
		font-size: 18px;
		box-shadow: 0 0 24px -6px var(--accent-glow);
	}
	.tld {
		color: var(--text-faint);
	}
</style>

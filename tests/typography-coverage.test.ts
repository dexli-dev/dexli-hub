// Typography styling coverage — reads the PRODUCTION blog-post stylesheet
// and asserts a `.body :global(<element>)` rule exists for each element the
// renderer accepts. The real defect this guards against: someone deletes
// or accidentally drops one of the rules + a future post using that
// element renders unstyled.
//
// Originally lived inside the per-post route test (against a placeholder
// stub) per D3. After real posts replaced the stubs, the actual content
// used only ~7 of the 11 elements, so the coverage moved out of the
// per-post route assertion. The first version of this file read a
// throwaway fixture's own source — vacuously self-confirming, touched
// zero production code. Per nora-32 2026-05-29: point the test at the
// real production stylesheet. Adversarial mutation proof: temporarily
// drop a `.body :global(...)` rule from the production file, run the
// test, watch it FAIL on the dropped element, restore. Captured before
// resubmit.

import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const STYLE_SOURCE_PATH = resolve(HERE, '../src/routes/blog/[slug]/+page.svelte');
const STYLE_SOURCE = readFileSync(STYLE_SOURCE_PATH, 'utf-8');

// The 12 selectors the per-post stylesheet must include. Each is a
// `.body :global(<element>) {` selector that scopes the rule's effect
// to the rendered post body (Svelte's `:global` escape from
// component-scoped CSS so the rule reaches markup the renderer emits
// from the post .svelte file).
//
// If you genuinely need to add a new element to the accepted typography
// surface, extend this list AND add the matching .body :global() rule
// to src/routes/blog/[slug]/+page.svelte's <style> block. The lockstep
// keeps "documented surface" and "actually styled surface" identical.
const REQUIRED_SELECTORS = [
	'.body :global(h2)',
	'.body :global(h3)',
	'.body :global(p)',
	'.body :global(a)',
	'.body :global(strong)',
	'.body :global(em)',
	'.body :global(code)',
	'.body :global(pre)',
	'.body :global(pre code)',
	'.body :global(blockquote)',
	'.body :global(ol)',
	'.body :global(ul)'
];

describe('blog renderer typography coverage (production stylesheet)', () => {
	it.each(REQUIRED_SELECTORS)('stylesheet contains rule for %s', (selector) => {
		expect(
			STYLE_SOURCE,
			`production stylesheet at src/routes/blog/[slug]/+page.svelte is missing rule for ${selector}`
		).toContain(selector);
	});

	it('test reads from the production route file path', () => {
		const normalized = STYLE_SOURCE_PATH.replace(/\\/g, '/');
		expect(normalized).toContain('src/routes/blog/[slug]/+page.svelte');
	});
});

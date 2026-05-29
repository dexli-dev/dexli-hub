// Typography element coverage — non-published fixture asserting the 11
// elements the blog renderer accepts. Originally lived inside the
// per-post route test (against a placeholder stub) per D3. After real
// posts replaced the stubs, the actual content used only ~7 of the 11
// elements, so the coverage moved here per CEO 2026-05-29.
//
// The fixture (tests/fixtures/typography-coverage.svelte) is NOT a
// registered blog post — it lives outside `src/lib/content/blog/` so
// `import.meta.glob` does not pick it up. This test reads it as source
// text + asserts every element appears at least once. If you add a new
// typography element to the supported set, extend the fixture AND
// extend this test in lockstep.

import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURE_PATH = resolve(HERE, 'fixtures/typography-coverage.svelte');

const SUPPORTED_ELEMENTS = [
	{ name: 'paragraph', pattern: /<p[\s>]/ },
	{ name: 'h2', pattern: /<h2[\s>]/ },
	{ name: 'h3', pattern: /<h3[\s>]/ },
	{ name: 'inline code', pattern: /<code[\s>]/ },
	{ name: 'pre code block', pattern: /<pre[\s>][\s\S]*?<code/ },
	{ name: 'blockquote', pattern: /<blockquote[\s>]/ },
	{ name: 'ordered list', pattern: /<ol[\s>]/ },
	{ name: 'unordered list', pattern: /<ul[\s>]/ },
	{ name: 'anchor', pattern: /<a\s+href=/ },
	{ name: 'emphasis', pattern: /<em[\s>]/ },
	{ name: 'strong', pattern: /<strong[\s>]/ }
];

describe('blog renderer typography coverage (fixture-backed, non-published)', () => {
	const fixtureSrc = readFileSync(FIXTURE_PATH, 'utf-8');

	it.each(SUPPORTED_ELEMENTS)(
		'fixture exercises $name at least once',
		({ name, pattern }) => {
			expect(fixtureSrc, `${name} missing from typography fixture`).toMatch(pattern);
		}
	);

	it('fixture is NOT in the published registry (lives outside src/lib/content/blog/)', () => {
		// Normalize path separators so the test is cross-platform.
		const normalized = FIXTURE_PATH.replace(/\\/g, '/');
		expect(normalized).toContain('tests/fixtures');
		expect(normalized).not.toContain('src/lib/content/blog');
	});
});

// Registry tests — bar item 10 mechanical coverage for items 1, 2.
// Asserts the slug→entry mapping + reverse-chronological ordering + reading
// time math. These shape assertions back the route-renders bars (the routes
// consume what the registry exports).

import { describe, expect, it } from 'vitest';
import { POSTS, findBySlug, readingTimeMinutes } from '../src/lib/content/blog/index';

describe('blog post registry', () => {
	it('has at least the two stub posts (bar item 8)', () => {
		expect(POSTS.length).toBeGreaterThanOrEqual(2);
	});

	it('is sorted reverse-chronologically by datePublished', () => {
		for (let i = 1; i < POSTS.length; i++) {
			const prev = Date.parse(POSTS[i - 1].metadata.datePublished);
			const curr = Date.parse(POSTS[i].metadata.datePublished);
			expect(prev).toBeGreaterThanOrEqual(curr);
		}
	});

	it('every post has the required metadata fields', () => {
		for (const post of POSTS) {
			expect(post.metadata.title).toBeTruthy();
			expect(post.metadata.slug).toBeTruthy();
			expect(post.metadata.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}/);
			expect(post.metadata.excerpt).toBeTruthy();
			expect(post.metadata.excerpt.length).toBeLessThanOrEqual(140);
			expect(post.metadata.wordCount).toBeGreaterThan(0);
		}
	});

	it('every post has a renderable Svelte component', () => {
		for (const post of POSTS) {
			expect(typeof post.component).toBe('function');
		}
	});

	it('slugs are unique', () => {
		const slugs = POSTS.map((p) => p.metadata.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});

	it('slugs are kebab-case with no date prefix (settled product call 2)', () => {
		for (const post of POSTS) {
			expect(post.metadata.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
			expect(post.metadata.slug).not.toMatch(/^\d{4}-\d{2}-\d{2}-/);
		}
	});

	it('both stubs are clearly labeled as placeholder (item 8)', () => {
		const stubs = POSTS.filter((p) => p.metadata.title.toLowerCase().includes('placeholder'));
		expect(stubs.length).toBeGreaterThanOrEqual(2);
	});
});

describe('findBySlug', () => {
	it('returns the entry for an existing slug', () => {
		const first = POSTS[0];
		const found = findBySlug(first.metadata.slug);
		expect(found).toBeDefined();
		expect(found?.metadata.slug).toBe(first.metadata.slug);
	});

	it('returns undefined for an unknown slug', () => {
		expect(findBySlug('definitely-not-a-real-post')).toBeUndefined();
	});
});

describe('readingTimeMinutes (200 wpm divider)', () => {
	it('rounds up at the 200wpm threshold', () => {
		expect(readingTimeMinutes(1)).toBe(1);
		expect(readingTimeMinutes(200)).toBe(1);
		expect(readingTimeMinutes(201)).toBe(2);
		expect(readingTimeMinutes(400)).toBe(2);
		expect(readingTimeMinutes(401)).toBe(3);
	});

	it('never returns below 1 minute', () => {
		expect(readingTimeMinutes(0)).toBe(1);
	});
});

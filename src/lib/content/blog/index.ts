// Blog post registry. Each post is a `.svelte` file in this directory with
// a `<script module>` block exporting `metadata: PostMetadata`. The registry
// reads every sibling `.svelte` eagerly at build time via `import.meta.glob`
// and exposes a reverse-chronological list plus a slug→entry resolver.
//
// Build-time enumeration means both server and client see the same set, so
// the slug resolver can run on either side without a hydration mismatch.

import type { Component } from 'svelte';
import type { PostMetadata } from './types';

interface PostModule {
	metadata: PostMetadata;
	default: Component;
}

export interface RegistryEntry {
	metadata: PostMetadata;
	component: Component;
}

const modules = import.meta.glob<PostModule>('./*.svelte', { eager: true });

const entries: RegistryEntry[] = Object.values(modules).map((m) => ({
	metadata: m.metadata,
	component: m.default
}));

export const POSTS: RegistryEntry[] = [...entries].sort(
	(a, b) => Date.parse(b.metadata.datePublished) - Date.parse(a.metadata.datePublished)
);

export function findBySlug(slug: string): RegistryEntry | undefined {
	return POSTS.find((p) => p.metadata.slug === slug);
}

const WORDS_PER_MINUTE = 200;

export function readingTimeMinutes(wordCount: number): number {
	return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

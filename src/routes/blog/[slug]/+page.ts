// /blog/[slug] loader. Resolves the slug to a registry entry; throws 404 if
// the slug isn't published. Returns metadata only — the component body is
// resolved fresh inside +page.svelte via the same registry (functions
// can't survive load → page serialisation on the SSR→client boundary).

import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { findBySlug, readingTimeMinutes } from '$lib/content/blog';

export const load: PageLoad = ({ params }) => {
	const entry = findBySlug(params.slug);
	if (!entry) {
		throw error(404, 'Post not found');
	}
	return {
		slug: params.slug,
		metadata: entry.metadata,
		readingTimeMin: readingTimeMinutes(entry.metadata.wordCount)
	};
};

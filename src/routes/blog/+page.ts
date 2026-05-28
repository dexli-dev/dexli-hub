// /blog index loader. Returns reverse-chrono post listing with computed
// reading time. Component bodies are not serialised — the index doesn't
// render them, only their metadata.

import type { PageLoad } from './$types';
import { POSTS, readingTimeMinutes } from '$lib/content/blog';

export const load: PageLoad = () => {
	return {
		posts: POSTS.map((p) => ({
			title: p.metadata.title,
			slug: p.metadata.slug,
			datePublished: p.metadata.datePublished,
			excerpt: p.metadata.excerpt,
			readingTimeMin: readingTimeMinutes(p.metadata.wordCount)
		}))
	};
};

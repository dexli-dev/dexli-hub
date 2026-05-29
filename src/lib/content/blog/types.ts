// Post metadata contract — exported from every blog post `.svelte` file's
// `<script module>` block. The registry index reads `metadata` named export
// from each module via `import.meta.glob`.

export interface PostMetadata {
	/** Human-readable post title. Used in <h1>, <title>, og:title, RSS <title>. */
	title: string;
	/** URL slug — must match the route `/blog/[slug]`. Kebab-case, no date prefix. */
	slug: string;
	/** ISO-8601 publication date (YYYY-MM-DD acceptable; full timestamp ok). */
	datePublished: string;
	/** ISO-8601 last-modified date. Falls back to datePublished when omitted. */
	dateModified?: string;
	/** ≤160-char summary shown in /blog index + used as RSS <description>.
	 *  (D3 originally specified ≤140; relaxed during 2026-05-29 content
	 *  integration to accommodate real-post excerpt sizing while keeping
	 *  the constraint compact-rendering-friendly.) */
	excerpt: string;
	/** Body word count, manually authored. Drives reading-time at 200 wpm. */
	wordCount: number;
}

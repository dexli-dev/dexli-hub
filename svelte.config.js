import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		// `@dexli/family` import alias points at the canonical TS entry
		// of the family library at vendored/dexli-family/, pinned as a
		// git submodule (see .gitmodules). Same alias as tinywebhook +
		// diff-dexli consumers, so apex auto-render code reads
		// identically to sibling consumer code.
		alias: {
			'@dexli/family': './vendored/dexli-family/src/index.ts'
		},
		// Apex hub has no webhook-receiver surface — every state-changing
		// path originates in our own UI. SvelteKit's default origin-based
		// CSRF check is what we want, so we keep the default
		// (checkOrigin: true). Diverges from tinywebhook, which had to
		// disable CSRF to accept cross-origin webhooks.
		//
		// Strict CSP — auto mode emits per-page nonces/hashes for SvelteKit's
		// hydration inline scripts, so `script-src 'self'` holds without
		// 'unsafe-inline' for scripts. Inline style attributes from Svelte
		// components still need 'unsafe-inline' for style only — non-
		// exploitable when no untrusted content is rendered as HTML.
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				// `https://analytics.innersyntax.dev` allowed for the Umami
				// analytics snippet wired in app.html (M deployed Umami at
				// that origin 2026-05-29). Same allowlist in connect-src so
				// the script's POST-back telemetry isn't CSP-blocked.
				'script-src': ['self', 'https://analytics.innersyntax.dev'],
				'style-src': ['self', 'unsafe-inline'],
				'img-src': ['self', 'data:'],
				'font-src': ['self', 'data:'],
				'connect-src': ['self', 'https://analytics.innersyntax.dev'],
				'object-src': ['none'],
				'frame-ancestors': ['none'],
				'base-uri': ['none'],
				'form-action': ['self']
			}
		}
	}
};

export default config;

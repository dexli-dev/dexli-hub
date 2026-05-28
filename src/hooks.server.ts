// Global server hook — adds non-CSP hardening headers to every response (the
// CSP header itself is emitted by SvelteKit per svelte.config.js
// kit.csp configuration).
//
// Three always-on hardening headers:
//   - X-Content-Type-Options: nosniff  (no MIME-sniffing surprises)
//   - Referrer-Policy:       no-referrer  (don't leak the cron expression
//                                          in the URL via Referer)
//   - X-Frame-Options:       DENY  (no clickjacking embed)
//
// DIVERGENCE FROM TINYWEBHOOK — Cache-Control: no-store is intentionally
// OMITTED here.
//
// Tinywebhook forced no-store on every response because dashboard pages
// contained per-inbox secrets (Bearer keys held in localStorage, captured
// webhook bodies). The apex hub has no secrets — it's a static index of
// sibling tools + positioning copy. Default cache semantics serve the
// product: CDN edge caching absorbs popular hits, repeat visits render
// from disk cache instantly, and the no-store machinery would cost UX
// for no safety gain.
//
// If a future surface introduces per-user state (sign-in, drafts,
// personalised content), revisit this decision on a per-route basis
// rather than reinstating a blanket no-store.

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	const headers = response.headers;

	if (!headers.has('X-Content-Type-Options')) {
		headers.set('X-Content-Type-Options', 'nosniff');
	}
	if (!headers.has('Referrer-Policy')) {
		headers.set('Referrer-Policy', 'no-referrer');
	}
	if (!headers.has('X-Frame-Options')) {
		headers.set('X-Frame-Options', 'DENY');
	}

	return response;
};

# Contributing — dexli-hub

D2 cycle commit attribution rules. Bar item 11 worker-attribution uses
N-scaling per the regex-patch v2 banked methodology: large-N (>5) =
≥70% engineer; small-N (≤5) = substance check (engineer materially
produces user-outcome; CTO commits in scaffold/brand/deploy domains;
no CTO absorption of engineer-domain work).

This is a single-repo cycle, so the cross-repo substance gate banked at
D1 close (`[[feedback_cross_repo_substance_gate]]`) doesn't apply here —
standard single-repo N-scaling governs.

## Roles

- **frontend** — page composition (`+page.svelte`), anti-IDE positioning
  copy, tool index cards (3 sibling cards), footer family-identity +
  sibling links, SEO surface content (titles + meta + OG/Twitter +
  JSON-LD WebSite + sitemap.xml + robots.txt + Umami slot content),
  D3-blog nav-link placeholder, mobile 375px layout, glyph choice for
  Wordmark per bar item 4 distinctness rule. Owns `src/routes/**/*` +
  any new `src/lib/components/**/*` other than `Wordmark.svelte`.
- **scaffold** — CTO-only. Repo tooling (`package.json`, `tsconfig.json`,
  `vite.config.ts`, `.gitignore`, this file, `README.md`, `app.css`
  family palette, `fonts.css`, `Wordmark.svelte` brand component,
  `hooks.server.ts` security headers, `svelte.config.js` CSP).

## Commit convention

**Subject prefix (primary signal):**

```
feat(frontend): D2 hub composition + 3 tool cards + positioning copy
fix(frontend): D3-blog placeholder href correction
test(frontend): sibling card click-through targets verified
feat(scaffold): D2 scaffold — Wordmark + palette + Dockerfile
chore(infra): npm scripts hygiene
```

**Body trailer (unambiguous backup; REQUIRED on every non-trivial commit):**

```
Engineer: frontend
```

Allowed values: `frontend`, `scaffold`. Engineer-attributable: `frontend`.
CTO-attributable: `scaffold`.

A commit's bucket is determined by:

1. Read the subject's parenthesised tag. If it's `frontend` or `scaffold`,
   that's the bucket.
2. If the subject lacks a recognised tag, read the body for an
   `Engineer:` line. The value is the bucket.
3. If both are missing, the commit is unattributable and counts against
   the eval ratio (assume CTO).

## Trivial-exclusion list

Excluded from the bar-item-11 N denominator. Use these subject prefixes
freely without an Engineer trailer:

- `chore(deps): …` — dependency bumps from package manager
- `chore(lockfile): …` — lockfile-only updates
- `style: …` — whitespace / formatting / lint
- `chore(version): …` — version stamps

## Between-cycle commits (`wip(<workstream>):`)

Between-cycle work that lands in this repo between formal cycle dispatches
uses `wip(<workstream>):` subject prefix. **Drop the `Engineer:` body
trailer on `wip(...)` commits** per the family-level convention banked
in dexli-family's CONTRIBUTING.md: the trailer is the scope-discriminator
that flags "this commit belongs to a cycle's attribution audit"; between-
cycle work explicitly stays out of that scope.

## Workflow

1. Engineer works in a git worktree inside the repo at
   `.worktrees/{branch}` (per `[[multi-nora-workflow]]` CLAUDE.md rule
   2026-05-28).
2. Branch name: `frontend/D2`.
3. CTO scaffolds + reviews + merges. Engineer pushes branch; CTO
   ff-merges when bar oracles hold.
4. Frozen tag `D2/submit-K` at submit; no force-push between submit and
   verdict.

## Family convention inheritance

Per `[[feedback_family_level_convention_consolidation]]`: when a
convention change requires content-identical diffs across multiple
sibling repos (CLAUDE.md updates, workflow rule changes, security policy,
etc.), the canonical version lives in dexli-family. This repo's
CONTRIBUTING.md references family rules; per-sibling specifics live
locally.

## Forbidden patterns

- Do not paste literal forbidden-string grep commands into commit bodies.
- Do not absorb engineer-domain code into scaffold commits to "make
  progress faster." The five absorption-rationalization phrases —
  *small / surgical / my-spec-bug / eval-window / structural-clarity* —
  all map to CTO traps that defeat the multi-actor org pattern.

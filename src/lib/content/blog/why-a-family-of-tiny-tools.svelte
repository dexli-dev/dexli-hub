<script module lang="ts">
	import type { PostMetadata } from './types';

	export const metadata: PostMetadata = {
		title: 'Why a family of tiny tools',
		slug: 'why-a-family-of-tiny-tools',
		datePublished: '2026-05-29T10:00:00Z',
		excerpt:
			'The web is full of dev tools that started tiny and got fat. dexli.dev is a bet against that drift — small tools, one job each, no account gate.',
		wordCount: 633
	};
</script>

<p>
	The web is full of developer tools that started tiny and got fat. A regex
	tester that now wants your email. A cron parser wrapped in three layers of
	upsell. A diff viewer that asks you to create an account before it will let
	you share a comparison. Each began as someone scratching an itch in an
	afternoon, and each slowly accreted the things that afternoon-tools accrete:
	a pricing page, a newsletter modal, a <em>Pro</em> tier, a cookie wall.
</p>

<p>dexli.dev is a bet against that drift.</p>

<p>
	It is a family of tiny tools — a webhook inbox, a cron expression parser, a
	regex tester, a text diff — that each do exactly one thing, share one
	coherent design, and refuse to grow past their purpose. No signup. No
	upsell. No account gate. The URL is the share.
</p>

<h2>Why a family, not a suite</h2>

<p>
	A suite is one product with many features, owned by one codebase, where
	adding capability means adding surface. A family is many products that
	happen to be related — each independently deployable, independently useful,
	sharing a brand and a small amount of connective tissue.
</p>

<p>
	The distinction decides what resists creep. In a suite, the path of least
	resistance is always <em>add a setting</em>. In a family, a setting added to
	one tool never touches the others, and the social pressure runs the other
	way: a tool that grows a second job stops being a member of the family and
	becomes its own thing. Each dexli tool is small enough that you can
	understand its entire job in five seconds of looking at it. That is not a
	limitation we are apologising for. It is the product.
</p>

<h2>The connective tissue: the URL is the interface</h2>

<p>
	The tools share one piece of real infrastructure: a URL-handoff convention.
	State lives in the URL — the regex you typed, the two texts you are diffing,
	the cron expression you are testing. That buys three things, all of which
	matter more than they sound.
</p>

<ul>
	<li>You can bookmark a result.</li>
	<li>
		You can send a teammate the exact thing you are looking at by pasting a
		link, with no <strong>share</strong> button mediating it.
	</li>
	<li>
		The tools can hand off to each other — a payload from one opening
		pre-loaded in another — without any of them needing to know an account
		exists, because there are none.
	</li>
</ul>

<p>
	The design rule we hold ourselves to: a recipient should not be able to tell
	the difference between <em>a tool composed this URL for me</em> and
	<em>a human pasted this URL</em>. When those are indistinguishable, there is
	no special trust path to exploit and no asymmetry to abuse. The URL is just a
	URL.
</p>

<h2>What tiny costs, and what it buys</h2>

<p>
	Tiny tools give up the things big tools sell: dashboards, history, teams,
	integrations, the gravitational pull that keeps you inside one vendor's
	walls. If you need those, dexli is not for you, and that is fine.
</p>

<p>
	What tiny buys is trust by construction. There is no account, so there is
	nothing to breach. The URL-shareable tools keep your content in the URL, not
	on a server, so there is nothing to leak. There is no upsell, so there is no
	incentive to make the free path worse. The tool either does its one job or it
	does not, and you can tell in five seconds.
</p>

<p>
	We think there is a small, real audience for that — developers who want a
	thing that works, shares cleanly, and gets out of the way. This blog is where
	we will write about how the family is built, the decisions behind each tool,
	and the methodology that lets a very small team ship them one after another
	without the wheels coming off.
</p>

<p>
	Welcome to dexli.dev. The tools are linked from
	<a href="https://dexli.dev" rel="external">the hub</a>. Go break something.
</p>

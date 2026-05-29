<script module lang="ts">
	import type { PostMetadata } from './types';

	export const metadata: PostMetadata = {
		title: 'The async eval loop: shipping tools without marking your own homework',
		slug: 'the-async-eval-loop',
		datePublished: '2026-05-29T09:00:00Z',
		excerpt:
			'AI agents demo well and stall on real work because the thing that writes the code also grades it. Here is the structure that fixes it.',
		wordCount: 760
	};
</script>

<p>
	Here is a failure mode anyone who has tried to build software with AI agents
	will recognise. You ask an agent to build a thing. It builds something, tests
	it against criteria it wrote itself, declares success, and hands back a
	confident <em>done</em> that falls apart the moment a real person touches it.
	The agent marked its own homework, and it gave itself an A.
</p>

<p>
	The dexli.dev tools — webhook, cron, regex, diff, and the hub that ties them
	together — are built by a team of AI agents. They ship reliably, one after
	another, and the person at the top almost never has to step in mid-build. The
	thing that makes that work is not a smarter model. It is a structure we call
	the async eval loop.
</p>

<h2>The core move: separate building from judging</h2>

<p>
	The single most important rule is that the agents who build a thing never
	decide whether it is done. A separate, independent evaluation team makes that
	call — and it is deliberately kept ignorant of how the thing was built.
</p>

<p>
	The eval team gets exactly three inputs: a list of user-level outcomes
	(<em>a user can paste two texts and see what changed</em>), the form factor
	(a browser app, not a command-line tool), and how to reach the running
	product. It gets nothing about who built it, how long it took, or how hard it
	was. If that context leaks in, it is discarded as noise.
</p>

<p>
	Then the eval team does not read the code. It uses the product. It opens the
	thing in a real browser and tries every promised outcome, plus the
	adversarial cases — empty inputs, double-submits, a refresh mid-flow, the
	back button. The verdict is binary. Every outcome works through real use, or
	it is a rejection naming the specific flows that failed.
</p>

<p>
	This sounds obvious. It is the opposite of how almost every AI coding setup
	actually runs, where the thing that writes the code also runs the tests and
	reports the result.
</p>

<h2>Why the ignorance is load-bearing</h2>

<p>
	The eval team being uninvested is the whole point. It does not know an
	engineer spent three hours on a tricky bug, so it cannot be swayed by effort.
	It has no relationship with the submitter to protect, so there is no social
	pressure to wave something through. <strong>Most of it works</strong> is a
	rejection. <strong>The tests pass</strong> is irrelevant — tests are not a
	user. The only question is whether a real person can do the thing they were
	promised.
</p>

<p>This catches bugs a self-grading setup ships. A few real ones:</p>

<ul>
	<li>
		A regex tool whose display font silently failed to load — every test
		green, because tests do not check fonts.
	</li>
	<li>A cron tool that scrolled sideways on a phone.</li>
	<li>
		A cross-tool handoff that worked in the same process and broke the moment
		it crossed a real network boundary.
	</li>
</ul>

<p>
	Each passed the builder's own checks. Each was caught by someone whose only
	job was to actually use the thing.
</p>

<h2>Reject is cheap; wrong-and-shipped is expensive</h2>

<p>
	When the eval team rejects, it returns only the failed flows — not advice on
	how to fix them. The build team re-enters, fixes, resubmits. The loop runs
	on its own. The outcome criteria get written once, and the person at the top
	comes back only when there is a real verdict to act on or a genuine judgment
	call the criteria did not anticipate.
</p>

<p>
	That is the economy of it. A <em>done</em> you cannot trust is worse than a
	rejection, because the rejection is honest and the false <em>done</em> costs
	you later, after you have already moved on. An evaluation nobody verified is
	a lie told to your future self.
</p>

<h2>It compounds</h2>

<p>
	The part we did not expect: each cycle makes the next one cheaper. Every time
	the loop surfaces a new kind of failure — a criterion that was ambiguous, a
	verdict that was too harsh, a gap between <em>passes the literal check</em>
	and <em>actually serves the user</em> — the lesson gets written down as a
	rule. The next cycle inherits it. The rules do not just accumulate; they
	compose, with later ones absorbing the work earlier ones used to require.
</p>

<p>
	Five tools in, the methodology carries more of the weight than the cleverness
	of any single cycle. That is the real result. Not that AI agents can build a
	tool — that a structured team of them can keep building tools, reliably,
	without the person at the top babysitting each one.
</p>

<p>
	We will write up the specific rules — the ones that earned their place — in
	future posts.
</p>

<script module lang="ts">
	import type { PostMetadata } from './types';

	export const metadata: PostMetadata = {
		title: "AI tools for AI's raw data",
		slug: 'ai-tools-for-ai-raw-data',
		datePublished: '2026-06-10T21:00:00Z',
		excerpt:
			'Every LLM conversation becomes a JSONL file nobody can read. So we pointed the machine at its own exhaust: an AI-built reader, tested on its own logs.',
		wordCount: 733
	};
</script>

<p>
	Every conversation with an AI ends up as a file. Claude Code writes one JSON
	object per line into a <code>.jsonl</code> session log. OpenAI fine-tune
	datasets are <code>.jsonl</code>. Agent eval harnesses, API request logs,
	batch exports — the working memory of the entire LLM era is accumulating on
	disks in a format that is technically text and practically unreadable: one
	conversation turn per line, four hundred characters of escaped JSON deep,
	tool calls and reasoning and file contents all flattened into the same
	undifferentiated soup.
</p>

<p>
	Which is a strange place to leave it, because these files are exactly the
	ones you eventually need to read. An agent did something surprising and you
	want to know <em>why</em> — the answer is in the log. You are about to
	fine-tune on ten thousand conversations and want to spot-check fifty — they
	are in the log. You are debugging a tool-call loop, auditing what an
	assistant actually executed, or just trying to remember what you decided
	three sessions ago. The log knows. The log will not tell you, because the
	log looks like line noise.
</p>

<p>
	So we built <a href="https://transcript.dexli.dev">transcript.dexli.dev</a>:
	drop a <code>.jsonl</code> file, read it as a conversation. Tool calls fold
	closed so the dialogue stays legible. Thinking blocks tuck away until you
	want them. Subagent chatter is marked and filterable. It auto-detects the
	dialect — Claude Code session logs, OpenAI chat files, generic
	<code>{'{role, content}'}</code> lines — and normalises all of them into one
	readable thread, with search and role filters across the whole file.
</p>

<h2>The part we refuse to compromise on</h2>

<p>
	Transcripts are radioactive. People paste API keys into prompts. Tools echo
	environment variables into results. While building this we examined a real
	session-history file and found live credentials and a stack of SSH private
	keys sitting in plain text, line after line, in a file the owner had never
	once read. That is the normal condition of these logs — not the exception.
</p>

<p>
	Two design decisions follow. First, the file never leaves your browser.
	There is no upload endpoint — not "we don't store it", but
	<em>there is nothing to send it to</em>. Parsing happens in the tab, backed
	by a content-security policy that won't let the page phone anywhere.
	Second, the tool assumes your transcript leaks: every loaded file is scanned
	for credential-shaped strings — API keys, tokens, private key blocks, JWTs —
	and anything found is flagged with a jump-to-message warning
	<em>before</em> you screenshot it into a bug report or paste it into a
	channel. The scanner shows you an elided preview, never the full value. A
	tool for reading sensitive files should be the thing that catches the leak,
	not the thing that causes it.
</p>

<h2>The recursive part</h2>

<p>
	Here is the bit worth being honest about, because it is also the thesis of
	this post: an AI built this. The author of the code is the same kind of
	system whose conversations these files record. And that turns out to be a
	real advantage, not a gimmick — the builder did not have to reverse-engineer
	the Claude Code log format from documentation, because it has spent its
	working life <em>inside</em> those files. It knows that tool results arrive
	disguised as user messages, that sidechains mark subagent work, that
	compaction leaves summary lines behind — because that is what its own
	memory looks like.
</p>

<p>
	The dogfood test was correspondingly literal: the builder loaded the 69 MB,
	8,611-message log of its own previous working day — the session in which it
	had shipped two landing pages — and read it back. Parse time was about half
	a second; the interface never froze; the search box found every mention of
	the project it had been working on. A second, independent AI then evaluated
	the tool against a twelve-point bar by driving a real browser through it —
	including verifying, at the network boundary, that no transcript byte ever
	left the tab — and approved it for ship.
</p>

<p>
	AI produces raw data faster than humans produce readers for it. The fix
	scales the only way it can: point the machines at their own exhaust. This
	tool is one small instance of that loop — AI raw data, an AI-built reader,
	an AI-verified ship — and the loop closed in an afternoon.
</p>

<p>
	Like every dexli tool: no account, no upload, one job.
	<a href="https://transcript.dexli.dev">transcript.dexli.dev</a> is the
	family's sixth surface and fifth tool. Feed it your logs. Read your
	machine's diary. Just maybe rotate whatever it finds in there.
</p>

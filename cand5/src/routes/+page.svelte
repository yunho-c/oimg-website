<script lang="ts">
	import { ArrowRight, Check, Play } from "@lucide/svelte";
	import { Button } from "$lib/components/ui/button";
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
	} from "$lib/components/ui/card";

	const metrics = [
		{ value: "3.1x", label: "faster review cycles" },
		{ value: "84%", label: "less status chatter" },
		{ value: "1 line", label: "from brief to release" },
	];

	const marks = ["INDEX/01", "Northline", "Field Study", "Atelier Mode", "Kite Dept."];

	const workflow = [
		{
			step: "01",
			title: "Shape the brief once",
			description:
				"Collect intent, tone, audience, and launch constraints in one structured surface before the team starts making.",
			note: "Every decision stays tied to the original direction.",
		},
		{
			step: "02",
			title: "Narrow feedback quickly",
			description:
				"Route comments into clear decisions instead of endless threads. The work moves forward because context stays attached.",
			note: "Review becomes a short pass, not a separate project.",
		},
		{
			step: "03",
			title: "Ship as a coherent set",
			description:
				"Assets, approvals, and launch notes leave together, so the final release reads like one system instead of scattered files.",
			note: "Creative, growth, and brand teams exit on the same page.",
		},
	];

	const features = [
		{
			label: "Clarity",
			title: "A board that reads like a decision, not a dashboard.",
			description:
				"Monograph removes generic project noise and shows only the information creative teams need to move the work forward.",
		},
		{
			label: "Review",
			title: "Feedback collapses into a clean next move.",
			description:
				"Keep approvals, open tensions, and resolved edits in a single working line so no one has to re-summarize the room.",
		},
		{
			label: "Alignment",
			title: "Launch sets stay visually and operationally intact.",
			description:
				"By the time assets leave Monograph, messaging, pacing, and ownership already agree with each other.",
		},
	];

	const checklist = [
		"Brief, references, and output targets share one frame",
		"Comments resolve into decisions instead of duplicate threads",
		"Launch notes ship with the assets they actually describe",
	];
</script>

<svelte:head>
	<title>Monograph | Creative workflow kept in line</title>
	<meta
		name="description"
		content="Monograph is a fictional creative workflow SaaS for design teams. Keep briefs, feedback, and launch assets aligned in one calm system."
	/>
</svelte:head>

<div class="modern-page">
	<section class="hero-shell" id="top">
		<div class="site-shell">
			<header class="topbar reveal" style="--delay: 0.02s">
				<a class="brand" href="#top" aria-label="Monograph home">
					<span class="brand-mark" aria-hidden="true"></span>
					<span class="brand-word">Monograph</span>
				</a>

				<nav class="topnav" aria-label="Primary">
					<a href="#workflow">Workflow</a>
					<a href="#features">Features</a>
					<a href="#start">Start free</a>
				</nav>
			</header>

			<div class="hero-grid">
				<div class="hero-copy">
					<p class="eyebrow reveal" style="--delay: 0.08s">Creative workflow SaaS for launch teams</p>
					<h1 class="hero-title reveal" style="--delay: 0.12s">
						Keep the brief, review loop, and release set on one clean line.
					</h1>
					<p class="hero-lead reveal" style="--delay: 0.16s">
						Monograph helps design teams turn rough direction into aligned launch-ready work
						without the spreadsheet sprawl, feedback drift, or last-mile ambiguity.
					</p>

					<div class="hero-actions reveal" style="--delay: 0.2s">
						<Button
							href="mailto:start@monograph.app?subject=Start%20Monograph"
							class="cta-button cta-button-primary"
						>
							Start free
							<ArrowRight class="size-4" />
						</Button>
						<Button href="#workflow" variant="outline" class="cta-button cta-button-secondary">
							<Play class="size-4" />
							See workflow
						</Button>
					</div>

					<ul class="hero-checks reveal" style="--delay: 0.24s">
						{#each checklist as item}
							<li>
								<Check class="size-4" />
								<span>{item}</span>
							</li>
						{/each}
					</ul>
				</div>

				<div class="system-board reveal" style="--delay: 0.14s" aria-label="Product preview">
					<div class="board-topline">
						<div>
							<p class="mono-label">Launch board</p>
							<h2>Spring drop / SS.26</h2>
						</div>
						<div class="board-chip">12 live assets</div>
					</div>

					<div class="board-grid">
						<section class="board-panel board-panel-brief">
							<p class="mono-label">Brief signal</p>
							<h3>Sharper, lighter, more editorial than the last release.</h3>
							<ul class="board-list">
								<li>Audience split locked</li>
								<li>Reference direction approved</li>
								<li>Launch tone reduced to three rules</li>
							</ul>
						</section>

						<section class="board-panel board-panel-review">
							<p class="mono-label">Review loop</p>
							<div class="board-stat">
								<strong>04</strong>
								<span>open decisions</span>
							</div>
							<div class="board-bars" aria-hidden="true">
								<span style="--size: 84%"></span>
								<span style="--size: 58%"></span>
								<span style="--size: 31%"></span>
							</div>
							<p class="board-footnote">Comments are grouped by decision, not by channel.</p>
						</section>

						<section class="board-panel board-panel-release">
							<p class="mono-label">Release set</p>
							<div class="release-row">
								<span>Lookbook selects</span>
								<span>ready</span>
							</div>
							<div class="release-row">
								<span>Paid social variants</span>
								<span>ready</span>
							</div>
							<div class="release-row">
								<span>Launch note + ownership</span>
								<span>ready</span>
							</div>
						</section>
					</div>

					<div class="board-ticker">
						<span>Brief locked</span>
						<span>Feedback narrowed from 27 to 4 calls</span>
						<span>Release assembled as one system</span>
					</div>
				</div>
			</div>

			<div class="proof-panel reveal" style="--delay: 0.26s">
				<div class="metric-strip">
					{#each metrics as metric}
						<div class="metric-block">
							<strong>{metric.value}</strong>
							<span>{metric.label}</span>
						</div>
					{/each}
				</div>

				<div class="mark-strip" aria-label="Customer marks">
					{#each marks as mark}
						<span>{mark}</span>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="section-shell" id="workflow">
		<div class="site-shell">
			<div class="section-heading reveal" style="--delay: 0.04s">
				<p class="eyebrow">A calm operating rhythm</p>
				<h2 class="section-title">Three precise moves from direction to delivery.</h2>
				<p class="section-copy">
					Monograph is built for brand and creative teams that want stronger output without
					more operational weight.
				</p>
			</div>

			<div class="workflow-layout">
				<aside class="rule-panel reveal" style="--delay: 0.08s">
					<p class="mono-label">System rule</p>
					<h3>Nothing advances without context attached.</h3>
					<p>
						Every asset, comment, and approval stays anchored to the same working line. That
						one rule is what makes the product feel calm.
					</p>
					<div class="rule-grid">
						<div>
							<span class="rule-value">27%</span>
							<span class="rule-label">shorter launch prep weeks</span>
						</div>
						<div>
							<span class="rule-value">0</span>
							<span class="rule-label">orphaned notes in the handoff</span>
						</div>
					</div>
				</aside>

				<div class="workflow-cards">
					{#each workflow as item, index}
						<Card class="workflow-card reveal" style={`--delay: ${0.1 + index * 0.08}s`}>
							<CardHeader class="workflow-card-header">
								<div class="step-index">{item.step}</div>
								<CardTitle class="workflow-card-title">{item.title}</CardTitle>
								<CardDescription class="workflow-card-description">
									{item.description}
								</CardDescription>
							</CardHeader>
							<CardContent class="workflow-card-content">
								<p>{item.note}</p>
							</CardContent>
						</Card>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="section-shell" id="features">
		<div class="site-shell">
			<div class="section-heading reveal" style="--delay: 0.04s">
				<p class="eyebrow">Designed for clarity</p>
				<h2 class="section-title">Minimal by appearance, strict underneath.</h2>
				<p class="section-copy">
					The interface stays quiet so the work reads faster. Structure does the heavy lifting.
				</p>
			</div>

			<div class="feature-layout">
				<div class="manifesto-panel reveal" style="--delay: 0.08s">
					<p class="mono-label">What ships together</p>
					<h3>The product is built around release integrity, not generic task management.</h3>
					<p>
						Monograph treats the brief, decision record, and launch set as one object. Teams
						move faster because they stop rebuilding context at every handoff.
					</p>
					<div class="manifesto-grid">
						<div>
							<span class="manifesto-value">01</span>
							<span class="manifesto-label">source of direction</span>
						</div>
						<div>
							<span class="manifesto-value">04</span>
							<span class="manifesto-label">essential views only</span>
						</div>
						<div>
							<span class="manifesto-value">∞</span>
							<span class="manifesto-label">less re-explaining</span>
						</div>
					</div>
				</div>

				<div class="feature-cards">
					{#each features as feature, index}
						<Card class="feature-card reveal" style={`--delay: ${0.12 + index * 0.08}s`}>
							<CardHeader class="feature-card-header">
								<p class="feature-label">{feature.label}</p>
								<CardTitle class="feature-card-title">{feature.title}</CardTitle>
							</CardHeader>
							<CardContent class="feature-card-content">
								<p>{feature.description}</p>
							</CardContent>
						</Card>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="section-shell section-shell-end" id="start">
		<div class="site-shell">
			<div class="cta-band reveal" style="--delay: 0.06s">
				<div class="cta-band-copy">
					<p class="eyebrow">Start clean</p>
					<h2 class="section-title">Start free and give the next launch a single source of direction.</h2>
					<p class="section-copy">
						Replace message drift, loose approvals, and scattered release notes with one
						exact working surface.
					</p>
				</div>

				<div class="cta-band-actions">
					<Button
						href="mailto:start@monograph.app?subject=Start%20Monograph"
						class="cta-button cta-button-primary"
					>
						Start free
						<ArrowRight class="size-4" />
					</Button>
					<Button href="#top" variant="outline" class="cta-button cta-button-secondary">
						Back to top
					</Button>
					<p class="cta-footnote">Free for the first active launch. No card required.</p>
				</div>
			</div>
		</div>
	</section>
</div>

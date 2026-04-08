<script lang="ts">
	import {
		ArrowRight,
		Download,
		Images,
		Layers3,
		Scaling,
		ScanSearch,
		ShieldCheck
	} from "@lucide/svelte";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";

	const quickFacts = [
		{ value: "5", label: "core moves", detail: "Optimize, convert, resize, crop, and extend." },
		{ value: "5", label: "export formats", detail: "JPEG, PNG, WebP, AVIF, and JPEG XL." },
		{
			value: "Safe",
			label: "original promise",
			detail: "Keep the source when the smaller export is not worth sending."
		}
	];

	const benefits = [
		{
			icon: ScanSearch,
			eyebrow: "Preview-first",
			title: "See the tradeoff before the file leaves your desktop.",
			description:
				"Compare the lighter export in context so the decision feels measured, not like a blind compression guess."
		},
		{
			icon: Layers3,
			eyebrow: "Format control",
			title: "Pick the output that fits where the image is going.",
			description:
				"Move between modern delivery formats and familiar fallbacks for storefronts, proofs, decks, and galleries."
		},
		{
			icon: Scaling,
			eyebrow: "Framing tools",
			title: "Resize, crop, or extend until the composition actually fits.",
			description:
				"Handle narrow banners, square listings, and handoff-ready layouts without reopening a second editor."
		}
	];

	const workflow = [
		{
			step: "01",
			title: "Bring in the image you already have.",
			description:
				"Start from the real asset, not from presets, and inspect the file before changing anything."
		},
		{
			step: "02",
			title: "Shape the export around its destination.",
			description:
				"Optimize, convert, resize, crop, or extend while checking whether the lighter result still feels right."
		},
		{
			step: "03",
			title: "Send the smaller version with confidence.",
			description:
				"Export the leaner file when it earns its place and leave the original untouched when it does not."
		}
	];

	const formats = ["JPEG", "PNG", "WebP", "AVIF", "JPEG XL"];
	const proofBadges = ["61% smaller", "96% visual match", "Original preserved"];
</script>

<svelte:head>
	<title>oimg | Make image files lighter without flattening them</title>
	<meta
		name="description"
		content="A dark, minimal landing page for oimg, the desktop image optimizer built for preview-first exports, cleaner formats, and lighter final files."
	/>
</svelte:head>

<div class="page-shell">
	<div class="ambient ambient-left" aria-hidden="true"></div>
	<div class="ambient ambient-right" aria-hidden="true"></div>

	<div class="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-10">
		<header
			class="reveal flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between"
			style="--delay: 0.04s"
		>
			<a href="#top" class="inline-flex items-center gap-3 text-[0.74rem] font-semibold uppercase tracking-[0.34em] text-foreground/90">
				<span class="brand-mark"></span>
				<span>oimg</span>
			</a>

			<div class="hidden items-center gap-2 md:flex">
				<Badge variant="outline" class="chip-muted">Desktop image optimizer</Badge>
				<Badge variant="outline" class="chip-muted">Preview-first exports</Badge>
			</div>

			<Button href="#download" size="sm" class="rounded-full px-4">
				Download app
				<Download class="size-4" />
			</Button>
		</header>

		<main id="top" class="flex flex-1 flex-col gap-20 py-10 sm:gap-24 sm:py-14">
			<section class="grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
				<div class="max-w-2xl">
					<Badge variant="secondary" class="reveal hero-badge" style="--delay: 0.08s">
						Desktop image optimizer
					</Badge>

					<h1
						class="reveal mt-6 max-w-4xl font-display text-balance text-5xl leading-[0.9] tracking-[-0.05em] text-foreground sm:text-6xl lg:text-[5.35rem]"
						style="--delay: 0.12s"
					>
						Make image files lighter without flattening the work.
					</h1>

					<p
						class="reveal mt-6 max-w-2xl text-balance text-lg leading-8 text-muted-foreground sm:text-[1.08rem]"
						style="--delay: 0.16s"
					>
						oimg is built for the last mile of image work: the export that needs to load
						faster, fit better, switch formats cleanly, and still feel like the image you meant
						to send.
					</p>

					<div class="reveal mt-8 flex flex-col gap-3 sm:flex-row" style="--delay: 0.2s">
						<Button href="#download" size="lg" class="rounded-full px-5">
							Download app
							<Download class="size-4" />
						</Button>
						<Button href="#workflow" variant="outline" size="lg" class="rounded-full px-5">
							See workflow
							<ArrowRight class="size-4" />
						</Button>
					</div>

					<div class="mt-10 grid gap-3 sm:grid-cols-3">
						{#each quickFacts as fact, index}
							<Card
								class="reveal stat-card bg-card/70 backdrop-blur-sm"
								style={`--delay: ${0.24 + index * 0.06}s`}
							>
								<CardHeader class="gap-3 px-4 pb-0">
									<CardTitle class="font-display text-[2rem] leading-none tracking-[-0.04em]">
										{fact.value}
									</CardTitle>
									<CardDescription class="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-foreground/58">
										{fact.label}
									</CardDescription>
								</CardHeader>
								<CardContent class="px-4 pt-0">
									<p class="text-sm leading-6 text-muted-foreground">{fact.detail}</p>
								</CardContent>
							</Card>
						{/each}
					</div>
				</div>

				<div class="reveal lg:pl-4" style="--delay: 0.18s">
					<Card class="proof-panel">
						<CardHeader class="gap-4 px-6 pt-6">
							<div class="flex items-start justify-between gap-4">
								<div>
									<p class="section-label">Preview board</p>
									<CardTitle class="mt-3 max-w-lg font-display text-4xl leading-[0.92] tracking-[-0.05em]">
										The smaller export should still look like your image.
									</CardTitle>
								</div>
								<Badge variant="outline" class="chip-muted whitespace-nowrap">macOS desktop</Badge>
							</div>
							<CardDescription class="max-w-lg text-base leading-7 text-muted-foreground">
								Check the weight, framing, and format before the file gets uploaded, handed off,
								or attached to a launch.
							</CardDescription>
						</CardHeader>

						<CardContent class="space-y-6 px-6 pb-6">
							<div class="proof-meter">
								<div>
									<p class="section-label">Original</p>
									<p class="mt-2 font-display text-[clamp(2.8rem,7vw,4.9rem)] leading-none tracking-[-0.07em] text-foreground">
										18 MB
									</p>
								</div>

								<div class="text-center">
									<p class="proof-arrow">to</p>
								</div>

								<div class="text-right">
									<p class="section-label">Delivery export</p>
									<p class="mt-2 font-display text-[clamp(2.8rem,7vw,4.9rem)] leading-none tracking-[-0.07em] text-primary">
										7 MB
									</p>
								</div>
							</div>

							<div class="grid gap-4 sm:grid-cols-2">
								<div class="swatch-card">
									<div class="image-swatch image-before"></div>
									<div class="mt-4 flex items-start justify-between gap-3">
										<div>
											<p class="section-label">Before</p>
											<p class="mt-2 text-lg font-semibold text-foreground">PNG master</p>
										</div>
										<p class="text-sm text-muted-foreground">lossless</p>
									</div>
								</div>

								<div class="swatch-card">
									<div class="image-swatch image-after"></div>
									<div class="mt-4 flex items-start justify-between gap-3">
										<div>
											<p class="section-label">After</p>
											<p class="mt-2 text-lg font-semibold text-foreground">AVIF delivery</p>
										</div>
										<p class="text-sm text-muted-foreground">quality 90</p>
									</div>
								</div>
							</div>

							<div class="flex flex-wrap gap-2">
								{#each proofBadges as proof}
									<Badge variant="outline" class="chip-muted">{proof}</Badge>
								{/each}
							</div>

							<div class="grid gap-3 sm:grid-cols-3">
								<div class="proof-note">
									<ScanSearch class="size-4 text-primary" />
									<div>
										<p>Preview-first</p>
										<span>Inspect before export</span>
									</div>
								</div>
								<div class="proof-note">
									<Images class="size-4 text-primary" />
									<div>
										<p>Format switch</p>
										<span>Choose for the destination</span>
									</div>
								</div>
								<div class="proof-note">
									<ShieldCheck class="size-4 text-primary" />
									<div>
										<p>Safe write</p>
										<span>Keep the source when needed</span>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<section class="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end" id="benefits">
				<div class="reveal max-w-lg" style="--delay: 0.06s">
					<p class="section-label">Why it feels deliberate</p>
					<h2 class="mt-5 font-display text-balance text-4xl leading-[0.95] tracking-[-0.05em] text-foreground sm:text-5xl">
						Built for the moment an image stops being a draft and starts being public.
					</h2>
					<p class="mt-6 text-base leading-7 text-muted-foreground">
						oimg narrows the last export pass down to the decisions that matter: file weight,
						format, framing, and whether the new version actually earns the send.
					</p>
				</div>

				<div class="grid gap-4 lg:grid-cols-3">
					{#each benefits as benefit, index}
						<Card
							class="reveal benefit-card bg-card/72 backdrop-blur-sm"
							style={`--delay: ${0.12 + index * 0.08}s`}
						>
							<CardHeader class="gap-5 px-5 pt-5">
								<div class="icon-chip">
									<benefit.icon class="size-4" />
								</div>
								<div>
									<p class="section-label">{benefit.eyebrow}</p>
									<CardTitle class="mt-4 text-2xl leading-tight tracking-[-0.03em]">
										{benefit.title}
									</CardTitle>
								</div>
							</CardHeader>
							<CardContent class="px-5 pb-5 pt-0">
								<p class="text-sm leading-7 text-muted-foreground">{benefit.description}</p>
							</CardContent>
						</Card>
					{/each}
				</div>
			</section>

			<section class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]" id="workflow">
				<div class="reveal max-w-xl" style="--delay: 0.06s">
					<p class="section-label">Workflow</p>
					<h2 class="mt-5 font-display text-balance text-4xl leading-[0.95] tracking-[-0.05em] text-foreground sm:text-5xl">
						Three calm steps for the final export pass.
					</h2>
					<p class="mt-6 text-base leading-7 text-muted-foreground">
						Use it when the image already exists and now needs to load faster, fit better, or
						land in a cleaner format before it leaves your hands.
					</p>

					<div class="mt-8 flex flex-wrap gap-2">
						{#each formats as format}
							<Badge variant="outline" class="chip-muted">{format}</Badge>
						{/each}
					</div>
				</div>

				<div class="grid gap-4">
					{#each workflow as item, index}
						<Card
							class="reveal workflow-card bg-card/72 backdrop-blur-sm"
							style={`--delay: ${0.14 + index * 0.08}s`}
						>
							<CardContent class="grid gap-5 px-5 py-5 sm:grid-cols-[auto_1fr] sm:items-start">
								<div class="step-chip">{item.step}</div>
								<div>
									<h3 class="text-2xl leading-tight tracking-[-0.03em] text-foreground">
										{item.title}
									</h3>
									<p class="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
										{item.description}
									</p>
								</div>
							</CardContent>
						</Card>
					{/each}
				</div>
			</section>

			<section id="download">
				<Card class="reveal cta-panel" style="--delay: 0.08s">
					<CardHeader class="gap-4 px-6 pt-6 text-left sm:px-8 sm:pt-8">
						<Badge variant="secondary" class="hero-badge w-fit">Download oimg</Badge>
						<CardTitle class="max-w-3xl font-display text-4xl leading-[0.94] tracking-[-0.05em] text-foreground sm:text-5xl">
							Make the final image decision feel deliberate instead of rushed.
						</CardTitle>
						<CardDescription class="max-w-2xl text-base leading-7 text-muted-foreground">
							For product pages, proof sets, campaign launches, and portfolio handoffs, oimg
							helps you send the lighter file with more confidence.
						</CardDescription>
					</CardHeader>

					<CardContent class="flex flex-col gap-4 px-6 pb-6 pt-0 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:pb-8">
						<p class="text-sm uppercase tracking-[0.24em] text-foreground/55">
							Desktop app for focused export cleanup
						</p>
						<Button href="#download" size="lg" class="rounded-full px-5">
							Download app
							<Download class="size-4" />
						</Button>
					</CardContent>
				</Card>
			</section>
		</main>
	</div>
</div>

<style>
	.page-shell {
		position: relative;
		isolation: isolate;
		overflow: clip;
	}

	.ambient {
		position: absolute;
		inset: auto;
		z-index: -1;
		border-radius: 9999px;
		filter: blur(90px);
		opacity: 0.7;
		pointer-events: none;
	}

	.ambient-left {
		top: 5rem;
		left: -7rem;
		height: 22rem;
		width: 22rem;
		background:
			radial-gradient(circle, color-mix(in oklab, var(--primary) 34%, transparent) 0%, transparent 72%);
	}

	.ambient-right {
		top: 12rem;
		right: -8rem;
		height: 20rem;
		width: 20rem;
		background:
			radial-gradient(circle, color-mix(in oklab, var(--foreground) 8%, transparent) 0%, transparent 68%);
	}

	.brand-mark {
		height: 0.65rem;
		width: 0.65rem;
		border-radius: 9999px;
		background: linear-gradient(135deg, var(--primary), color-mix(in oklab, var(--primary) 60%, white));
		box-shadow: 0 0 18px color-mix(in oklab, var(--primary) 40%, transparent);
	}

	:global(.hero-badge),
	:global(.chip-muted) {
		border-color: color-mix(in oklab, var(--border) 74%, white 8%);
		background: color-mix(in oklab, var(--card) 90%, transparent);
		color: color-mix(in oklab, var(--foreground) 90%, transparent);
	}

	.section-label {
		font-size: 0.68rem;
		font-weight: 600;
		letter-spacing: 0.28em;
		text-transform: uppercase;
		color: color-mix(in oklab, var(--foreground) 56%, transparent);
	}

	:global(.stat-card),
	:global(.benefit-card),
	:global(.workflow-card),
	:global(.proof-panel),
	:global(.cta-panel) {
		border-color: color-mix(in oklab, var(--border) 82%, white 4%);
		box-shadow:
			0 0 0 1px color-mix(in oklab, black 40%, transparent),
			0 26px 70px rgba(0, 0, 0, 0.34);
	}

	:global(.benefit-card),
	:global(.workflow-card),
	:global(.cta-panel),
	:global(.proof-panel),
	:global(.stat-card) {
		transition:
			transform 220ms ease,
			border-color 220ms ease,
			background-color 220ms ease,
			box-shadow 220ms ease;
	}

	:global(.benefit-card:hover),
	:global(.workflow-card:hover),
	:global(.proof-panel:hover),
	:global(.stat-card:hover) {
		transform: translateY(-4px);
		border-color: color-mix(in oklab, var(--primary) 28%, var(--border));
		box-shadow:
			0 0 0 1px color-mix(in oklab, var(--primary) 15%, transparent),
			0 28px 86px rgba(0, 0, 0, 0.42);
	}

	:global(.proof-panel) {
		position: relative;
		background:
			linear-gradient(180deg, color-mix(in oklab, var(--card) 96%, white 2%), var(--card));
	}

	:global(.proof-panel)::before {
		content: "";
		position: absolute;
		inset: 0;
		background:
			linear-gradient(130deg, color-mix(in oklab, var(--primary) 7%, transparent), transparent 44%),
			repeating-linear-gradient(
				90deg,
				transparent 0,
				transparent 23px,
				color-mix(in oklab, var(--foreground) 4%, transparent) 23px,
				color-mix(in oklab, var(--foreground) 4%, transparent) 24px
			);
		opacity: 0.55;
		pointer-events: none;
	}

	.proof-meter {
		display: grid;
		gap: 1rem;
		align-items: end;
		border-radius: calc(var(--radius) * 1.7);
		border: 1px solid color-mix(in oklab, var(--border) 86%, white 4%);
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0)),
			color-mix(in oklab, var(--background) 42%, var(--card));
		padding: 1.4rem;
	}

	@media (min-width: 640px) {
		.proof-meter {
			grid-template-columns: 1fr auto 1fr;
		}
	}

	.proof-arrow {
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: color-mix(in oklab, var(--foreground) 42%, transparent);
	}

	.swatch-card {
		border-radius: calc(var(--radius) * 1.55);
		border: 1px solid color-mix(in oklab, var(--border) 84%, white 4%);
		background: color-mix(in oklab, var(--background) 22%, var(--card));
		padding: 1rem;
	}

	.image-swatch {
		aspect-ratio: 4 / 5;
		border-radius: calc(var(--radius) * 1.35);
		border: 1px solid rgba(255, 255, 255, 0.08);
		background-size: cover;
		background-position: center;
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
	}

	.image-before {
		background:
			linear-gradient(180deg, rgba(16, 16, 16, 0.16), rgba(16, 16, 16, 0.42)),
			radial-gradient(circle at 28% 24%, rgba(242, 188, 136, 0.95), transparent 28%),
			radial-gradient(circle at 78% 18%, rgba(247, 236, 214, 0.62), transparent 24%),
			linear-gradient(140deg, #6d4b34 0%, #b27a54 36%, #e0bb8b 68%, #3e2b22 100%);
	}

	.image-after {
		background:
			linear-gradient(180deg, rgba(16, 16, 16, 0.22), rgba(16, 16, 16, 0.5)),
			radial-gradient(circle at 30% 22%, rgba(241, 200, 150, 0.9), transparent 26%),
			radial-gradient(circle at 80% 20%, rgba(249, 240, 224, 0.55), transparent 22%),
			linear-gradient(140deg, #544033 0%, #9a785e 36%, #d6b086 66%, #31231b 100%);
		filter: saturate(0.9) contrast(0.95);
	}

	.proof-note {
		display: flex;
		gap: 0.75rem;
		align-items: flex-start;
		border-radius: calc(var(--radius) * 1.2);
		border: 1px solid color-mix(in oklab, var(--border) 82%, white 3%);
		background: color-mix(in oklab, var(--background) 28%, var(--card));
		padding: 0.95rem;
	}

	.proof-note p {
		font-size: 0.84rem;
		font-weight: 600;
		color: var(--foreground);
	}

	.proof-note span {
		display: block;
		margin-top: 0.2rem;
		font-size: 0.8rem;
		line-height: 1.45;
		color: var(--muted-foreground);
	}

	.icon-chip,
	.step-chip {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		border: 1px solid color-mix(in oklab, var(--border) 80%, white 5%);
		background: color-mix(in oklab, var(--background) 20%, var(--card));
	}

	.icon-chip {
		height: 2.2rem;
		width: 2.2rem;
		color: var(--primary);
	}

	.step-chip {
		min-width: 3.6rem;
		padding: 0.7rem 0.95rem;
		font-family: var(--font-display);
		font-size: 1.35rem;
		line-height: 1;
		letter-spacing: -0.04em;
		color: var(--primary);
	}

	.reveal {
		opacity: 0;
		transform: translateY(16px);
		animation: reveal 800ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
		animation-delay: var(--delay, 0s);
	}

	@keyframes reveal {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.reveal {
			opacity: 1;
			transform: none;
			animation: none;
		}

		:global(.benefit-card),
		:global(.workflow-card),
		:global(.cta-panel),
		:global(.proof-panel),
		:global(.stat-card) {
			transition: none;
		}

		:global(.benefit-card:hover),
		:global(.workflow-card:hover),
		:global(.proof-panel:hover),
		:global(.stat-card:hover) {
			transform: none;
		}
	}
</style>

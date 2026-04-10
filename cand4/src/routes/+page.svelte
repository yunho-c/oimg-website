<script lang="ts">
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import Check from "@lucide/svelte/icons/check";
	import Clock3 from "@lucide/svelte/icons/clock-3";
	import Image from "@lucide/svelte/icons/image";
	import Layers3 from "@lucide/svelte/icons/layers-3";
	import ScanSearch from "@lucide/svelte/icons/scan-search";
	import ShieldCheck from "@lucide/svelte/icons/shield-check";
	import Smartphone from "@lucide/svelte/icons/smartphone";
	import Sparkles from "@lucide/svelte/icons/sparkles";
	import Upload from "@lucide/svelte/icons/upload";
	import WandSparkles from "@lucide/svelte/icons/wand-sparkles";
	import Zap from "@lucide/svelte/icons/zap";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";

	const heroStats = [
		{ value: "92%", label: "less weight on typical web-ready exports" },
		{ value: "200+", label: "images prepared in a single batch" },
		{ value: "3 min", label: "to turn a launch folder into upload-ready files" }
	];

	const useCases = [
		"Online shops",
		"Marketing teams",
		"Real-estate listings",
		"Client galleries",
		"Design handoffs"
	];

	const featureCards = [
		{
			icon: WandSparkles,
			title: "Set one preset and trust the output",
			body: "Choose the destination once, then let every image leave with the same dimensions, quality, and polish."
		},
		{
			icon: ShieldCheck,
			title: "Keep the crisp parts crisp",
			body: "Protect transparency, text edges, product textures, and fine gradients while still cutting the file size hard."
		},
		{
			icon: Smartphone,
			title: "Make every screen feel faster",
			body: "Lighter files open quickly in messages, load faster on mobile, and stop fighting your CMS or marketplace limits."
		}
	];

	const workflow = [
		{
			icon: Upload,
			title: "Drop in a folder",
			body: "Mix product photos, screenshots, and transparent PNGs in one batch instead of exporting file by file."
		},
		{
			icon: ScanSearch,
			title: "Pick the destination",
			body: "Email, web page, listing, gallery, ad set. The app handles the practical file-size math for you."
		},
		{
			icon: Zap,
			title: "Download the ready set",
			body: "You get clean, lighter images that are prepared to publish, send, and archive immediately."
		}
	];

	const scenarioCards = [
		{
			title: "Shop launch pack",
			before: "2.4 GB",
			after: "286 MB",
			note: "56 product angles, transparent cutouts, and homepage crops ready for upload."
		},
		{
			title: "Broker listing set",
			before: "918 MB",
			after: "124 MB",
			note: "Interior, exterior, and detail shots that stay sharp while loading quickly on mobile."
		},
		{
			title: "Client review gallery",
			before: "1.3 GB",
			after: "172 MB",
			note: "Fast enough to share over email and easy enough for clients to open anywhere."
		}
	];

	const previewRows = [
		{ name: "hero-bag-front.png", from: "14.8 MB", to: "1.2 MB", tone: "92%" },
		{ name: "lookbook-spread.jpg", from: "9.6 MB", to: "780 KB", tone: "91%" },
		{ name: "checkout-ui@2x.png", from: "4.1 MB", to: "410 KB", tone: "90%" }
	];
</script>

<svelte:head>
	<title>Oimg | Make Images Easier to Share</title>
	<meta
		name="description"
		content="Shrink and clean up image batches for shops, listings, galleries, and campaigns without sacrificing the way they look."
	/>
</svelte:head>

<div class="relative overflow-x-clip">
	<div class="page-glow page-glow-left"></div>
	<div class="page-glow page-glow-right"></div>
	<div class="grain"></div>

	<section class="relative mx-auto max-w-7xl px-5 pb-16 pt-6 sm:px-8 lg:px-10 lg:pb-24">
		<nav class="reveal flex items-center justify-between gap-4" style="--delay: 80ms;">
			<div class="flex items-center gap-3">
				<div
					class="flex size-11 items-center justify-center rounded-full border border-border/70 bg-card/90 shadow-[0_12px_40px_rgba(63,31,17,0.08)]"
				>
					<Image class="size-5 text-primary" />
				</div>
				<div>
					<p class="text-xs uppercase tracking-[0.32em] text-muted-foreground">Oimg</p>
					<p class="font-display text-lg leading-none text-foreground">Image Optimizer</p>
				</div>
			</div>

			<div class="hidden items-center gap-2 md:flex">
				<Badge variant="outline" class="rounded-full border-border/70 bg-card/70 px-3 py-1 text-[0.72rem]">
					Sharper delivery
				</Badge>
				<Badge variant="outline" class="rounded-full border-border/70 bg-card/70 px-3 py-1 text-[0.72rem]">
					Smaller files
				</Badge>
			</div>
		</nav>

		<div class="grid gap-12 pt-14 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:gap-10 lg:pt-20">
			<div class="relative z-10">
				<div class="reveal" style="--delay: 170ms;">
					<Badge
						variant="outline"
						class="rounded-full border-primary/20 bg-primary/8 px-4 py-1.5 text-[0.76rem] tracking-[0.18em] text-primary"
					>
						Built for people who send images every day
					</Badge>
				</div>

				<div class="reveal mt-6 max-w-3xl" style="--delay: 260ms;">
					<h1
						class="font-display text-[3.3rem] leading-[0.9] text-balance text-foreground sm:text-[4.3rem] lg:text-[5.55rem]"
					>
						Make every image
						<span class="text-primary">lighter to open</span>
						and easier to share.
					</h1>
				</div>

				<p
					class="reveal mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl"
					style="--delay: 340ms;"
				>
					Drop in a folder, choose where the images are headed, and get back clean, compact
					files that still look polished on storefronts, listings, decks, galleries, and phones.
				</p>

				<div class="reveal mt-8 flex flex-col gap-3 sm:flex-row" style="--delay: 420ms;">
					<Button
						href="#start"
						size="lg"
						class="group rounded-full bg-primary px-6 text-[0.95rem] text-primary-foreground shadow-[0_18px_40px_rgba(186,96,48,0.28)] hover:bg-primary/90"
					>
						Start optimizing
						<ArrowRight class="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
					</Button>
					<Button
						href="#workflow"
						size="lg"
						variant="outline"
						class="rounded-full border-border/80 bg-card/75 px-6 text-[0.95rem] backdrop-blur-sm"
					>
						See how a batch moves
					</Button>
				</div>

				<div class="reveal mt-10 flex flex-wrap gap-2.5" style="--delay: 520ms;">
					{#each useCases as label}
						<Badge
							variant="outline"
							class="rounded-full border-border/70 bg-background/75 px-3 py-1.5 text-[0.76rem] text-muted-foreground"
						>
							{label}
						</Badge>
					{/each}
				</div>

				<div class="reveal mt-10 grid gap-3 sm:grid-cols-3" style="--delay: 610ms;">
					{#each heroStats as stat}
						<div class="metric-card">
							<p class="font-display text-4xl leading-none text-foreground">{stat.value}</p>
							<p class="mt-3 max-w-[17ch] text-sm leading-6 text-muted-foreground">{stat.label}</p>
						</div>
					{/each}
				</div>
			</div>

			<div class="reveal relative z-10 lg:justify-self-end" style="--delay: 300ms;">
				<div class="hero-visual">
					<div class="dashboard-panel">
						<div class="flex items-center justify-between gap-3">
							<div>
								<p class="text-xs uppercase tracking-[0.28em] text-muted-foreground">Friday launch batch</p>
								<h2 class="mt-2 font-display text-3xl leading-none text-foreground">
									Ready for storefront, email, and mobile
								</h2>
							</div>
							<Badge class="rounded-full bg-primary px-3 py-1 text-[0.72rem] text-primary-foreground">
								Batch active
							</Badge>
						</div>

						<div class="mt-8 space-y-3">
							{#each previewRows as row, index}
								<div class="preview-row reveal" style={`--delay: ${480 + index * 110}ms;`}>
									<div class="flex items-center justify-between gap-4">
										<div>
											<p class="text-sm font-medium text-foreground">{row.name}</p>
											<p class="mt-1 text-xs uppercase tracking-[0.24em] text-muted-foreground">
												{row.from} to {row.to}
											</p>
										</div>
										<p class="font-display text-2xl text-primary">{row.tone}</p>
									</div>
									<div class="mt-4 h-2 overflow-hidden rounded-full bg-primary/10">
										<div
											class="h-full rounded-full bg-primary/85"
											style={`width: ${row.tone};`}
										></div>
									</div>
								</div>
							{/each}
						</div>

						<div class="mt-8 grid gap-3 sm:grid-cols-3">
							<div class="summary-card">
								<Clock3 class="size-4 text-primary" />
								<p class="mt-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">Average finish time</p>
								<p class="mt-2 font-display text-3xl text-foreground">3:14</p>
							</div>
							<div class="summary-card">
								<Layers3 class="size-4 text-primary" />
								<p class="mt-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">Saved this batch</p>
								<p class="mt-2 font-display text-3xl text-foreground">1.8 GB</p>
							</div>
							<div class="summary-card">
								<Sparkles class="size-4 text-primary" />
								<p class="mt-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">Output feel</p>
								<p class="mt-2 font-display text-3xl text-foreground">Crisp</p>
							</div>
						</div>
					</div>

					<div class="floating-note floating-note-top">
						<p class="text-xs uppercase tracking-[0.24em] text-muted-foreground">Smart export</p>
						<p class="mt-2 font-display text-2xl text-foreground">2048 px long edge</p>
						<p class="mt-2 text-sm leading-6 text-muted-foreground">
							A practical size for storefront zoom, listings, and decks without the drag.
						</p>
					</div>

					<div class="floating-note floating-note-bottom">
						<p class="text-xs uppercase tracking-[0.24em] text-muted-foreground">What changes in practice</p>
						<p class="mt-2 text-sm leading-6 text-muted-foreground">
							Pages open faster, upload forms stop rejecting files, and people actually wait for the gallery to finish loading.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
		<div class="section-shell reveal" style="--delay: 90ms;">
			<div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
				<div class="max-w-2xl">
					<p class="text-xs uppercase tracking-[0.32em] text-muted-foreground">Why people switch</p>
					<h2 class="mt-4 font-display text-4xl leading-none text-foreground sm:text-5xl">
						The images still look intentional. The files stop getting in the way.
					</h2>
				</div>
				<p class="max-w-xl text-base leading-7 text-muted-foreground">
					This is less about knobs and settings, and more about removing the small friction that slows launches, reviews, uploads, and approvals.
				</p>
			</div>

			<div class="mt-10 grid gap-4 lg:grid-cols-3">
				{#each featureCards as feature, index}
					<article class="feature-card reveal" style={`--delay: ${150 + index * 120}ms;`}>
						<div class="icon-chip">
							<feature.icon class="size-4" />
						</div>
						<h3 class="mt-6 font-display text-3xl leading-none text-foreground">{feature.title}</h3>
						<p class="mt-4 text-base leading-7 text-muted-foreground">{feature.body}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section id="workflow" class="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-20">
		<div class="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
			<div class="section-shell section-shell-dark reveal" style="--delay: 120ms;">
				<p class="text-xs uppercase tracking-[0.3em] text-primary-foreground/60">A calmer workflow</p>
				<h2 class="mt-4 font-display text-4xl leading-none text-primary-foreground sm:text-5xl">
					From giant originals to ready-to-send in three small moves.
				</h2>
				<p class="mt-6 max-w-lg text-base leading-7 text-primary-foreground/72">
					You should not have to resize, rename, compress, and second-guess every folder manually. Let the routine part be routine.
				</p>

				<div class="mt-10 space-y-4">
					{#each workflow as step, index}
						<div class="workflow-row reveal" style={`--delay: ${230 + index * 110}ms;`}>
							<div class="workflow-number">{index + 1}</div>
							<div class="flex-1">
								<div class="flex items-center gap-3">
									<step.icon class="size-4 text-primary" />
									<h3 class="text-lg font-medium text-primary-foreground">{step.title}</h3>
								</div>
								<p class="mt-2 text-sm leading-6 text-primary-foreground/70">{step.body}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="section-shell reveal" style="--delay: 220ms;">
				<div class="flex items-center justify-between gap-4">
					<div>
						<p class="text-xs uppercase tracking-[0.28em] text-muted-foreground">Typical wins</p>
						<h3 class="mt-3 font-display text-3xl leading-none text-foreground">
							What a lighter image set looks like in real life
						</h3>
					</div>
					<Badge
						variant="outline"
						class="rounded-full border-border/70 bg-primary/8 px-3 py-1 text-[0.72rem] text-primary"
					>
						Same sharp impression
					</Badge>
				</div>

				<div class="mt-8 grid gap-4">
					{#each scenarioCards as card, index}
						<div class="scenario-card reveal" style={`--delay: ${300 + index * 100}ms;`}>
							<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
								<div>
									<h4 class="font-display text-2xl leading-none text-foreground">{card.title}</h4>
									<p class="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{card.note}</p>
								</div>
								<div class="flex items-center gap-3">
									<div class="size-badge">
										<span class="size-label">Before</span>
										<span class="font-display text-2xl text-foreground">{card.before}</span>
									</div>
									<ArrowRight class="hidden size-4 text-primary md:block" />
									<div class="size-badge size-badge-accent">
										<span class="size-label">After</span>
										<span class="font-display text-2xl text-primary">{card.after}</span>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section id="start" class="mx-auto max-w-7xl px-5 pb-20 pt-6 sm:px-8 lg:px-10 lg:pb-28">
		<div class="cta-shell reveal" style="--delay: 120ms;">
			<div class="max-w-3xl">
				<Badge
					variant="outline"
					class="rounded-full border-primary-foreground/15 bg-primary-foreground/8 px-4 py-1.5 text-[0.76rem] tracking-[0.2em] text-primary-foreground"
				>
					Make the next upload easier
				</Badge>
				<h2 class="mt-6 font-display text-4xl leading-none text-primary-foreground sm:text-6xl">
					Spend less time trimming file size and more time shipping the work.
				</h2>
				<p class="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/76">
					If your images need to look good and arrive fast, this is the step that quietly improves every handoff after it.
				</p>
			</div>

			<div class="mt-10 flex flex-col gap-3 sm:flex-row">
				<Button
					href="/"
					size="lg"
					class="group rounded-full bg-background px-6 text-[0.95rem] text-foreground shadow-[0_16px_30px_rgba(34,19,12,0.15)] hover:bg-background/90"
				>
					Open the optimizer
					<ArrowRight class="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
				</Button>
				<Button
					href="#workflow"
					size="lg"
					variant="outline"
					class="rounded-full border-primary-foreground/20 bg-transparent px-6 text-[0.95rem] text-primary-foreground hover:bg-primary-foreground/10"
				>
					Review the workflow
				</Button>
			</div>

			<div class="mt-10 flex flex-wrap gap-4 text-sm text-primary-foreground/76">
				<div class="inline-flex items-center gap-2">
					<Check class="size-4 text-primary-foreground" />
					<span>Batch folders instead of one-off exports</span>
				</div>
				<div class="inline-flex items-center gap-2">
					<Check class="size-4 text-primary-foreground" />
					<span>Keep detail where people notice it</span>
				</div>
				<div class="inline-flex items-center gap-2">
					<Check class="size-4 text-primary-foreground" />
					<span>Stay under practical upload limits</span>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	:global(.font-display) {
		font-family: var(--font-display);
	}

	.grain {
		position: fixed;
		inset: 0;
		pointer-events: none;
		opacity: 0.16;
		background-image:
			repeating-linear-gradient(
				0deg,
				rgba(255, 255, 255, 0.05) 0,
				rgba(255, 255, 255, 0.05) 1px,
				transparent 1px,
				transparent 4px
			),
			repeating-linear-gradient(
				90deg,
				rgba(68, 42, 21, 0.045) 0,
				rgba(68, 42, 21, 0.045) 1px,
				transparent 1px,
				transparent 5px
			);
		mix-blend-mode: multiply;
	}

	.page-glow {
		position: absolute;
		border-radius: 999px;
		filter: blur(80px);
		opacity: 0.55;
		pointer-events: none;
	}

	.page-glow-left {
		top: 4rem;
		left: -7rem;
		height: 24rem;
		width: 24rem;
		background: radial-gradient(circle, rgba(235, 182, 133, 0.55) 0%, transparent 70%);
	}

	.page-glow-right {
		right: -6rem;
		top: 10rem;
		height: 28rem;
		width: 28rem;
		background: radial-gradient(circle, rgba(194, 106, 60, 0.22) 0%, transparent 70%);
	}

	.section-shell,
	.cta-shell,
	.dashboard-panel,
	.metric-card,
	.feature-card,
	.preview-row,
	.summary-card,
	.scenario-card,
	.workflow-row {
		border: 1px solid color-mix(in oklab, var(--border) 76%, white 24%);
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 250, 244, 0.76) 100%);
		box-shadow:
			0 20px 60px rgba(77, 41, 21, 0.08),
			inset 0 1px 0 rgba(255, 255, 255, 0.78);
		backdrop-filter: blur(14px);
	}

	.section-shell {
		border-radius: 2.25rem;
		padding: 1.4rem;
	}

	.section-shell-dark,
	.cta-shell {
		border-color: rgba(255, 241, 230, 0.12);
		background:
			radial-gradient(circle at top left, rgba(255, 255, 255, 0.08), transparent 34%),
			linear-gradient(135deg, rgba(72, 39, 25, 0.98), rgba(31, 19, 13, 0.98));
		box-shadow: 0 30px 70px rgba(37, 16, 8, 0.26);
	}

	.hero-visual {
		position: relative;
		padding: 1.2rem 0;
	}

	.dashboard-panel {
		position: relative;
		overflow: hidden;
		border-radius: 2rem;
		padding: 1.5rem;
	}

	.dashboard-panel::before {
		content: "";
		position: absolute;
		inset: 0;
		background:
			linear-gradient(120deg, rgba(255, 255, 255, 0.28), transparent 26%),
			linear-gradient(180deg, rgba(191, 106, 62, 0.09), transparent 42%);
		pointer-events: none;
	}

	.metric-card {
		border-radius: 1.5rem;
		padding: 1.25rem;
	}

	.feature-card {
		border-radius: 1.8rem;
		padding: 1.35rem;
		min-height: 18rem;
	}

	.preview-row {
		border-radius: 1.4rem;
		padding: 1rem;
	}

	.summary-card {
		border-radius: 1.35rem;
		padding: 1rem;
	}

	.workflow-row {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		border-radius: 1.5rem;
		padding: 1rem;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02)),
			rgba(255, 255, 255, 0.02);
	}

	.scenario-card {
		border-radius: 1.6rem;
		padding: 1.2rem;
	}

	.icon-chip {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 2.4rem;
		width: 2.4rem;
		border-radius: 999px;
		background: color-mix(in oklab, var(--primary) 14%, white 86%);
		color: var(--primary);
	}

	.workflow-number {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 2.2rem;
		width: 2.2rem;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.08);
		color: var(--primary-foreground);
		font-family: var(--font-display);
		font-size: 1.2rem;
		flex-shrink: 0;
	}

	.size-badge {
		display: inline-flex;
		flex-direction: column;
		gap: 0.2rem;
		border-radius: 1.25rem;
		border: 1px solid color-mix(in oklab, var(--border) 80%, white 20%);
		background: rgba(255, 255, 255, 0.7);
		padding: 0.85rem 1rem;
		min-width: 7.6rem;
	}

	.size-badge-accent {
		background: color-mix(in oklab, var(--primary) 8%, white 92%);
	}

	.size-label {
		font-size: 0.68rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--muted-foreground);
	}

	.floating-note {
		position: absolute;
		width: min(17rem, 46vw);
		border-radius: 1.6rem;
		border: 1px solid color-mix(in oklab, var(--border) 74%, white 26%);
		background: rgba(255, 248, 242, 0.86);
		padding: 1rem 1.1rem;
		box-shadow: 0 20px 60px rgba(74, 39, 19, 0.1);
		backdrop-filter: blur(12px);
		animation: drift 8s ease-in-out infinite;
	}

	.floating-note-top {
		top: -0.2rem;
		right: -1.2rem;
		animation-delay: -2s;
	}

	.floating-note-bottom {
		bottom: -0.5rem;
		left: -1.2rem;
	}

	.cta-shell {
		position: relative;
		overflow: hidden;
		border-radius: 2.5rem;
		padding: 1.55rem;
	}

	.cta-shell::after {
		content: "";
		position: absolute;
		right: -3rem;
		top: -5rem;
		height: 18rem;
		width: 18rem;
		border-radius: 999px;
		background: radial-gradient(circle, rgba(255, 213, 182, 0.18) 0%, transparent 70%);
		filter: blur(12px);
	}

	.reveal {
		opacity: 0;
		transform: translateY(24px);
		animation: reveal 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
		animation-delay: var(--delay, 0ms);
	}

	@keyframes reveal {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes drift {
		0%,
		100% {
			transform: translate3d(0, 0, 0);
		}
		50% {
			transform: translate3d(0, -10px, 0);
		}
	}

	@media (min-width: 640px) {
		.section-shell,
		.dashboard-panel,
		.cta-shell {
			padding: 2rem;
		}

		.metric-card {
			padding: 1.5rem;
		}
	}

	@media (max-width: 1023px) {
		.hero-visual {
			max-width: 42rem;
		}

		.floating-note-top {
			right: 0.5rem;
		}

		.floating-note-bottom {
			left: 0.5rem;
		}
	}

	@media (max-width: 767px) {
		.section-shell,
		.cta-shell,
		.dashboard-panel {
			border-radius: 1.7rem;
		}

		.floating-note {
			position: static;
			width: 100%;
			margin-top: 1rem;
			animation: none;
		}
	}
</style>

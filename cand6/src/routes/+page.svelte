<script lang="ts">
	import { ArrowRight, Download, Layers3, ScanSearch, Scaling } from "@lucide/svelte";
	import { Button } from "$lib/components/ui/button";
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
	} from "$lib/components/ui/card";

	const formats = ["JPEG", "PNG", "WebP", "AVIF", "JPEG XL"];

	const quickFacts = [
		{ value: "61%", label: "smaller delivery export" },
		{ value: "5", label: "formats ready for handoff" },
		{ value: "Safe", label: "original stays untouched" },
	];

	const proofNotes = [
		{ label: "Visual match", value: "96%" },
		{ label: "Export time", value: "under 10 sec" },
		{ label: "Output", value: "AVIF for delivery" },
	];

	const benefits = [
		{
			icon: ScanSearch,
			eyebrow: "Preview-first",
			title: "Check the tradeoff before you commit the file.",
			description:
				"See the smaller export in context so the decision feels measured, not rushed at the last minute.",
		},
		{
			icon: Layers3,
			eyebrow: "Format control",
			title: "Choose the file type that fits the destination.",
			description:
				"Move between storefront-ready formats, proof-set delivery, and cleaner presentation exports without reopening another tool.",
		},
		{
			icon: Scaling,
			eyebrow: "Framing tools",
			title: "Resize, crop, or extend until the composition fits.",
			description:
				"Handle square listings, wide hero banners, and deck-friendly crops without letting the image lose its balance.",
		},
	];

	const workflow = [
		{
			step: "01",
			title: "Drop in the image you already have.",
			description:
				"Start from the real asset, not a preset maze, and keep the original nearby while you shape the delivery version.",
		},
		{
			step: "02",
			title: "Refine the export around where it is going.",
			description:
				"Compare file types, adjust framing, and watch the weight drop without guessing what the tradeoff will feel like.",
		},
		{
			step: "03",
			title: "Send the lighter version with confidence.",
			description:
				"Export the file that earns its place and keep the master untouched when the smaller result does not hold up.",
		},
	];
</script>

<svelte:head>
	<title>oimg | Make image files lighter without flattening them</title>
	<meta
		name="description"
		content="A compact editorial landing page for oimg, the desktop image optimizer for lighter, cleaner, better-fitting exports."
	/>
</svelte:head>

<div class="editorial-page">
	<div class="mx-auto min-h-screen max-w-7xl px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
		<header
			id="top"
			class="reveal flex flex-col gap-5 border-b border-border/70 pb-6 sm:flex-row sm:items-center sm:justify-between"
			style="--delay: 0.04s"
		>
			<a href="#top" class="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.18em] uppercase">
				<span class="brand-dot"></span>
				<span>oimg</span>
			</a>

			<div class="flex flex-wrap gap-2">
				{#each formats as format}
					<span class="format-pill">{format}</span>
				{/each}
			</div>
		</header>

		<main class="flex flex-col gap-18 py-10 sm:gap-20 sm:py-14">
			<section class="grid items-end gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
				<div class="max-w-2xl">
					<p class="section-label reveal" style="--delay: 0.08s">Desktop image optimizer</p>
					<h1
						class="reveal mt-5 max-w-xl font-serif text-5xl leading-[0.92] tracking-[-0.05em] text-foreground sm:text-6xl lg:text-[5.35rem]"
						style="--delay: 0.12s"
					>
						Make image files lighter without flattening the work.
					</h1>
					<p
						class="reveal mt-6 max-w-xl text-balance text-lg leading-8 text-muted-foreground sm:text-[1.08rem]"
						style="--delay: 0.16s"
					>
						`oimg` helps shops, photographers, and launch teams shape the smaller export
						before it leaves the desktop: cleaner formats, better-fitting crops, and less
						compromise in the handoff.
					</p>

					<div class="reveal mt-8 flex flex-wrap gap-3" style="--delay: 0.2s">
						<Button size="lg" class="rounded-full px-5">
							Download app
							<Download class="size-4" />
						</Button>
						<Button size="lg" variant="outline" href="#workflow" class="rounded-full px-5">
							See workflow
							<ArrowRight class="size-4" />
						</Button>
					</div>

					<div class="mt-10 grid gap-3 sm:grid-cols-3">
						{#each quickFacts as fact, index}
							<div
								class="reveal soft-panel rounded-2xl px-4 py-4"
								style={`--delay: ${0.24 + index * 0.06}s`}
							>
								<p class="font-serif text-3xl tracking-[-0.05em] text-foreground">{fact.value}</p>
								<p class="mt-3 text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase">
									{fact.label}
								</p>
							</div>
						{/each}
					</div>
				</div>

				<Card class="reveal paper-card lg:ml-auto" style="--delay: 0.14s">
					<CardHeader class="gap-4">
						<div class="flex items-start justify-between gap-4">
							<div>
								<p class="section-label">Preview board</p>
								<CardTitle class="mt-3 max-w-md font-serif text-4xl leading-[0.96] tracking-[-0.05em]">
									Keep the image intact. Let the file size do the shrinking.
								</CardTitle>
							</div>
							<span class="format-pill whitespace-nowrap">macOS desktop</span>
						</div>
						<CardDescription class="max-w-lg text-base leading-7 text-muted-foreground">
							Choose the smaller export only when it still looks like the image you meant to
							send.
						</CardDescription>
					</CardHeader>

					<CardContent class="space-y-5">
						<div class="rounded-[2rem] border border-border/70 bg-white/55 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:p-6">
							<div class="flex items-end justify-between gap-4">
								<div>
									<p class="section-label">Original</p>
									<p class="mt-2 font-serif text-[clamp(2.6rem,6vw,4.6rem)] leading-none tracking-[-0.06em]">
										18 MB
									</p>
								</div>
								<p class="mb-2 text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
									to
								</p>
								<div class="text-right">
									<p class="section-label">Delivery export</p>
									<p class="mt-2 font-serif text-[clamp(2.6rem,6vw,4.6rem)] leading-none tracking-[-0.06em] text-primary">
										7 MB
									</p>
								</div>
							</div>

							<div class="mt-6 grid gap-4 sm:grid-cols-2">
								<div class="swatch-card">
									<div class="swatch-panel swatch-before"></div>
									<div class="mt-4 flex items-start justify-between gap-3">
										<div>
											<p class="section-label">Before</p>
											<p class="mt-2 text-lg font-semibold text-foreground">PNG master</p>
										</div>
										<p class="text-sm text-muted-foreground">lossless</p>
									</div>
								</div>

								<div class="swatch-card">
									<div class="swatch-panel swatch-after"></div>
									<div class="mt-4 flex items-start justify-between gap-3">
										<div>
											<p class="section-label">After</p>
											<p class="mt-2 text-lg font-semibold text-foreground">AVIF delivery</p>
										</div>
										<p class="text-sm text-muted-foreground">quality 90</p>
									</div>
								</div>
							</div>

							<div class="mt-6 grid gap-3 sm:grid-cols-3">
								{#each proofNotes as note}
									<div class="metric-badge">
										<span>{note.label}</span>
										<strong>{note.value}</strong>
									</div>
								{/each}
							</div>
						</div>
					</CardContent>
				</Card>
			</section>

			<section id="benefits" class="space-y-7">
				<div class="grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
					<div class="reveal" style="--delay: 0.06s">
						<p class="section-label">Why it feels useful</p>
						<h2 class="mt-4 max-w-md font-serif text-4xl leading-[0.97] tracking-[-0.05em] sm:text-5xl">
							Built for the moment a draft becomes a public file.
						</h2>
					</div>
					<p class="reveal max-w-2xl text-base leading-7 text-muted-foreground" style="--delay: 0.1s">
						`oimg` is for the part of image work that usually gets hurried: the export,
						the crop, the destination format, and the last decision before the file leaves your
						hands.
					</p>
				</div>

				<div class="grid gap-4 lg:grid-cols-3">
					{#each benefits as benefit, index}
						<Card
							class="reveal paper-card h-full"
							style={`--delay: ${0.12 + index * 0.06}s`}
						>
							<CardHeader class="gap-5">
								<div class="icon-chip">
									<benefit.icon class="size-5" />
								</div>
								<div>
									<p class="section-label">{benefit.eyebrow}</p>
									<CardTitle class="mt-3 text-2xl leading-tight tracking-[-0.03em]">
										{benefit.title}
									</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<p class="text-sm leading-7 text-muted-foreground">{benefit.description}</p>
							</CardContent>
						</Card>
					{/each}
				</div>
			</section>

			<section id="workflow" class="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10">
				<div class="reveal" style="--delay: 0.06s">
					<p class="section-label">Workflow</p>
					<h2 class="mt-4 max-w-md font-serif text-4xl leading-[0.97] tracking-[-0.05em] sm:text-5xl">
						A calm sequence from original image to lighter handoff.
					</h2>
					<p class="mt-5 max-w-md text-base leading-7 text-muted-foreground">
						The flow stays simple on purpose. The work is not in finding more controls. It is in
						seeing the export clearly enough to choose it well.
					</p>
				</div>

				<div class="relative space-y-4">
					<div class="timeline-track" aria-hidden="true"></div>
					{#each workflow as item, index}
						<Card
							class="reveal paper-card relative"
							style={`--delay: ${0.12 + index * 0.07}s`}
						>
							<CardContent class="grid gap-5 p-6 sm:grid-cols-[auto_1fr] sm:items-start">
								<div class="timeline-mark">{item.step}</div>
								<div>
									<h3 class="font-serif text-3xl leading-[1.02] tracking-[-0.04em] text-foreground">
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

			<section id="download" class="pb-6">
				<Card class="reveal paper-card overflow-hidden" style="--delay: 0.08s">
					<CardHeader class="items-start gap-4 text-left sm:items-center sm:text-center">
						<p class="section-label">Ready when the file is</p>
						<CardTitle class="max-w-3xl font-serif text-4xl leading-[0.95] tracking-[-0.05em] sm:text-5xl">
							Download `oimg` and send the lighter version with confidence.
						</CardTitle>
						<CardDescription class="max-w-2xl text-base leading-7 text-muted-foreground">
							JPEG, PNG, WebP, AVIF, and JPEG XL. Resize, crop, or extend the frame, then keep
							the original when the export does not earn its place.
						</CardDescription>
					</CardHeader>
					<CardContent class="flex flex-col items-start gap-4 sm:items-center">
						<div class="flex flex-wrap gap-3">
							<Button size="lg" class="rounded-full px-5">
								Download app
								<Download class="size-4" />
							</Button>
							<Button size="lg" variant="outline" href="#top" class="rounded-full px-5">
								Back to top
								<ArrowRight class="size-4" />
							</Button>
						</div>
						<p class="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
							Placeholder action for now. The page stays marketing-only.
						</p>
					</CardContent>
				</Card>
			</section>
		</main>
	</div>
</div>

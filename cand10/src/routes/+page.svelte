<script lang="ts">
	import { cubicOut } from "svelte/easing";
	import { onMount, tick } from "svelte";
	import { fade, scale } from "svelte/transition";
	import {
		ArrowRight,
		Download,
		FileImage,
		FolderOpen,
		Layers3,
		Scaling,
		ScanSearch,
		ShieldCheck,
		X
	} from "@lucide/svelte";
	import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "$lib/components/ui/accordion";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";
	import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs";

	const navItems = [
		{ label: "Steps", href: "#steps" },
		{ label: "Board", href: "#board" },
		{ label: "FAQ", href: "#faq" }
	];

	const signalCards = [
		{ label: "Core moves", value: "5", detail: "Optimize, convert, resize, crop, extend." },
		{ label: "Export formats", value: "5", detail: "JPEG, PNG, WebP, AVIF, JPEG XL." },
		{ label: "Safe promise", value: "1", detail: "Keep the original when smaller is not better." }
	];

	const steps = [
		{
			step: "Open",
			icon: FolderOpen,
			title: "Start with the image you already have.",
			description: "Inspect the file before changing it so the export decision starts from the real asset."
		},
		{
			step: "Adjust",
			icon: Scaling,
			title: "Shape the export around where it is going.",
			description:
				"Convert formats, resize, crop, or extend until the output fits the placement instead of fighting it."
		},
		{
			step: "Review",
			icon: ScanSearch,
			title: "Preview the result before you send it.",
			description:
				"Check whether the lighter file still feels right instead of discovering the tradeoff after delivery."
		},
		{
			step: "Ship",
			icon: ShieldCheck,
			title: "Export only when the new file earns its place.",
			description:
				"Send the smaller version with confidence and keep the source untouched when that is the better call."
		}
	];

	const openEffortlesslySlides = [
		{
			title: "Bring images in immediately",
			description: "Start with drag and drop when you want the fastest path from file to workspace.",
			src: "/open_dnd_macos.webp",
			alt: "The OIMG app window receiving an image via drag and drop."
		},
		{
			title: "Open from where you already work",
			description: "Pull images in from the file explorer without breaking the flow of the task.",
			src: "/open_explorer_macos.webp",
			alt: "The macOS Finder open-with menu showing OIMG as an available app."
		},
		{
			title: "Launch from the command line",
			description: "Open OIMG from the terminal when the workflow starts in scripts, shells, or quick handoffs.",
			src: "/open_cli_macos.webp",
			alt: "A macOS terminal invoking OIMG from the command line with an image path."
		}
	];

	const boardCases = [
		{
			value: "catalog",
			label: "Catalog",
			title: "For product pages and listings",
			description:
				"Reduce file weight, standardize output formats, and get storefront images ready without flattening the product photography.",
			checklist: [
				"Convert oversized masters into delivery-ready formats.",
				"Resize for exact listing or gallery placements.",
				"Keep the original asset if the smaller result is not worth publishing."
			],
			outputs: ["WebP", "AVIF", "JPEG"]
		},
		{
			value: "review",
			label: "Review",
			title: "For proofs, galleries, and internal signoff",
			description:
				"Make smaller review files that still feel faithful enough for quick rounds with clients, PMs, or design teammates.",
			checklist: [
				"Preview the tradeoff before the proof goes out.",
				"Choose formats that suit links, attachments, and lightweight review bundles.",
				"Batch repetitive export cleanup when a set has to move quickly."
			],
			outputs: ["JPEG", "PNG", "JPEG XL"]
		},
		{
			value: "launch",
			label: "Launch",
			title: "For campaigns and fast-moving teams",
			description:
				"When one source image turns into multiple placements, OIMG keeps the last export pass focused and repeatable.",
			checklist: [
				"Use one workflow for format changes, sizing, and final framing.",
				"Move faster when handoff pressure is higher than editing time.",
				"Send lighter files with fewer last-minute compromises."
			],
			outputs: ["PNG", "WebP", "AVIF"]
		}
	];

	const safeguards = [
		{
			value: "preview-first",
			question: "Why lead with preview instead of conversion speed?",
			answer:
				"The product pitch here is not just that OIMG can make a file smaller. It is that you can inspect the result before deciding that smaller is actually the better export."
		},
		{
			value: "formats",
			question: "What output formats does this page assume?",
			answer:
				"This landing page stays grounded in the repo messaging: JPEG, PNG, WebP, AVIF, and JPEG XL."
		},
		{
			value: "original",
			question: "What happens if the optimized result is not better?",
			answer:
				"The core safeguard is to keep the source when the smaller result is not the right file to send."
		}
	];

	let isTheaterModeOpen = $state(false);
	let bodyOverflow = "";
	let inlineVideoHeight = $state(0);
	let inlineVideoHost = $state<HTMLDivElement | null>(null);
	let theaterVideoHost = $state<HTMLDivElement | null>(null);
	let theaterDialog = $state<HTMLDivElement | null>(null);
	let videoCardTrigger = $state<HTMLDivElement | null>(null);
	let theaterCloseButton = $state<HTMLButtonElement | null>(null);
	let openEffortlesslyIndex = $state(0);

	function moveNode(node: HTMLElement, target: HTMLElement | null) {
		if (target && node.parentNode !== target) {
			target.appendChild(node);
		}
	}

	function portal(node: HTMLElement, target: HTMLElement | null) {
		moveNode(node, target);

		return {
			update(nextTarget: HTMLElement | null) {
				moveNode(node, nextTarget);
			}
		};
	}

	function lockBodyScroll() {
		if (typeof document === "undefined") return;
		bodyOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
	}

	function unlockBodyScroll() {
		if (typeof document === "undefined") return;
		document.body.style.overflow = bodyOverflow;
	}

	async function openTheaterMode() {
		if (isTheaterModeOpen) return;

		inlineVideoHeight = inlineVideoHost?.getBoundingClientRect().height ?? 0;
		isTheaterModeOpen = true;
		lockBodyScroll();

		await tick();
		theaterCloseButton?.focus();
	}

	async function closeTheaterMode() {
		if (!isTheaterModeOpen) return;

		isTheaterModeOpen = false;
		unlockBodyScroll();

		await tick();
		inlineVideoHeight = 0;
		videoCardTrigger?.focus();
	}

	function handleWindowKeydown(event: KeyboardEvent) {
		if (event.key === "Escape" && isTheaterModeOpen) {
			event.preventDefault();
			void closeTheaterMode();
		}
	}

	function handleVideoCardKeydown(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			void openTheaterMode();
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		const target = event.target;
		if (!(target instanceof Node)) return;

		if (!theaterDialog?.contains(target)) {
			void closeTheaterMode();
		}
	}

	function showOpenEffortlesslySlide(index: number) {
		openEffortlesslyIndex = index;
	}

	onMount(() => {
		window.addEventListener("keydown", handleWindowKeydown);

		return () => {
			window.removeEventListener("keydown", handleWindowKeydown);
			unlockBodyScroll();
		};
	});
</script>

<svelte:head>
	<title>oimg | A calmer final export workflow</title>
	<meta
		name="description"
		content="A stock shadcn-styled OIMG landing page framed as a cleaner operator board for lighter exports, format changes, and safer final-file decisions."
	/>
</svelte:head>

<div class="bg-background text-foreground">
	<div class="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-10">
		<header class="flex flex-col gap-4 border-b py-4 sm:flex-row sm:items-center sm:justify-between">
			<div class="flex items-center gap-3">
				<div class="flex size-9 items-center justify-center rounded-lg border bg-card">
					<FileImage class="size-4" />
				</div>
				<div>
					<p class="text-sm font-semibold">oimg</p>
					<!-- <p class="text-sm text-muted-foreground">Desktop image optimizer</p> -->
				</div>
			</div>

			<div class="flex flex-col gap-3 sm:flex-row sm:items-center">
				<nav class="flex items-center gap-5 text-sm text-muted-foreground">
					{#each navItems as item}
						<a href={item.href} class="transition-colors hover:text-foreground">{item.label}</a>
					{/each}
					<a
						href="https://github.com/yunho-c/oimg"
						target="_blank"
						rel="noreferrer"
						class="transition-colors hover:text-foreground"
					>
						GitHub
					</a>
				</nav>
			</div>
		</header>

		<main class="flex flex-col gap-16 py-10 sm:gap-20 sm:py-16">
			<section class="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
				<div class="space-y-6">
					<!-- <Badge variant="secondary">Preview-first export workflow</Badge> -->
					<div class="space-y-4">
						<h1 class="max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
							Make images lighter without degrading visual quality.
						</h1>
						<p class="max-w-2xl text-lg leading-8 text-muted-foreground">
							OIMG uses modern image compression techniques to reduce file size.
						</p>
					</div>

					<div class="flex flex-col gap-3 sm:flex-row">
						<Button size="lg" href="#download" class="sm:w-auto">
							Download
							<Download class="size-4" />
						</Button>
						<!-- <Button size="lg" variant="outline" href="#board" class="sm:w-auto">
							Open the product board
							<ArrowRight class="size-4" />
						</Button> -->
					</div>
				</div>

				<div
					bind:this={videoCardTrigger}
					class="outline-none"
					role="button"
					tabindex="0"
					aria-haspopup="dialog"
					aria-expanded={isTheaterModeOpen}
					aria-label="Open product demo in theater mode"
					onclick={() => void openTheaterMode()}
					onkeydown={handleVideoCardKeydown}
				>
					<Card class="transform-gpu gap-0 overflow-hidden py-0 shadow-sm transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-2xl focus-within:ring-2 focus-within:ring-primary/40">
						<div
							bind:this={inlineVideoHost}
							class="w-full"
							style:min-height={isTheaterModeOpen && inlineVideoHeight > 0
								? `${inlineVideoHeight}px`
								: null}
						>
							<video
								use:portal={isTheaterModeOpen ? theaterVideoHost : inlineVideoHost}
								class={isTheaterModeOpen
									? "block max-h-[90vh] w-auto max-w-full bg-black"
									: "block h-auto w-full bg-black"}
								src="/product-demo.mov"
								autoplay
								muted
								loop
								playsinline
								preload="metadata"
							>
								Your browser does not support the product demo video.
							</video>
						</div>
					</Card>
				</div>
			</section>

			<section class="grid gap-6 lg:grid-cols-[0.74fr_1.26fr] lg:items-center">
				<div class="space-y-4">
					<h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
						Open effortlessly
					</h2>
					<p class="text-base leading-7 text-muted-foreground">
						<button
							type="button"
							class={`font-medium underline decoration-current underline-offset-4 transition-colors ${
								openEffortlesslyIndex === 0 ? "text-foreground" : "hover:text-foreground"
							}`}
							onmouseenter={() => showOpenEffortlesslySlide(0)}
							onfocus={() => showOpenEffortlesslySlide(0)}
							onclick={() => showOpenEffortlesslySlide(0)}
						>
							Drag and drop your images
						</button>,
						<button
							type="button"
							class={`font-medium underline decoration-current underline-offset-4 transition-colors ${
								openEffortlesslyIndex === 1 ? "text-foreground" : "hover:text-foreground"
							}`}
							onmouseenter={() => showOpenEffortlesslySlide(1)}
							onfocus={() => showOpenEffortlesslySlide(1)}
							onclick={() => showOpenEffortlesslySlide(1)}
						>
							open from your file explorer
						</button>,
						or
						<button
							type="button"
							class={`font-medium underline decoration-current underline-offset-4 transition-colors ${
								openEffortlesslyIndex === 2 ? "text-foreground" : "hover:text-foreground"
							}`}
							onmouseenter={() => showOpenEffortlesslySlide(2)}
							onfocus={() => showOpenEffortlesslySlide(2)}
							onclick={() => showOpenEffortlesslySlide(2)}
						>
							invoke from the command line
						</button>.
					</p>
				</div>

				<Card class="gap-4 overflow-hidden bg-card/80 p-5 shadow-sm">
					<div class="overflow-hidden rounded-2xl bg-muted/20">
						<div
							class="flex transition-transform duration-500 ease-in-out"
							style={`transform: translateX(-${openEffortlesslyIndex * 100}%);`}
						>
							{#each openEffortlesslySlides as slide, index}
								<div class="min-w-full p-4 sm:p-5">
									<div class="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border bg-background shadow-sm">
										<img
											class="block max-h-full w-auto max-w-full"
											src={slide.src}
											alt={slide.alt}
											loading={index === 0 ? "eager" : "lazy"}
										/>
									</div>
								</div>
							{/each}
						</div>
					</div>

					<div class="flex items-center justify-center gap-2">
						{#each openEffortlesslySlides as _, index}
							<button
								type="button"
								class={`size-2.5 rounded-full transition-colors ${
									index === openEffortlesslyIndex ? "bg-foreground" : "bg-muted-foreground/25 hover:bg-muted-foreground/45"
								}`}
								aria-label={`Show screenshot ${index + 1}`}
								aria-pressed={index === openEffortlesslyIndex}
								onclick={() => showOpenEffortlesslySlide(index)}
							></button>
						{/each}
					</div>
				</Card>
			</section>

			<!-- <section class="grid gap-4 md:grid-cols-3">
				{#each signalCards as card}
					<Card>
						<CardHeader class="gap-1">
							<CardDescription>{card.label}</CardDescription>
							<CardTitle class="text-2xl">{card.value}</CardTitle>
						</CardHeader>
						<CardContent class="pt-0">
							<p class="text-sm leading-6 text-muted-foreground">{card.detail}</p>
						</CardContent>
					</Card>
				{/each}
			</section> -->

			<section class="grid gap-6 lg:grid-cols-[0.74fr_1.26fr]" id="steps">
				<div class="space-y-3">
					<Badge variant="outline">Four-step rail</Badge>
					<h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
						A field guide for the final export pass.
					</h2>
					<p class="text-base leading-7 text-muted-foreground">
						This version of the page is structured around the operational sequence rather than a
						marketing hero. The point is clarity: what happens first, what gets decided next,
						and what safeguard stays in place at the end.
					</p>
				</div>

				<Card>
					<CardContent class="space-y-6 p-6">
						{#each steps as item, index}
							<div class="space-y-4">
								<div class="flex items-start gap-4">
									<div class="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/30">
										<item.icon class="size-4 text-muted-foreground" />
									</div>
									<div class="space-y-2">
										<div class="flex flex-wrap items-center gap-2">
											<Badge variant="outline">{item.step}</Badge>
											<h3 class="text-base font-semibold">{item.title}</h3>
										</div>
										<p class="text-sm leading-7 text-muted-foreground">{item.description}</p>
									</div>
								</div>
								{#if index < steps.length - 1}
									<Separator />
								{/if}
							</div>
						{/each}
					</CardContent>
				</Card>
			</section>

			<section class="space-y-6" id="board">
				<div class="max-w-2xl space-y-3">
					<Badge variant="outline">Decision board</Badge>
					<h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
						Choose the scenario. Keep the workflow.
					</h2>
					<p class="text-base leading-7 text-muted-foreground">
						The destination changes, but the job stays the same: lighter file, better fit,
						clearer export decision.
					</p>
				</div>

				<Tabs value="catalog" class="w-full">
					<TabsList variant="line" class="w-full justify-start overflow-x-auto">
						{#each boardCases as item}
							<TabsTrigger value={item.value} class="shrink-0">{item.label}</TabsTrigger>
						{/each}
					</TabsList>

					{#each boardCases as item}
						<TabsContent value={item.value}>
							<div class="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
								<Card>
									<CardHeader class="space-y-3">
										<div class="flex flex-wrap gap-2">
											{#each item.outputs as output}
												<Badge variant="secondary">{output}</Badge>
											{/each}
										</div>
										<CardTitle>{item.title}</CardTitle>
										<CardDescription class="text-base leading-7">
											{item.description}
										</CardDescription>
									</CardHeader>
									<CardContent class="space-y-4">
										{#each item.checklist as point, index}
											<div class="space-y-4">
												<div class="flex gap-3">
													<div class="mt-1 flex size-6 items-center justify-center rounded-full border">
														<div class="size-2 rounded-full bg-foreground/60"></div>
													</div>
													<p class="text-sm leading-7 text-muted-foreground">{point}</p>
												</div>
												{#if index < item.checklist.length - 1}
													<Separator />
												{/if}
											</div>
										{/each}
									</CardContent>
								</Card>

								<Card>
									<CardHeader class="space-y-3">
										<Badge variant="outline" class="w-fit">What changes</Badge>
										<CardTitle>Export board</CardTitle>
										<CardDescription class="text-base leading-7">
											Each scenario shifts the output target, but not the decision surface.
										</CardDescription>
									</CardHeader>
									<CardContent class="space-y-4">
										<div class="rounded-lg border bg-muted/30 p-4">
											<p class="text-sm font-medium">Source stays visible</p>
											<p class="mt-2 text-sm leading-6 text-muted-foreground">
												Start from the existing image instead of rebuilding the asset elsewhere.
											</p>
										</div>
										<div class="rounded-lg border bg-muted/30 p-4">
											<p class="text-sm font-medium">Output gets tuned</p>
											<p class="mt-2 text-sm leading-6 text-muted-foreground">
												Format, framing, and file weight shift to match the destination.
											</p>
										</div>
										<div class="rounded-lg border bg-muted/30 p-4">
											<p class="text-sm font-medium">Safeguard remains</p>
											<p class="mt-2 text-sm leading-6 text-muted-foreground">
												The smaller file should still be the better file before it gets sent.
											</p>
										</div>
									</CardContent>
								</Card>
							</div>
						</TabsContent>
					{/each}
				</Tabs>
			</section>

			<section class="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]" id="faq">
				<Card>
					<CardHeader class="space-y-3">
						<Badge variant="outline" class="w-fit">Safeguards</Badge>
						<CardTitle class="text-3xl tracking-tight sm:text-4xl">
							Keep the promise narrow and practical.
						</CardTitle>
						<CardDescription class="text-base leading-7">
							This page is framed less like a landing page and more like a product briefing:
							what it supports, how it behaves, and why that behavior matters.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Accordion type="single" class="w-full">
							{#each safeguards as item}
								<AccordionItem value={item.value}>
									<AccordionTrigger>{item.question}</AccordionTrigger>
									<AccordionContent>{item.answer}</AccordionContent>
								</AccordionItem>
							{/each}
						</Accordion>
					</CardContent>
				</Card>

				<Card>
					<CardHeader class="space-y-3">
						<Badge variant="secondary" class="w-fit">Quick scope</Badge>
						<CardTitle>What lives inside OIMG</CardTitle>
						<CardDescription class="text-base leading-7">
							The product scope in these candidates stays consistent even when the page
							structure changes.
						</CardDescription>
					</CardHeader>
					<CardContent class="space-y-4">
						<div class="flex items-start gap-3 rounded-lg border p-4">
							<div class="flex size-8 shrink-0 items-center justify-center rounded-md border bg-muted/30">
								<Layers3 class="size-4 text-muted-foreground" />
							</div>
							<div>
								<p class="text-sm font-medium">Optimize and convert</p>
								<p class="mt-2 text-sm leading-6 text-muted-foreground">
									Move between modern output formats without turning the final export decision
									into guesswork.
								</p>
							</div>
						</div>
						<div class="flex items-start gap-3 rounded-lg border p-4">
							<div class="flex size-8 shrink-0 items-center justify-center rounded-md border bg-muted/30">
								<Scaling class="size-4 text-muted-foreground" />
							</div>
							<div>
								<p class="text-sm font-medium">Resize, crop, and extend</p>
								<p class="mt-2 text-sm leading-6 text-muted-foreground">
									Adjust the image for the actual placement before it leaves the desktop.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>

			<section id="download">
				<Card>
					<CardHeader class="space-y-3">
						<Badge variant="secondary" class="w-fit">Download</Badge>
						<CardTitle class="max-w-3xl text-3xl tracking-tight sm:text-4xl">
							Use OIMG when the file is almost done, but not ready to leave yet.
						</CardTitle>
						<CardDescription class="max-w-2xl text-base leading-7">
							From product pages to proofs to fast-moving launches, the final export pass
							becomes easier to reason about when the decision surface stays small.
						</CardDescription>
					</CardHeader>
					<CardFooter class="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
						<p class="text-sm text-muted-foreground">Desktop app for deliberate export cleanup</p>
						<Button size="lg" href="#download" class="sm:w-auto">
							Download
							<Download class="size-4" />
						</Button>
					</CardFooter>
				</Card>
			</section>
		</main>
	</div>

	{#if isTheaterModeOpen}
		<div
			class="fixed inset-0 z-50 bg-black/55 backdrop-blur-[2px]"
			role="presentation"
			onclick={handleBackdropClick}
			transition:fade={{ duration: 200 }}
		>
				<div class="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-10">
					<div
						bind:this={theaterDialog}
						class="relative mx-auto w-fit max-w-[90vw]"
						role="dialog"
						tabindex="-1"
						aria-modal="true"
					aria-label="Product demo theater mode"
					transition:scale={{ duration: 220, easing: cubicOut, start: 0.96 }}
				>
					<button
						bind:this={theaterCloseButton}
						type="button"
						class="absolute right-3 top-3 z-10 inline-flex size-10 items-center justify-center rounded-full bg-black/60 text-white shadow-lg transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
						aria-label="Close theater mode"
						onclick={() => void closeTheaterMode()}
					>
						<X class="size-4" />
					</button>

					<div
						bind:this={theaterVideoHost}
						class="inline-flex max-h-[90vh] max-w-[90vw] items-center justify-center overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
					></div>
				</div>
			</div>
		</div>
	{/if}
</div>

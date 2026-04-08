<script lang="ts">
	import {
		ArrowRight,
		Download,
		FolderOpen,
		Images,
		Layers3,
		Scaling,
		ScanSearch,
		ShieldCheck
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
		{ label: "Workflow", href: "#workflow" },
		{ label: "Use cases", href: "#use-cases" },
		{ label: "FAQ", href: "#faq" }
	];

	const trustItems = [
		{ label: "Preview-first export decisions", icon: ScanSearch },
		{ label: "Five modern delivery formats", icon: Layers3 },
		{ label: "Keep the original when needed", icon: ShieldCheck }
	];

	const workflow = [
		{
			step: "01",
			icon: FolderOpen,
			title: "Bring in the source image.",
			description:
				"Open the file you already have and inspect it before changing anything."
		},
		{
			step: "02",
			icon: Scaling,
			title: "Shape the export around its destination.",
			description:
				"Optimize, convert, resize, crop, or extend with the final placement in mind."
		},
		{
			step: "03",
			icon: ShieldCheck,
			title: "Send the lighter version with confidence.",
			description:
				"Export the smaller file when it earns its place and keep the source untouched when it does not."
		}
	];

	const useCases = [
		{
			value: "storefronts",
			label: "Storefronts",
			title: "Make product images easier to load and easier to upload.",
			description:
				"Prepare listing photos, detail shots, and campaign assets for pages that need to stay fast without looking flat.",
			points: [
				"Convert oversized masters into delivery-ready formats for product pages.",
				"Resize or crop for exact placements without bouncing between tools.",
				"Keep the source asset when the smaller version is not worth shipping."
			],
			formats: ["WebP", "AVIF", "JPEG"]
		},
		{
			value: "proofs",
			label: "Proof sets",
			title: "Deliver lighter proofs without turning them into compressed leftovers.",
			description:
				"Check the export before you send it so clients, teammates, and reviewers see the right balance of quality and file weight.",
			points: [
				"Preview the tradeoff instead of guessing how hard compression will land.",
				"Choose a format that suits gallery links, email delivery, or quick review rounds.",
				"Handle whole sets with a workflow that stays focused on the finished file."
			],
			formats: ["JPEG", "PNG", "JPEG XL"]
		},
		{
			value: "teams",
			label: "Fast-moving teams",
			title: "Clean up the last export pass before a launch or handoff.",
			description:
				"When an image needs to fit a layout, load faster, and leave the room quickly, oimg keeps the decision surface small and practical.",
			points: [
				"Use one place for format changes, sizing, and final framing adjustments.",
				"Reduce repetitive export cleanup when one image becomes many placements.",
				"Send lighter files with fewer last-minute compromises."
			],
			formats: ["PNG", "WebP", "AVIF"]
		}
	];

	const faqs = [
		{
			value: "formats",
			question: "Which formats does OIMG support?",
			answer:
				"OIMG is positioned here around JPEG, PNG, WebP, AVIF, and JPEG XL so the final export can match where the image is going."
		},
		{
			value: "preview",
			question: "What does preview-first mean here?",
			answer:
				"It means the export decision happens after you check the result in context, not after a blind conversion that you only inspect later."
		},
		{
			value: "originals",
			question: "What happens when the optimized file is not actually better?",
			answer:
				"The product promise throughout these candidates is to keep the original when a smaller result is not the right file to send."
		}
	];
</script>

<svelte:head>
	<title>oimg | Preview-first image optimization</title>
	<meta
		name="description"
		content="A workflow-first shadcn-svelte landing page for oimg, the desktop image optimizer for lighter exports, format changes, and safer final-file decisions."
	/>
</svelte:head>

<div class="bg-background text-foreground">
	<div class="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-10">
		<header class="flex flex-col gap-4 border-b py-4 sm:flex-row sm:items-center sm:justify-between">
			<div class="flex items-center gap-3">
				<div class="flex size-9 items-center justify-center rounded-lg border bg-card">
					<Images class="size-4" />
				</div>
				<div>
					<p class="text-sm font-semibold">oimg</p>
					<p class="text-sm text-muted-foreground">Desktop image optimizer</p>
				</div>
			</div>

			<div class="flex flex-col gap-3 sm:flex-row sm:items-center">
				<nav class="flex items-center gap-5 text-sm text-muted-foreground">
					{#each navItems as item}
						<a href={item.href} class="transition-colors hover:text-foreground">{item.label}</a>
					{/each}
				</nav>
				<Button size="sm" href="#download">
					Download app
					<Download class="size-4" />
				</Button>
			</div>
		</header>

		<main class="flex flex-col gap-16 py-10 sm:gap-20 sm:py-16">
			<section class="space-y-8">
				<div class="max-w-3xl space-y-5">
					<Badge variant="secondary">Desktop image optimizer</Badge>
					<h1 class="max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
						Make the final image file decision with less guesswork.
					</h1>
					<p class="max-w-2xl text-lg leading-8 text-muted-foreground">
						oimg helps with the last mile of image work: lighter exports, cleaner format
						changes, better-fitting crops, and more confidence before the file gets uploaded,
						shared, or handed off.
					</p>
					<div class="flex flex-col gap-3 sm:flex-row">
						<Button size="lg" href="#download" class="sm:w-auto">
							Download app
							<Download class="size-4" />
						</Button>
						<Button size="lg" variant="outline" href="#workflow" class="sm:w-auto">
							See workflow
							<ArrowRight class="size-4" />
						</Button>
					</div>
				</div>

				<div class="grid gap-3 md:grid-cols-3">
					{#each trustItems as item}
						<div class="flex items-center gap-3 rounded-lg border bg-card px-4 py-3 text-sm">
							<div class="flex size-8 items-center justify-center rounded-md border bg-muted/30">
								<item.icon class="size-4 text-muted-foreground" />
							</div>
							<p class="font-medium">{item.label}</p>
						</div>
					{/each}
				</div>
			</section>

			<section class="space-y-6" id="workflow">
				<div class="max-w-2xl space-y-3">
					<Badge variant="outline">Workflow</Badge>
					<h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
						Three clear steps from source image to lighter export.
					</h2>
					<p class="text-base leading-7 text-muted-foreground">
						This is the core product story: inspect the source, shape the export, and send the
						smaller file only when it is actually the better file.
					</p>
				</div>

				<div class="grid gap-4 lg:grid-cols-3">
					{#each workflow as item}
						<Card class="h-full">
							<CardHeader class="gap-4">
								<div class="flex items-center justify-between gap-3">
									<div class="flex size-10 items-center justify-center rounded-lg border bg-muted/30">
										<item.icon class="size-4 text-muted-foreground" />
									</div>
									<Badge variant="outline">{item.step}</Badge>
								</div>
								<div class="space-y-2">
									<CardTitle>{item.title}</CardTitle>
									<CardDescription class="text-sm leading-7">
										{item.description}
									</CardDescription>
								</div>
							</CardHeader>
						</Card>
					{/each}
				</div>
			</section>

			<section class="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]" id="use-cases">
				<div class="space-y-3">
					<Badge variant="outline">Use cases</Badge>
					<h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
						The same workflow, tuned to where the image is going next.
					</h2>
					<p class="text-base leading-7 text-muted-foreground">
						Use cases change the destination, but not the job: make the file lighter, keep the
						image credible, and avoid unnecessary export cleanup.
					</p>
				</div>

				<Tabs value="storefronts" class="w-full">
					<TabsList class="grid w-full grid-cols-3">
						{#each useCases as useCase}
							<TabsTrigger value={useCase.value}>{useCase.label}</TabsTrigger>
						{/each}
					</TabsList>

					{#each useCases as useCase}
						<TabsContent value={useCase.value}>
							<Card>
								<CardHeader class="space-y-3">
									<div class="flex flex-wrap gap-2">
										{#each useCase.formats as format}
											<Badge variant="secondary">{format}</Badge>
										{/each}
									</div>
									<CardTitle>{useCase.title}</CardTitle>
									<CardDescription class="text-base leading-7">
										{useCase.description}
									</CardDescription>
								</CardHeader>
								<CardContent class="space-y-4">
									{#each useCase.points as point, index}
										<div class="space-y-4">
											<div class="flex gap-3">
												<div class="mt-1 flex size-6 items-center justify-center rounded-full border">
													<div class="size-2 rounded-full bg-foreground/60"></div>
												</div>
												<p class="text-sm leading-7 text-muted-foreground">{point}</p>
											</div>
											{#if index < useCase.points.length - 1}
												<Separator />
											{/if}
										</div>
									{/each}
								</CardContent>
							</Card>
						</TabsContent>
					{/each}
				</Tabs>
			</section>

			<section class="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]" id="faq">
				<Card>
					<CardHeader class="space-y-3">
						<Badge variant="outline" class="w-fit">FAQ</Badge>
						<CardTitle class="text-3xl tracking-tight sm:text-4xl">
							Practical questions before the export leaves your hands.
						</CardTitle>
						<CardDescription class="text-base leading-7">
							The page promise stays narrow: preview the result, choose the right format, and
							keep the source when the smaller file is not the better one.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Accordion type="single" class="w-full">
							{#each faqs as item}
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
						<Badge variant="secondary" class="w-fit">Support</Badge>
						<CardTitle>What OIMG is for</CardTitle>
						<CardDescription class="text-base leading-7">
							OIMG is not a full editing suite. It is a focused place for the final export pass:
							file weight, format, framing, and delivery readiness.
						</CardDescription>
					</CardHeader>
					<CardContent class="space-y-4">
						<div class="rounded-lg border bg-muted/30 p-4">
							<p class="text-sm font-medium">Core actions</p>
							<p class="mt-2 text-sm leading-6 text-muted-foreground">
								Optimize, convert, resize, crop, and extend.
							</p>
						</div>
						<div class="rounded-lg border bg-muted/30 p-4">
							<p class="text-sm font-medium">Supported outputs</p>
							<p class="mt-2 text-sm leading-6 text-muted-foreground">
								JPEG, PNG, WebP, AVIF, and JPEG XL.
							</p>
						</div>
					</CardContent>
				</Card>
			</section>

			<section id="download">
				<Card>
					<CardHeader class="space-y-3">
						<Badge variant="secondary" class="w-fit">Download</Badge>
						<CardTitle class="max-w-3xl text-3xl tracking-tight sm:text-4xl">
							Send lighter image files with a calmer final-file workflow.
						</CardTitle>
						<CardDescription class="max-w-2xl text-base leading-7">
							For storefront photos, proof sets, campaign assets, and portfolio exports, oimg
							helps you make the last export decision with more confidence.
						</CardDescription>
					</CardHeader>
					<CardFooter class="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
						<p class="text-sm text-muted-foreground">Desktop app for focused export cleanup</p>
						<Button size="lg" href="#download" class="sm:w-auto">
							Download app
							<Download class="size-4" />
						</Button>
					</CardFooter>
				</Card>
			</section>
		</main>
	</div>
</div>

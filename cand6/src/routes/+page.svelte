<script lang="ts">
	import { ArrowUpRight, Layers3, Sparkles, Terminal } from "@lucide/svelte";
	import { Button } from "$lib/components/ui/button";
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
	} from "$lib/components/ui/card";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";

	const features = [
		{
			title: "SvelteKit + Bun",
			description: "Minimal app scaffolded with the current Svelte CLI and installed with Bun.",
			icon: Terminal,
		},
		{
			title: "Tailwind v4",
			description: "Tailwind is wired through the Svelte add-on and ready for utility-first styling.",
			icon: Layers3,
		},
		{
			title: "shadcn-svelte",
			description: "Nova preset initialized with base aliases plus button, card, input, and label.",
			icon: Sparkles,
		},
	];
</script>

<svelte:head>
	<title>cand6 | SvelteKit + shadcn-svelte</title>
	<meta
		name="description"
		content="Starter scaffold for a SvelteKit, Bun, Tailwind, and shadcn-svelte project."
	/>
</svelte:head>

<div class="relative min-h-screen overflow-hidden bg-background text-foreground">
	<div class="pointer-events-none absolute inset-0">
		<div class="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.08),transparent_60%)]"></div>
		<div class="absolute left-1/2 top-32 h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.08),transparent_65%)] blur-3xl"></div>
	</div>

	<div class="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-10 lg:px-10">
		<header class="flex items-center justify-between border-b border-border/70 pb-5">
			<div>
				<p class="text-xs font-medium tracking-[0.24em] text-muted-foreground uppercase">cand6</p>
				<h1 class="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
					SvelteKit starter with shadcn-svelte wired in.
				</h1>
			</div>

			<Button href="https://shadcn-svelte.com/docs" target="_blank" rel="noreferrer">
				Open docs
				<ArrowUpRight class="size-4" />
			</Button>
		</header>

		<section class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
			<Card class="border-border/70 bg-card/80 backdrop-blur">
				<CardHeader class="gap-3">
					<CardTitle class="text-3xl leading-tight sm:text-4xl">
						Scaffold first, then shape the app around real components.
					</CardTitle>
					<CardDescription class="max-w-2xl text-base leading-7 text-muted-foreground">
						This project starts with the current `sv create` flow, Bun for dependency management,
						Tailwind v4, and a ready-to-use shadcn-svelte setup using the Nova style preset.
					</CardDescription>
				</CardHeader>

				<CardContent class="flex flex-wrap gap-3">
					<Button>Start building</Button>
					<Button variant="outline" href="https://svelte.dev/docs/kit" target="_blank" rel="noreferrer">
						SvelteKit docs
					</Button>
				</CardContent>
			</Card>

			<Card class="border-border/70 bg-card/80 backdrop-blur">
				<CardHeader>
					<CardTitle>Starter form</CardTitle>
					<CardDescription>Use this area to wire your first route, CTA, or signup flow.</CardDescription>
				</CardHeader>

				<CardContent class="space-y-4">
					<div class="space-y-2">
						<Label for="project-name">Project name</Label>
						<Input id="project-name" value="cand6" />
					</div>

					<div class="space-y-2">
						<Label for="stack">Stack</Label>
						<Input id="stack" value="SvelteKit / Bun / Tailwind / shadcn-svelte" />
					</div>

					<Button class="w-full">Ship the first screen</Button>
				</CardContent>
			</Card>
		</section>

		<section class="grid gap-4 md:grid-cols-3">
			{#each features as feature}
				<Card class="border-border/70 bg-card/75 backdrop-blur">
					<CardHeader class="gap-3">
						<div class="flex size-10 items-center justify-center rounded-lg border border-border/70 bg-background">
							<feature.icon class="size-5" />
						</div>
						<div class="space-y-1">
							<CardTitle>{feature.title}</CardTitle>
							<CardDescription class="leading-6">{feature.description}</CardDescription>
						</div>
					</CardHeader>
				</Card>
			{/each}
		</section>
	</div>
</div>

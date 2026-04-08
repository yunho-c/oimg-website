<script lang="ts">
	import {
		ArrowRight,
		CheckCircle2,
		GitBranch,
		Globe,
		MessagesSquare,
		PlayCircle,
		Rocket,
		ShieldCheck,
		TimerReset,
		Users,
	} from "@lucide/svelte";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
	} from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";

	const navItems = [
		{ label: "Features", href: "#features" },
		{ label: "Workflow", href: "#workflow" },
		{ label: "Pricing", href: "#cta" },
	];

	const stats = [
		{ value: "42 sec", label: "average preview spin-up" },
		{ value: "128", label: "active branch previews" },
		{ value: "94%", label: "merged after preview approval" },
	];

	const features = [
		{
			icon: Globe,
			title: "Preview URLs for every branch",
			description:
				"Each pull request gets a review-ready environment with a stable URL your team can open immediately.",
		},
		{
			icon: Users,
			title: "Shareable review links",
			description:
				"Design, product, QA, and engineering can all review the same deployed branch instead of passing screenshots around.",
		},
		{
			icon: ShieldCheck,
			title: "Merge with more confidence",
			description:
				"Checks, approvals, and branch status stay attached to the preview so teams can decide before merge, not after release.",
		},
	];

	const steps = [
		{
			title: "Push a branch",
			description: "Branchlight detects the commit and starts a preview environment automatically.",
		},
		{
			title: "Open the preview",
			description: "Share the live URL with teammates for design review, QA passes, and product signoff.",
		},
		{
			title: "Merge after approval",
			description: "Ship once the preview is reviewed and the linked checks are green.",
		},
	];

	const reviewers = ["Design", "QA", "PM", "Frontend"];
</script>

<svelte:head>
	<title>Branchlight | Review every branch in a real deploy preview</title>
	<meta
		name="description"
		content="Branchlight gives engineering teams preview URLs, review-ready environments, and pre-merge confidence for every branch."
	/>
</svelte:head>

<div class="bg-background text-foreground">
	<div class="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-10">
		<header class="flex flex-col gap-4 border-b py-4 sm:flex-row sm:items-center sm:justify-between">
			<div class="flex items-center gap-3">
				<div class="flex size-9 items-center justify-center rounded-lg border bg-card">
					<GitBranch class="size-4" />
				</div>
				<div>
					<p class="text-sm font-semibold">Branchlight</p>
					<p class="text-sm text-muted-foreground">Deploy previews for engineering teams</p>
				</div>
			</div>

			<div class="flex flex-col gap-3 sm:flex-row sm:items-center">
				<nav class="flex items-center gap-5 text-sm text-muted-foreground">
					{#each navItems as item}
						<a href={item.href} class="transition-colors hover:text-foreground">{item.label}</a>
					{/each}
				</nav>
				<Button size="sm">Start free</Button>
			</div>
		</header>

		<main class="flex flex-col gap-16 py-10 sm:gap-20 sm:py-16">
			<section class="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
				<div class="space-y-6">
					<Badge variant="secondary">Preview environments for every pull request</Badge>

					<div class="space-y-4">
						<h1 class="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
							Review every branch in a real deploy preview before you merge.
						</h1>
						<p class="max-w-2xl text-lg leading-8 text-muted-foreground">
							Branchlight gives engineers, designers, and PMs a live preview URL for each
							branch so feedback happens in the deployed product, not in a comment thread.
						</p>
					</div>

					<div class="flex flex-col gap-3 sm:flex-row">
						<Button size="lg" class="sm:w-auto">
							Start free
							<Rocket class="size-4" />
						</Button>
						<Button size="lg" variant="outline" class="sm:w-auto">
							View demo
							<PlayCircle class="size-4" />
						</Button>
					</div>

					<div class="grid gap-4 sm:grid-cols-3">
						{#each stats as stat}
							<Card>
								<CardHeader class="gap-1">
									<CardTitle class="text-2xl">{stat.value}</CardTitle>
									<CardDescription>{stat.label}</CardDescription>
								</CardHeader>
							</Card>
						{/each}
					</div>
				</div>

				<Card class="w-full">
					<CardHeader class="gap-3">
						<div class="flex items-center justify-between gap-4">
							<div>
								<CardTitle>Preview summary</CardTitle>
								<CardDescription>PR #1842 · checkout-refactor</CardDescription>
							</div>
							<Badge>Ready to review</Badge>
						</div>
					</CardHeader>

					<CardContent class="space-y-6">
						<div class="rounded-lg border bg-muted/30 p-4">
							<div class="flex items-center justify-between gap-3">
								<div class="space-y-1">
									<p class="text-sm font-medium">Preview URL</p>
									<p class="text-sm text-muted-foreground">
										preview.branchlight.app/checkout-refactor
									</p>
								</div>
								<Globe class="size-4 text-muted-foreground" />
							</div>
						</div>

						<div class="grid gap-4 sm:grid-cols-2">
							<div class="rounded-lg border p-4">
								<div class="flex items-center gap-2 text-sm font-medium">
									<TimerReset class="size-4 text-muted-foreground" />
									Spin-up time
								</div>
								<p class="mt-3 text-2xl font-semibold tracking-tight">38 sec</p>
							</div>

							<div class="rounded-lg border p-4">
								<div class="flex items-center gap-2 text-sm font-medium">
									<CheckCircle2 class="size-4 text-muted-foreground" />
									Linked checks
								</div>
								<p class="mt-3 text-2xl font-semibold tracking-tight">12/12 passed</p>
							</div>
						</div>

						<Separator />

						<div class="space-y-3">
							<div class="flex items-center gap-2 text-sm font-medium">
								<MessagesSquare class="size-4 text-muted-foreground" />
								Reviewers
							</div>

							<div class="flex flex-wrap gap-2">
								{#each reviewers as reviewer}
									<Badge variant="outline">{reviewer}</Badge>
								{/each}
							</div>
						</div>
					</CardContent>
				</Card>
			</section>

			<section class="space-y-6" id="features">
				<div class="max-w-2xl space-y-3">
					<Badge variant="outline">Feature summary</Badge>
					<h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
						A standard review loop for code that needs to be seen live.
					</h2>
					<p class="text-base leading-7 text-muted-foreground">
						Branchlight keeps preview URLs, reviewers, and merge readiness in one place so
						teams can verify real behavior before production.
					</p>
				</div>

				<div class="grid gap-4 lg:grid-cols-3">
					{#each features as feature}
						<Card class="h-full">
							<CardHeader class="gap-4">
								<div class="flex size-10 items-center justify-center rounded-lg border bg-muted/30">
									<feature.icon class="size-4" />
								</div>
								<div class="space-y-2">
									<CardTitle>{feature.title}</CardTitle>
									<CardDescription class="text-sm leading-7">
										{feature.description}
									</CardDescription>
								</div>
							</CardHeader>
						</Card>
					{/each}
				</div>
			</section>

			<section class="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]" id="workflow">
				<div class="space-y-3">
					<Badge variant="outline">Workflow</Badge>
					<h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
						Push, preview, review, merge.
					</h2>
					<p class="text-base leading-7 text-muted-foreground">
						Every branch follows the same path, which makes review easier to schedule and
						release decisions easier to trust.
					</p>
				</div>

				<Card>
					<CardContent class="space-y-6 p-6">
						{#each steps as step, index}
							<div class="space-y-3">
								<div class="flex items-start gap-4">
									<div class="flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium">
										{index + 1}
									</div>
									<div class="space-y-1">
										<h3 class="text-base font-semibold">{step.title}</h3>
										<p class="text-sm leading-7 text-muted-foreground">{step.description}</p>
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

			<section id="cta">
				<Card>
					<CardHeader class="space-y-3">
						<Badge variant="secondary">Coming soon</Badge>
						<CardTitle class="max-w-3xl text-3xl tracking-tight sm:text-4xl">
							Give every branch a review-ready home before it becomes a release.
						</CardTitle>
						<CardDescription class="max-w-2xl text-base leading-7">
							Start with preview URLs and team review flows now. GitHub and GitLab integrations
							can stay placeholder for the first pass.
						</CardDescription>
					</CardHeader>
					<CardFooter class="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
						<Button size="lg">
							Start free
							<ArrowRight class="size-4" />
						</Button>
						<Button size="lg" variant="outline">View demo</Button>
					</CardFooter>
				</Card>
			</section>
		</main>
	</div>
</div>

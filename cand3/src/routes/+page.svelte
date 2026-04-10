<script lang="ts">
	const quickFacts = [
		{ value: '5', label: 'core moves', detail: 'Optimize, convert, resize, crop, and extend.' },
		{ value: '5', label: 'export formats', detail: 'JPEG, PNG, WebP, AVIF, and JPEG XL.' },
		{
			value: '1',
			label: 'safe promise',
			detail: 'Keeps the original when a smaller export is not possible.'
		}
	];

	const audiences = [
		{
			name: 'For shops',
			title: 'Make product images quicker to load and easier to upload.',
			copy: 'Prepare storefront photos, listings, and detail shots that stay sharp while asking less from every page and marketplace.'
		},
		{
			name: 'For photographers',
			title: 'Send lighter proof sets without flattening the work.',
			copy: 'Compare quality, choose the right format, and deliver files that still feel like your images instead of compressed leftovers.'
		},
		{
			name: 'For busy teams',
			title: 'Stop repeating the same export cleanup all week.',
			copy: 'Resize, crop, convert, and organize the handoff faster when a launch, campaign, or client deadline is already moving.'
		}
	];

	const features = [
		{
			label: 'Preview-first',
			title: 'See the tradeoff before you commit the file.',
			copy: 'Check the result, compare visual quality, and make the export decision with confidence instead of guesswork.'
		},
		{
			label: 'Format control',
			title: 'Pick the file type that fits where the image is going.',
			copy: 'Move between JPEG, PNG, WebP, AVIF, and JPEG XL for storefronts, portfolios, decks, or archives.'
		},
		{
			label: 'Framing tools',
			title: 'Resize, crop, or extend until the composition fits.',
			copy: 'Handle square listings, wide hero banners, social crops, and presentation layouts without reopening another editor.'
		},
		{
			label: 'Batch-ready',
			title: 'Process a whole set when one image turns into fifty.',
			copy: 'Keep folder-sized jobs moving when you need a consistent export pass instead of one-off manual cleanup.'
		}
	];

	const workflow = [
		{
			step: '01',
			title: 'Drop in an image',
			copy: 'Open a file from your desktop and start from the image you already have, not from a preset maze.'
		},
		{
			step: '02',
			title: 'Shape the export',
			copy: 'Optimize or convert, then resize, crop, or extend until the output actually fits the destination.'
		},
		{
			step: '03',
			title: 'Send the lighter version',
			copy: 'Export the result you want and keep the original untouched when the new file does not earn its place.'
		}
	];

	const formatPills = ['JPEG', 'PNG', 'WebP', 'AVIF', 'JPEG XL', 'Batch export', 'Preview compare'];
</script>

<svelte:head>
	<title>oimg | Make image files lighter without flattening them</title>
	<meta
		name="description"
		content="Preview-first image optimization for people who need smaller, cleaner, better-fitting files."
	/>
</svelte:head>

<div class="page-shell">
	<div class="ambient ambient-cyan"></div>
	<div class="ambient ambient-lime"></div>
	<div class="ambient ambient-amber"></div>

	<main class="mx-auto flex max-w-7xl flex-col gap-24 px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
		<section
			class="relative overflow-hidden rounded-[2.2rem] border border-[var(--line)] bg-[linear-gradient(145deg,rgba(247,241,230,0.08),rgba(247,241,230,0.02))] px-6 py-8 shadow-[0_24px_90px_rgba(0,0,0,0.42)] lg:px-10 lg:py-10"
		>
			<div class="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(247,241,230,0.5),transparent)]"></div>
			<div class="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
				<div class="reveal" style="--delay: 0.05s;">
					<div class="flex flex-wrap items-center gap-3">
						<span class="eyebrow-chip">Desktop image optimizer</span>
						<span class="hero-note">smaller files, intact mood</span>
					</div>

					<h1 class="font-display text-balance mt-6 max-w-3xl text-5xl leading-[0.95] text-[var(--paper)] sm:text-6xl lg:text-[5.5rem]">
						Make every image easier to send, load, and share.
					</h1>

					<p class="text-balance mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
						`oimg` helps real teams clean up exports before they go public: lighter file
						sizes, better-fitting crops, smarter format choices, and less last-minute
						compromise.
					</p>

					<div class="mt-8 flex flex-wrap gap-4">
						<a class="cta-primary" href="#workflow">See the flow</a>
						<a class="cta-secondary" href="#benefits">Why people switch</a>
					</div>

					<div class="mt-10 grid gap-4 sm:grid-cols-3">
						{#each quickFacts as fact, index}
							<article class="metric-card reveal" style={`--delay: ${0.15 + index * 0.08}s;`}>
								<p class="font-note text-2xl leading-none text-[var(--accent-cyan)]">{fact.value}</p>
								<p class="mt-3 text-xs uppercase tracking-[0.28em] text-[var(--paper-dim)]">
									{fact.label}
								</p>
								<p class="mt-3 text-sm leading-6 text-[var(--muted)]">{fact.detail}</p>
							</article>
						{/each}
					</div>
				</div>

				<div class="reveal lg:pl-4" style="--delay: 0.22s;">
					<div class="hero-board">
						<div class="flex flex-wrap items-center justify-between gap-3">
							<div>
								<p class="text-xs uppercase tracking-[0.35em] text-white/35">Preview board</p>
								<p class="font-note mt-2 text-2xl text-[var(--accent-cyan)]">
									compare the file before export
								</p>
							</div>
							<div class="rounded-full border border-white/12 px-3 py-1 text-xs uppercase tracking-[0.26em] text-white/50">
								OIMG
							</div>
						</div>

						<div class="mt-7 rounded-[1.8rem] border border-white/8 bg-[#050505] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
							<div class="flex items-center gap-5 text-white">
								<p class="hero-scribble text-[clamp(2.5rem,7vw,4.5rem)] text-white/86">18 MB</p>
								<p class="text-4xl text-white/35">→</p>
								<p class="hero-scribble text-[clamp(2.5rem,7vw,4.5rem)] text-[var(--accent-cyan)]">
									7 MB
								</p>
							</div>

							<div class="mt-6 flex flex-wrap gap-3">
								<div class="chalk-tag chalk-tag-lime">61% smaller</div>
								<div class="chalk-tag chalk-tag-amber">96% visual match</div>
							</div>

							<div class="mt-7 grid gap-4 sm:grid-cols-2">
								<div class="photo-card">
									<div class="photo-swatch photo-before"></div>
									<div class="mt-4 flex items-start justify-between gap-3">
										<div>
											<p class="text-[0.7rem] uppercase tracking-[0.28em] text-[var(--ink-soft)]">
												Original
											</p>
											<p class="mt-2 text-lg font-semibold text-[var(--ink)]">PNG master</p>
										</div>
										<p class="text-sm text-[var(--ink-soft)]">lossless</p>
									</div>
								</div>

								<div class="photo-card">
									<div class="photo-swatch photo-after"></div>
									<div class="mt-4 flex items-start justify-between gap-3">
										<div>
											<p class="text-[0.7rem] uppercase tracking-[0.28em] text-[var(--ink-soft)]">
												Export
											</p>
											<p class="mt-2 text-lg font-semibold text-[var(--ink)]">AVIF delivery</p>
										</div>
										<p class="text-sm text-[var(--ink-soft)]">quality 90</p>
									</div>
								</div>
							</div>

							<div class="mt-6 grid gap-3 text-sm text-white/66 sm:grid-cols-3">
								<div class="info-chip">
									<span>Preview-first</span>
									<span>Check the tradeoff first</span>
								</div>
								<div class="info-chip">
									<span>Format switch</span>
									<span>Export for the destination</span>
								</div>
								<div class="info-chip">
									<span>Safe write</span>
									<span>Keep the original when needed</span>
								</div>
							</div>
						</div>

						<div class="floating-label floating-label-left">
							<span class="font-note text-[var(--accent-lime)]">proof sets</span>
							<span>portfolio delivery</span>
						</div>

						<div class="floating-label floating-label-right">
							<span class="font-note text-[var(--accent-amber)]">storefronts</span>
							<span>faster product pages</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section id="benefits" class="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
			<div class="reveal" style="--delay: 0.05s;">
				<p class="section-kicker">Why it feels useful</p>
				<h2 class="font-display text-balance mt-5 max-w-lg text-4xl leading-tight text-[var(--paper)] sm:text-5xl">
					Built for the moment a file stops being a draft and starts being public.
				</h2>
				<p class="mt-6 max-w-md text-base leading-7 text-[var(--muted)]">
					That handoff moment is where image work usually gets messy. `oimg` narrows it down to
					the choices that matter so the final export feels deliberate instead of hurried.
				</p>
			</div>

			<div class="grid gap-5 md:grid-cols-3">
				{#each audiences as audience, index}
					<article class="audience-card reveal" style={`--delay: ${0.12 + index * 0.08}s;`}>
						<p class="text-xs uppercase tracking-[0.28em] text-[var(--paper-dim)]">{audience.name}</p>
						<h3 class="mt-5 text-2xl leading-tight text-[var(--paper)]">{audience.title}</h3>
						<p class="mt-4 text-sm leading-7 text-[var(--muted)]">{audience.copy}</p>
					</article>
				{/each}
			</div>
		</section>

		<section id="workflow" class="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
			<div class="reveal" style="--delay: 0.05s;">
				<p class="section-kicker">A simple flow</p>
				<h2 class="font-display text-balance mt-5 max-w-xl text-4xl leading-tight text-[var(--paper)] sm:text-5xl">
					One calm workspace for all the last-mile image decisions.
				</h2>
				<p class="mt-6 max-w-md text-base leading-7 text-[var(--muted)]">
					Use it when the image already exists and now needs to load faster, fit better, or land
					in a cleaner format before you hand it off.
				</p>

				<div class="mt-8 flex flex-wrap gap-3">
					{#each formatPills as pill}
						<span class="format-pill">{pill}</span>
					{/each}
				</div>
			</div>

			<div class="grid gap-5 md:grid-cols-3">
				{#each workflow as item, index}
					<article class="workflow-card reveal" style={`--delay: ${0.12 + index * 0.08}s;`}>
						<p class="font-note text-3xl leading-none text-[var(--accent-cyan)]">{item.step}</p>
						<h3 class="mt-6 text-2xl leading-tight text-[var(--paper)]">{item.title}</h3>
						<p class="mt-4 text-sm leading-7 text-[var(--muted)]">{item.copy}</p>
					</article>
				{/each}
			</div>
		</section>

		<section class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
			{#each features as feature, index}
				<article class="feature-card reveal" style={`--delay: ${0.08 + index * 0.07}s;`}>
					<p class="text-xs uppercase tracking-[0.28em] text-[var(--paper-dim)]">{feature.label}</p>
					<h3 class="mt-5 text-2xl leading-tight text-[var(--paper)]">{feature.title}</h3>
					<p class="mt-4 text-sm leading-7 text-[var(--muted)]">{feature.copy}</p>
				</article>
			{/each}
		</section>

		<section
			class="reveal relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(140deg,rgba(247,241,230,0.1),rgba(247,241,230,0.03))] px-6 py-8 shadow-[0_18px_70px_rgba(0,0,0,0.35)]"
			style="--delay: 0.16s;"
		>
			<div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
				<div>
					<p class="section-kicker">Before the next upload</p>
					<h2 class="font-display text-balance mt-5 max-w-3xl text-4xl leading-tight text-[var(--paper)] sm:text-5xl">
						Give every image a final pass that feels considered, not compressed.
					</h2>
					<p class="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)]">
						From storefront galleries to portfolio proofs, `oimg` helps you ship lighter files
						with better fit, better control, and far less repetitive cleanup.
					</p>
				</div>

				<div class="flex flex-wrap gap-4 lg:justify-end">
					<a class="cta-primary" href="#workflow">Start with the preview</a>
					<a class="cta-secondary" href="#benefits">See the benefits</a>
				</div>
			</div>
		</section>
	</main>
</div>

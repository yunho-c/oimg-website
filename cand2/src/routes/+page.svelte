<script lang="ts">
	const quickFacts = [
		{ value: '6', label: 'export formats', detail: 'JPEG, PNG, WebP, AVIF, JXL, and QOI' },
		{ value: '5', label: 'core actions', detail: 'Optimize, convert, resize, crop, and extend' },
		{ value: '1', label: 'smart safeguard', detail: 'Only write when the optimized result is actually smaller' }
	];

	const audiences = [
		{
			name: 'For stores',
			title: 'Make product photos load fast without looking flat',
			copy: 'Prepare storefront images, listing galleries, and detail shots that feel crisp on screen and easier to upload everywhere.'
		},
		{
			name: 'For photographers',
			title: 'Deliver lighter proof sets and portfolio exports',
			copy: 'Resize, crop, and convert whole folders while keeping enough fidelity for client review, galleries, and case studies.'
		},
		{
			name: 'For busy teams',
			title: 'Stop hand-fixing the same image problem all week',
			copy: 'Batch repetitive work, preview the outcome first, and keep originals untouched when a smaller export is not possible.'
		}
	];

	const features = [
		{
			label: 'Preview-first',
			title: 'See the result before you commit the file.',
			copy: 'Inspect and preview adjustments so the final export feels deliberate, not like a blind gamble with quality.'
		},
		{
			label: 'Batch workflow',
			title: 'Run whole folders instead of repeating the same click.',
			copy: 'Process multiple files in one pass for catalog prep, portfolio cleanup, or a fast end-of-day export routine.'
		},
		{
			label: 'Format control',
			title: 'Choose the right output for where the image is going.',
			copy: 'Move between JPEG, PNG, WebP, AVIF, JXL, and QOI when you need lighter web files, transparent assets, or cleaner archives.'
		},
		{
			label: 'Framing tools',
			title: 'Resize, crop, or extend until the composition actually fits.',
			copy: 'Prep marketplace squares, presentation slides, social crops, and widescreen layouts without rebuilding the image elsewhere.'
		}
	];

	const workflow = [
		{
			step: '01',
			title: 'Inspect',
			copy: 'Drop in a photo and understand the file before touching it: size, format, and what is worth changing.'
		},
		{
			step: '02',
			title: 'Shape',
			copy: 'Optimize, convert, resize, crop, or extend with a preview-oriented flow that stays focused on the finished image.'
		},
		{
			step: '03',
			title: 'Export',
			copy: 'Send out a lighter, more useful file and keep the original safe when the new version is not an improvement.'
		}
	];

	const formats = ['JPEG', 'PNG', 'WebP', 'AVIF', 'JXL', 'QOI'];
</script>

<svelte:head>
	<title>oimg | Beautifully lighter images, ready to share</title>
	<meta
		name="description"
		content="A preview-first image optimizer for converting, resizing, cropping, extending, and batch-processing photos without sacrificing trust in the final result."
	/>
</svelte:head>

<div class="page-shell">
	<header class="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
		<a class="flex items-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.34em] text-[var(--ink)]" href="#top">
			<span class="brand-mark" aria-hidden="true"></span>
			oimg
		</a>

		<nav class="hidden items-center gap-8 text-sm text-[var(--ink-muted)] md:flex">
			<a class="transition-colors duration-300 hover:text-[var(--ink)]" href="#benefits">Benefits</a>
			<a class="transition-colors duration-300 hover:text-[var(--ink)]" href="#workflow">Workflow</a>
			<a class="transition-colors duration-300 hover:text-[var(--ink)]" href="#formats">Formats</a>
		</nav>

		<a class="button-secondary" href="#download">See the app</a>
	</header>

	<main id="top" class="mx-auto flex w-full max-w-7xl flex-col gap-20 px-5 pb-16 sm:px-8 lg:gap-28 lg:px-10 lg:pb-24">
		<section class="grid gap-12 pb-6 pt-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:items-center">
			<div class="relative z-10">
				<p class="eyebrow fade-up" style="--delay: 0;">
					Desktop image finishing for photos, shops, portfolios, and fast-moving teams
				</p>

				<h1 class="display-title fade-up mt-5 max-w-4xl" style="--delay: 1;">
					Images that leave the room lighter, cleaner, and ready to send.
				</h1>

				<p class="fade-up mt-6 max-w-2xl text-lg leading-8 text-[var(--ink-muted)] sm:text-xl" style="--delay: 2;">
					oimg helps you shrink oversized files, convert stubborn formats, and prepare batches
					of images without guessing what quality you will lose. It is built for the last mile:
					the moment a picture needs to be uploaded, shared, approved, or delivered.
				</p>

				<div class="fade-up mt-8 flex flex-col gap-3 sm:flex-row" style="--delay: 3;">
					<a class="button-primary" href="#download">Explore the workflow</a>
					<a class="button-secondary" href="#benefits">Why it feels better</a>
				</div>

				<div class="fade-up mt-8 flex flex-wrap gap-3 text-sm text-[var(--ink)]" style="--delay: 4;">
					<span class="detail-pill">Preview before export</span>
					<span class="detail-pill">Batch-friendly processing</span>
					<span class="detail-pill">Writes only if smaller</span>
				</div>

				<div class="fade-up mt-10 grid gap-4 sm:grid-cols-3" style="--delay: 5;">
					{#each quickFacts as fact}
						<div class="stat-card">
							<div class="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--accent-strong)]">
								{fact.label}
							</div>
							<div class="mt-3 font-display text-5xl leading-none text-[var(--ink)]">
								{fact.value}
							</div>
							<p class="mt-3 text-sm leading-6 text-[var(--ink-muted)]">{fact.detail}</p>
						</div>
					{/each}
				</div>
			</div>

			<div class="relative min-h-[35rem] lg:min-h-[42rem]">
				<div class="hero-composition fade-up" style="--delay: 2;">
					<div class="hero-sheet hero-sheet-main">
						<div class="hero-photo hero-photo-a"></div>
						<div class="hero-panel-caption">
							<p class="font-mono text-[0.68rem] uppercase tracking-[0.34em] text-[var(--accent-strong)]">
								Preview
							</p>
							<div class="mt-3 flex items-end justify-between gap-4">
								<div>
									<p class="font-display text-3xl text-[var(--ink)]">Studio table, balanced</p>
									<p class="mt-2 text-sm text-[var(--ink-muted)]">
										Crop to 4:5, soften file weight, keep the texture intact.
									</p>
								</div>
								<div class="hidden rounded-full border border-white/50 bg-white/70 px-3 py-2 font-mono text-xs text-[var(--ink)] sm:block">
									AVIF / 82
								</div>
							</div>
						</div>
					</div>

					<div class="hero-sheet hero-sheet-secondary float-card">
						<div class="hero-photo hero-photo-b"></div>
						<div class="p-5">
							<p class="font-mono text-[0.66rem] uppercase tracking-[0.34em] text-[var(--accent-strong)]">
								After export
							</p>
							<p class="mt-2 text-xl font-semibold text-[var(--ink)]">Smaller file, same intention</p>
						</div>
					</div>

					<div class="hero-sheet hero-sheet-tertiary float-card-delayed">
						<div class="hero-photo hero-photo-c"></div>
						<div class="p-5">
							<p class="font-mono text-[0.66rem] uppercase tracking-[0.34em] text-[var(--accent-strong)]">
								Batch ready
							</p>
							<p class="mt-2 text-xl font-semibold text-[var(--ink)]">Prepare the whole set at once</p>
						</div>
					</div>

					<div class="floating-tag floating-tag-left">
						<span class="font-mono">inspect</span>
						<span>Know the file before you change it</span>
					</div>

					<div class="floating-tag floating-tag-right">
						<span class="font-mono">safe export</span>
						<span>Keeps the original when the new file is not smaller</span>
					</div>

					<div class="floating-tag floating-tag-bottom">
						<span class="font-mono">workflow</span>
						<span>Optimize · Convert · Resize · Crop · Extend</span>
					</div>
				</div>
			</div>
		</section>

		<section id="benefits" class="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
			<div class="section-intro">
				<p class="eyebrow">Why it feels different</p>
				<h2 class="section-title mt-4 max-w-lg">
					It is designed for the moment an image stops being a draft and starts being public.
				</h2>
				<p class="mt-5 max-w-md text-base leading-7 text-[var(--ink-muted)]">
					That means less time hunting for the right export settings, fewer upload failures, and
					more trust that what you send out is still your image.
				</p>
			</div>

			<div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
				{#each features as feature, index}
					<article class="feature-card fade-up" style={`--delay: ${index + 1};`}>
						<p class="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-[var(--accent-strong)]">
							{feature.label}
						</p>
						<h3 class="mt-5 text-2xl font-semibold leading-tight text-[var(--ink)]">
							{feature.title}
						</h3>
						<p class="mt-4 text-sm leading-7 text-[var(--ink-muted)]">{feature.copy}</p>
					</article>
				{/each}
			</div>
		</section>

		<section class="editorial-band">
			<div class="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
				<div class="space-y-6">
					<p class="eyebrow">Made for real image work</p>
					<h2 class="section-title max-w-2xl">
						From product pages to proof galleries, the same image usually has to become several
						different files.
					</h2>
					<p class="max-w-xl text-base leading-8 text-[var(--ink-muted)]">
						oimg keeps that routine calm. Choose lighter web formats, prep exact dimensions for a
						layout, or adjust framing for awkward aspect ratios without bouncing between apps.
					</p>
				</div>

				<div class="scenario-grid">
					{#each audiences as audience}
						<article class="scenario-card">
							<p class="font-mono text-[0.68rem] uppercase tracking-[0.34em] text-[var(--accent-strong)]">
								{audience.name}
							</p>
							<h3 class="mt-4 font-display text-3xl leading-tight text-[var(--ink)]">
								{audience.title}
							</h3>
							<p class="mt-4 text-sm leading-7 text-[var(--ink-muted)]">{audience.copy}</p>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section id="workflow" class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
			<div class="section-intro">
				<p class="eyebrow">A calmer workflow</p>
				<h2 class="section-title mt-4 max-w-lg">Three moves. Less friction. Better files.</h2>
			</div>

			<div class="space-y-4">
				{#each workflow as item}
					<article class="workflow-card">
						<div class="workflow-step">{item.step}</div>
						<div class="min-w-0 flex-1">
							<h3 class="text-2xl font-semibold text-[var(--ink)]">{item.title}</h3>
							<p class="mt-2 max-w-2xl text-sm leading-7 text-[var(--ink-muted)]">{item.copy}</p>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section id="formats" class="space-y-8">
			<div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<p class="eyebrow">Flexible output</p>
					<h2 class="section-title mt-4 max-w-2xl">
						Use the format that fits the destination instead of forcing every image through the
						same export.
					</h2>
				</div>

				<p class="max-w-xl text-sm leading-7 text-[var(--ink-muted)]">
					Keep transparent assets in PNG, move heavy pages toward AVIF or WebP, archive with
					intention, or choose emerging formats when they suit the job.
				</p>
			</div>

			<div class="format-marquee">
				<div class="format-track">
					{#each [...formats, ...formats] as format}
						<div class="format-chip">{format}</div>
					{/each}
				</div>
			</div>
		</section>

		<section id="download" class="cta-panel">
			<div class="max-w-3xl">
				<p class="eyebrow">Ready when your images are not</p>
				<h2 class="section-title mt-4 max-w-2xl">
					Make the final export feel as considered as the image itself.
				</h2>
				<p class="mt-5 max-w-2xl text-base leading-8 text-[color:rgba(37,21,16,0.76)]">
					Use oimg when the file is too heavy, the format is wrong, the crop does not fit, or the
					folder needs to move faster than you can hand-tune it. The goal is simple: better files,
					with less friction between finishing and sending.
				</p>
			</div>

			<div class="mt-8 flex flex-col gap-3 sm:flex-row">
				<a class="button-primary" href="#top">Back to top</a>
				<a class="button-secondary" href="#workflow">Review the workflow</a>
			</div>
		</section>
	</main>
</div>

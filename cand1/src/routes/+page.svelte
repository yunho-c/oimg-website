<script lang="ts">
	const assurances = ['Batch-friendly', 'Clean detail', 'Ready to send'];

	const proofPoints = [
		{
			eyebrow: 'For online shops',
			title: 'Product pages that stay polished',
			text: 'Keep fabrics, packaging, glass, and shadows looking intentional without dragging down the page.'
		},
		{
			eyebrow: 'For client work',
			title: 'Proofs that arrive faster',
			text: 'Send galleries, decks, and review sets that feel light to receive and still look premium on screen.'
		},
		{
			eyebrow: 'For busy folders',
			title: 'Less cleanup before the handoff',
			text: 'Drop in a full set, review the tradeoff, and move on without babysitting every file.'
		}
	];

	const steps = [
		{
			number: '01',
			title: 'Drop in a file or a whole folder',
			text: 'Start with the images you already have, whether that is a single hero shot or an entire campaign.'
		},
		{
			number: '02',
			title: 'Check the weight against the look',
			text: 'See the balance between file size and finish before you commit to the export.'
		},
		{
			number: '03',
			title: 'Ship lighter images with confidence',
			text: 'Send faster-loading images into stores, presentations, emails, and shared drives.'
		}
	];
</script>

<svelte:head>
	<title>OIMG | Beautifully lighter image files</title>
	<meta
		name="description"
		content="OIMG helps you make image files smaller without making them feel smaller."
	/>
</svelte:head>

<main class="page" id="top">
	<section class="hero shell">
		<header class="topbar reveal delay-1">
			<a class="brand" href="/">OIMG</a>
			<nav>
				<a href="#why">Why it feels better</a>
				<a href="#flow">How it works</a>
				<a href="#finish">Final touch</a>
			</nav>
		</header>

		<div class="hero-grid">
			<div class="hero-copy reveal delay-2">
				<p class="eyebrow">Image optimization for people who care how the final thing feels</p>
				<h1>
					Make every image
					<span>lighter</span>
					without making it look cheaper.
				</h1>
				<p class="lede">
					OIMG trims the dead weight from product photos, proofs, screenshots, and galleries so
					they move faster while still landing with polish.
				</p>

				<div class="actions">
					<a class="button button-primary" href="#flow">See the flow</a>
					<a class="button button-secondary" href="#why">Who it helps</a>
				</div>

				<p class="microcopy">
					Drop in a single image or an entire folder. Review the tradeoff. Send the lighter
					version forward.
				</p>

				<div class="assurance-row">
					{#each assurances as assurance}
						<span>{assurance}</span>
					{/each}
				</div>
			</div>

			<div class="artboard reveal delay-3" aria-hidden="true">
				<div class="art-main">
					<div class="art-caption">
						<span>Original</span>
						<span>Optimized</span>
					</div>

					<div class="art-weights">
						<div>
							<p>18.4 MB</p>
							<small>full-size catalog shot</small>
						</div>
						<div class="arrow">→</div>
						<div class="after">
							<p>5.6 MB</p>
							<small>cleaner to send and publish</small>
						</div>
					</div>

					<div class="art-divider"></div>

					<div class="art-grid">
						<div>
							<span>Look</span>
							<strong>Crisp texture</strong>
						</div>
						<div>
							<span>Feel</span>
							<strong>Smoother delivery</strong>
						</div>
						<div>
							<span>Flow</span>
							<strong>Folder-friendly</strong>
						</div>
					</div>
				</div>

				<div class="floating-note note-top">
					<p>Today’s send</p>
					<div class="note-lines">
						<span>Store launch images</span>
						<span>Proof deck attachments</span>
						<span>Gallery share folder</span>
					</div>
				</div>

				<div class="floating-note note-bottom">
					<p>What stays intact</p>
					<div class="contact-sheet">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
					<strong>Edges, contrast, and the feeling of finish.</strong>
				</div>
			</div>
		</div>
	</section>

	<section class="strip shell reveal delay-4">
		<div>
			<p>Before the upload</p>
			<strong>Less file anxiety</strong>
		</div>
		<div>
			<p>During review</p>
			<strong>A clearer tradeoff</strong>
		</div>
		<div>
			<p>After export</p>
			<strong>A handoff that feels finished</strong>
		</div>
	</section>

	<section class="story shell" id="why">
		<div class="section-heading reveal delay-1">
			<p class="eyebrow">Where it earns its place</p>
			<h2>Built for moments when the image quality matters and the wait still gets in the way.</h2>
		</div>

		<div class="proof-grid">
			{#each proofPoints as point, index}
				<article class="proof-card reveal" style={`animation-delay: ${index * 120 + 180}ms`}>
					<p>{point.eyebrow}</p>
					<h3>{point.title}</h3>
					<span>{point.text}</span>
				</article>
			{/each}
		</div>
	</section>

	<section class="workflow shell" id="flow">
		<div class="workflow-intro reveal delay-2">
			<p class="eyebrow">How it feels</p>
			<h2>The shortest path between a heavy folder and a polished handoff.</h2>
			<p>
				No scavenger hunt through settings. No guessing whether the export still feels premium.
				Just a faster route to images that behave better wherever they go next.
			</p>
		</div>

		<div class="steps">
			{#each steps as step, index}
				<article class="step reveal" style={`animation-delay: ${index * 140 + 220}ms`}>
					<div class="step-number">{step.number}</div>
					<h3>{step.title}</h3>
					<p>{step.text}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="closing shell" id="finish">
		<div class="closing-panel reveal delay-3">
			<p class="eyebrow">When the picture carries the message, the file should not slow it down.</p>
			<h2>Make the delivery feel as considered as the image itself.</h2>
			<div class="actions">
				<a class="button button-primary" href="#top">Back to top</a>
				<a class="button button-secondary" href="#why">See the use cases again</a>
			</div>
		</div>
	</section>
</main>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		margin: 0;
		background:
			radial-gradient(circle at top left, rgba(219, 116, 81, 0.16), transparent 28%),
			radial-gradient(circle at 80% 18%, rgba(52, 138, 121, 0.18), transparent 24%),
			linear-gradient(180deg, #f6efe4 0%, #efe4d3 44%, #f7f2ea 100%);
		color: #1a1714;
		font-family:
			'Avenir Next',
			'Segoe UI',
			sans-serif;
	}

	.page {
		position: relative;
		overflow: clip;
	}

	.page::before {
		content: '';
		position: fixed;
		inset: 0;
		pointer-events: none;
		background-image:
			linear-gradient(rgba(17, 17, 17, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(17, 17, 17, 0.03) 1px, transparent 1px);
		background-size: 36px 36px;
		mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.45), transparent 85%);
	}

	.page::after {
		content: '';
		position: fixed;
		inset: 0;
		pointer-events: none;
		opacity: 0.08;
		background-image:
			radial-gradient(circle at 20% 20%, #000 0.6px, transparent 0.8px),
			radial-gradient(circle at 80% 60%, #000 0.5px, transparent 0.7px);
		background-size: 18px 18px, 24px 24px;
	}

	.shell {
		width: min(1160px, calc(100vw - 2rem));
		margin: 0 auto;
	}

	.hero {
		padding: 1rem 0 3rem;
		min-height: 100svh;
		display: grid;
		align-content: center;
	}

	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 0 2rem;
	}

	.brand {
		color: #1a1714;
		text-decoration: none;
		font-family:
			'Iowan Old Style',
			'Palatino Linotype',
			'Book Antiqua',
			serif;
		font-size: 1.2rem;
		font-weight: 700;
		letter-spacing: 0.2em;
	}

	nav {
		display: flex;
		gap: 1.25rem;
	}

	nav a {
		color: rgba(26, 23, 20, 0.72);
		text-decoration: none;
		font-size: 0.92rem;
	}

	.hero-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(420px, 0.95fr);
		gap: 2rem;
		align-items: center;
	}

	.hero-copy,
	.story,
	.workflow,
	.closing {
		position: relative;
		z-index: 1;
	}

	.eyebrow {
		margin: 0 0 1rem;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 0.78rem;
		color: rgba(26, 23, 20, 0.55);
	}

	h1,
	h2,
	h3,
	strong,
	.brand {
		font-family:
			'Iowan Old Style',
			'Palatino Linotype',
			'Book Antiqua',
			serif;
	}

	h1 {
		margin: 0;
		max-width: 11ch;
		font-size: clamp(3.7rem, 8vw, 6.9rem);
		line-height: 0.93;
		letter-spacing: -0.05em;
	}

	h1 span {
		font-style: italic;
		color: #cf6545;
	}

	.lede {
		max-width: 34rem;
		margin: 1.5rem 0 0;
		font-size: 1.1rem;
		line-height: 1.7;
		color: rgba(26, 23, 20, 0.8);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem;
		margin-top: 2rem;
	}

	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.95rem 1.35rem;
		border-radius: 999px;
		text-decoration: none;
		font-size: 0.96rem;
		transition:
			transform 180ms ease,
			box-shadow 180ms ease,
			background-color 180ms ease,
			color 180ms ease;
	}

	.button:hover {
		transform: translateY(-2px);
	}

	.button-primary {
		background: #171411;
		color: #f8f2e8;
		box-shadow: 0 18px 30px rgba(23, 20, 17, 0.18);
	}

	.button-secondary {
		color: #171411;
		background: rgba(255, 252, 247, 0.52);
		border: 1px solid rgba(23, 20, 17, 0.12);
		backdrop-filter: blur(10px);
	}

	.microcopy {
		margin: 1rem 0 0;
		font-size: 0.95rem;
		line-height: 1.6;
		color: rgba(26, 23, 20, 0.62);
	}

	.assurance-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}

	.assurance-row span,
	.strip strong,
	.step-number {
		font-variant-numeric: lining-nums;
	}

	.assurance-row span {
		padding: 0.65rem 0.95rem;
		border-radius: 999px;
		background: rgba(255, 250, 243, 0.68);
		border: 1px solid rgba(23, 20, 17, 0.1);
		font-size: 0.88rem;
		color: rgba(26, 23, 20, 0.8);
	}

	.artboard {
		position: relative;
		height: 41rem;
	}

	.art-main,
	.floating-note,
	.strip,
	.proof-card,
	.step,
	.closing-panel {
		background:
			linear-gradient(180deg, rgba(255, 251, 246, 0.92), rgba(249, 239, 224, 0.86)),
			#fff;
		border: 1px solid rgba(23, 20, 17, 0.1);
		box-shadow:
			0 22px 60px rgba(99, 60, 36, 0.14),
			inset 0 1px 0 rgba(255, 255, 255, 0.65);
		backdrop-filter: blur(12px);
	}

	.art-main {
		position: absolute;
		inset: 3rem 0 3rem 2.25rem;
		padding: 2rem;
		border-radius: 2rem;
		background:
			radial-gradient(circle at 0% 0%, rgba(56, 141, 125, 0.13), transparent 32%),
			radial-gradient(circle at 100% 0%, rgba(215, 107, 69, 0.15), transparent 28%),
			linear-gradient(180deg, rgba(255, 251, 246, 0.98), rgba(243, 230, 211, 0.94));
	}

	.art-caption,
	.art-grid,
	.note-lines {
		display: grid;
		gap: 0.9rem;
	}

	.art-caption {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		font-size: 0.74rem;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		color: rgba(26, 23, 20, 0.56);
	}

	.art-weights {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: 1rem;
		align-items: end;
		margin-top: 1.6rem;
	}

	.art-weights p {
		margin: 0;
		font-family:
			'Iowan Old Style',
			'Palatino Linotype',
			'Book Antiqua',
			serif;
		font-size: clamp(2.4rem, 4.1vw, 4rem);
		line-height: 0.95;
	}

	.art-weights small {
		display: block;
		margin-top: 0.55rem;
		font-size: 0.85rem;
		color: rgba(26, 23, 20, 0.62);
	}

	.after p {
		color: #2f8a78;
	}

	.arrow {
		font-size: 2rem;
		line-height: 1;
		color: #cf6545;
		transform: translateY(-0.5rem);
	}

	.art-divider {
		height: 1px;
		margin: 1.6rem 0;
		background: linear-gradient(90deg, rgba(26, 23, 20, 0.12), rgba(26, 23, 20, 0.02));
	}

	.art-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.art-grid span,
	.floating-note p,
	.proof-card p {
		display: block;
		margin: 0 0 0.7rem;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		color: rgba(26, 23, 20, 0.56);
	}

	.art-grid strong {
		font-size: 1.2rem;
		line-height: 1.1;
		font-weight: 600;
	}

	.floating-note {
		position: absolute;
		width: min(15rem, 44%);
		padding: 1.2rem;
		border-radius: 1.4rem;
	}

	.note-top {
		top: 0;
		right: 0.4rem;
		transform: rotate(5deg);
		animation: drift 8.2s ease-in-out infinite;
	}

	.note-bottom {
		left: 0;
		bottom: 0;
		transform: rotate(-6deg);
		animation: drift 9.6s ease-in-out infinite reverse;
	}

	.note-lines span {
		display: block;
		padding: 0.55rem 0;
		border-bottom: 1px solid rgba(26, 23, 20, 0.09);
		font-size: 0.9rem;
	}

	.note-lines span:last-child {
		border-bottom: 0;
	}

	.contact-sheet {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.contact-sheet span {
		aspect-ratio: 1;
		border-radius: 1rem;
		background:
			linear-gradient(145deg, rgba(215, 107, 69, 0.22), rgba(47, 138, 120, 0.14)),
			linear-gradient(180deg, #f6ecdf, #f2dcc1);
		border: 1px solid rgba(26, 23, 20, 0.08);
	}

	.note-bottom strong {
		display: block;
		font-size: 1.05rem;
		line-height: 1.4;
		font-weight: 600;
	}

	.strip {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
		padding: 1.25rem 1.4rem;
		border-radius: 1.7rem;
		margin-bottom: 5rem;
	}

	.strip p {
		margin: 0 0 0.45rem;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: rgba(26, 23, 20, 0.54);
	}

	.strip strong {
		font-size: 1.15rem;
		font-weight: 600;
	}

	.story {
		padding-bottom: 5rem;
	}

	.section-heading {
		max-width: 50rem;
		margin-bottom: 2rem;
	}

	h2 {
		margin: 0;
		font-size: clamp(2.2rem, 4vw, 4rem);
		line-height: 1;
		letter-spacing: -0.04em;
	}

	.workflow-intro p:last-child {
		max-width: 38rem;
		margin-top: 1rem;
		font-size: 1rem;
		line-height: 1.7;
		color: rgba(26, 23, 20, 0.74);
	}

	.proof-grid,
	.steps {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.proof-card,
	.step,
	.closing-panel {
		border-radius: 1.7rem;
		padding: 1.5rem;
	}

	.proof-card h3,
	.step h3 {
		margin: 0;
		font-size: 1.8rem;
		line-height: 1.04;
		letter-spacing: -0.03em;
	}

	.proof-card span,
	.step p {
		display: block;
		margin-top: 1rem;
		font-size: 0.98rem;
		line-height: 1.7;
		color: rgba(26, 23, 20, 0.72);
	}

	.workflow {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
		gap: 1rem;
		padding-bottom: 5rem;
		align-items: start;
	}

	.steps {
		grid-template-columns: 1fr;
	}

	.step {
		position: relative;
		padding-top: 3.9rem;
	}

	.step-number {
		position: absolute;
		top: 1.3rem;
		left: 1.4rem;
		color: #cf6545;
		font-size: 0.9rem;
		letter-spacing: 0.18em;
	}

	.closing {
		padding-bottom: 4rem;
	}

	.closing-panel {
		position: relative;
		overflow: hidden;
		padding: 2.2rem;
	}

	.closing-panel::after {
		content: '';
		position: absolute;
		right: -3rem;
		bottom: -4rem;
		width: 15rem;
		height: 15rem;
		border-radius: 999px;
		background: radial-gradient(circle, rgba(47, 138, 120, 0.18), transparent 68%);
	}

	.closing-panel h2 {
		max-width: 14ch;
	}

	.reveal {
		opacity: 0;
		transform: translateY(22px);
		animation: rise 720ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
	}

	.delay-1 {
		animation-delay: 80ms;
	}

	.delay-2 {
		animation-delay: 180ms;
	}

	.delay-3 {
		animation-delay: 300ms;
	}

	.delay-4 {
		animation-delay: 420ms;
	}

	@keyframes rise {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes drift {
		0%,
		100% {
			transform: translateY(0) rotate(5deg);
		}

		50% {
			transform: translateY(-10px) rotate(3deg);
		}
	}

	.note-bottom {
		animation-name: drift-bottom;
	}

	@keyframes drift-bottom {
		0%,
		100% {
			transform: translateY(0) rotate(-6deg);
		}

		50% {
			transform: translateY(12px) rotate(-4deg);
		}
	}

	@media (max-width: 980px) {
		.hero {
			padding-top: 0.5rem;
		}

		.hero-grid,
		.workflow,
		.proof-grid,
		.strip {
			grid-template-columns: 1fr;
		}

		.artboard {
			height: 34rem;
			margin-top: 1rem;
		}

		.art-main {
			inset: 2rem 0.75rem 3.5rem;
		}

		.floating-note {
			width: min(14rem, 44%);
		}

		.workflow-intro {
			margin-bottom: 1rem;
		}
	}

	@media (max-width: 720px) {
		.shell {
			width: min(100vw - 1.25rem, 1160px);
		}

		nav {
			display: none;
		}

		h1 {
			max-width: 100%;
			font-size: clamp(3.1rem, 16vw, 4.8rem);
		}

		.artboard {
			height: auto;
			padding-top: 4rem;
			padding-bottom: 11rem;
		}

		.art-main {
			position: relative;
			inset: auto;
			padding: 1.35rem;
		}

		.art-caption,
		.art-grid {
			grid-template-columns: 1fr;
		}

		.art-weights {
			grid-template-columns: 1fr;
			gap: 0.35rem;
		}

		.arrow {
			transform: none;
		}

		.floating-note {
			width: calc(100% - 2rem);
		}

		.note-top {
			top: 0;
			right: 1rem;
		}

		.note-bottom {
			left: 1rem;
			bottom: 0;
		}

		.proof-card h3,
		.step h3 {
			font-size: 1.5rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(html) {
			scroll-behavior: auto;
		}

		.reveal,
		.note-top,
		.note-bottom,
		.button {
			animation: none;
			transition: none;
			transform: none;
			opacity: 1;
		}
	}
</style>

<script lang="ts">
	import { onMount, tick } from "svelte";
	import { cubicOut } from "svelte/easing";
	import { fade, scale } from "svelte/transition";
	import { X } from "@lucide/svelte";

	type InteractiveImageProps = {
		src: string;
		alt: string;
		triggerLabel: string;
		theaterLabel: string;
		relativeSize?: number;
		triggerClass?: string;
		frameClass?: string;
		inlineImageClass?: string;
		theaterHostClass?: string;
		theaterImageClass?: string;
		imageLoading?: "eager" | "lazy";
	};

	let {
		src,
		alt,
		triggerLabel,
		theaterLabel,
		relativeSize = 1,
		triggerClass = "mx-auto outline-none",
		frameClass = "",
		inlineImageClass = "block h-auto w-full max-w-full",
		theaterHostClass = "overflow-hidden rounded-2xl bg-background shadow-2xl ring-1 ring-white/10",
		theaterImageClass = "block h-auto max-h-[90vh] w-auto max-w-[90vw]",
		imageLoading = "lazy"
	}: InteractiveImageProps = $props();

	let isTheaterModeOpen = $state(false);
	let overlayTarget = $state<HTMLElement | null>(null);
	let triggerElement = $state<HTMLDivElement | null>(null);
	let theaterDialog = $state<HTMLDivElement | null>(null);
	let theaterCloseButton = $state<HTMLButtonElement | null>(null);

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

	async function openTheaterMode() {
		if (isTheaterModeOpen) return;

		isTheaterModeOpen = true;
		await tick();
		theaterCloseButton?.focus();
	}

	async function closeTheaterMode() {
		if (!isTheaterModeOpen) return;

		isTheaterModeOpen = false;
		await tick();
		triggerElement?.focus();
	}

	function handleWindowKeydown(event: KeyboardEvent) {
		if (event.key === "Escape" && isTheaterModeOpen) {
			event.preventDefault();
			void closeTheaterMode();
		}
	}

	function handleTriggerKeydown(event: KeyboardEvent) {
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

	$effect(() => {
		if (!isTheaterModeOpen || typeof document === "undefined") return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	});

	onMount(() => {
		overlayTarget = document.body;
	});
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<div
	bind:this={triggerElement}
	class={triggerClass}
	role="button"
	tabindex="0"
	aria-haspopup="dialog"
	aria-expanded={isTheaterModeOpen}
	aria-label={triggerLabel}
	style:width={`${relativeSize * 100}%`}
	onclick={() => void openTheaterMode()}
	onkeydown={handleTriggerKeydown}
>
	<div class={frameClass}>
		<img class={inlineImageClass} {src} {alt} loading={imageLoading} />
	</div>
</div>

{#if isTheaterModeOpen}
	<div
		use:portal={overlayTarget}
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
				aria-label={theaterLabel}
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

				<div class={theaterHostClass}>
					<img class={theaterImageClass} {src} {alt} />
				</div>
			</div>
		</div>
	</div>
{/if}

<script lang="ts">
	import { tick } from "svelte";
	import { cubicOut } from "svelte/easing";
	import { fade, scale } from "svelte/transition";
	import { X } from "@lucide/svelte";
	import { Card } from "$lib/components/ui/card";

	type InteractiveVideoProps = {
		src: string;
		triggerLabel: string;
		theaterLabel: string;
		relativeSize?: number;
		cardClass?: string;
		inlineHostClass?: string;
		inlineVideoClass?: string;
		theaterHostClass?: string;
		theaterVideoClass?: string;
	};

	let {
		src,
		triggerLabel,
		theaterLabel,
		relativeSize = 1,
		cardClass = "transform-gpu gap-0 overflow-hidden py-0 shadow-[0_24px_70px_-24px_rgba(15,23,42,0.28),0_12px_28px_-18px_rgba(15,23,42,0.2)] transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-2xl focus-within:ring-2 focus-within:ring-primary/40",
		inlineHostClass = "w-full",
		inlineVideoClass = "block h-auto w-full bg-black",
		theaterHostClass = "flex max-h-[90vh] items-center justify-center overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10",
		theaterVideoClass = "block max-h-[90vh] w-auto max-w-full bg-black"
	}: InteractiveVideoProps = $props();

	let isTheaterModeOpen = $state(false);
	let inlineVideoHeight = $state(0);
	let inlineVideoHost = $state<HTMLDivElement | null>(null);
	let theaterVideoHost = $state<HTMLDivElement | null>(null);
	let theaterDialog = $state<HTMLDivElement | null>(null);
	let triggerElement = $state<HTMLDivElement | null>(null);
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

		inlineVideoHeight = inlineVideoHost?.getBoundingClientRect().height ?? 0;
		isTheaterModeOpen = true;

		await tick();
		theaterCloseButton?.focus();
	}

	async function closeTheaterMode() {
		if (!isTheaterModeOpen) return;

		isTheaterModeOpen = false;

		await tick();
		inlineVideoHeight = 0;
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
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<div
	bind:this={triggerElement}
	class="mx-auto outline-none"
	role="button"
	tabindex="0"
	aria-haspopup="dialog"
	aria-expanded={isTheaterModeOpen}
	aria-label={triggerLabel}
	style:width={`${relativeSize * 100}%`}
	onclick={() => void openTheaterMode()}
	onkeydown={handleTriggerKeydown}
>
	<Card class={cardClass}>
		<div
			bind:this={inlineVideoHost}
			class={inlineHostClass}
			style:min-height={isTheaterModeOpen && inlineVideoHeight > 0 ? `${inlineVideoHeight}px` : null}
		>
			<video
				use:portal={isTheaterModeOpen ? theaterVideoHost : inlineVideoHost}
				class={isTheaterModeOpen ? theaterVideoClass : inlineVideoClass}
				{src}
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

				<div bind:this={theaterVideoHost} class={theaterHostClass}></div>
			</div>
		</div>
	</div>
{/if}

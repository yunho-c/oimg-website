<script lang="ts" module>
	import type { HighlighterCore } from "@shikijs/core";

	let highlighterPromise: Promise<HighlighterCore> | null = null;

	function getBashHighlighter() {
		highlighterPromise ??= Promise.all([
			import("@shikijs/core"),
			import("@shikijs/engine-javascript"),
			import("@shikijs/langs/bash"),
			import("@shikijs/themes/catppuccin-mocha")
		]).then(([{ createHighlighterCore }, { createJavaScriptRegexEngine }, bash, catppuccinMocha]) =>
			createHighlighterCore({
				engine: createJavaScriptRegexEngine(),
				langs: [bash.default],
				themes: [catppuccinMocha.default]
			})
		);

		return highlighterPromise;
	}
</script>

<script lang="ts">
	import { onMount } from "svelte";

	type HighlightedCodeProps = {
		code: string;
		lang?: "bash";
		class?: string;
	};

	let { code, lang = "bash", class: className = "" }: HighlightedCodeProps = $props();
	let highlightedHtml = $state("");
	let requestId = 0;
	let mounted = false;

	async function highlight(currentCode: string, currentLang: string) {
		const currentRequestId = ++requestId;
		const highlighter = await getBashHighlighter();
		const html = highlighter.codeToHtml(currentCode, {
			lang: currentLang,
			theme: "catppuccin-mocha"
		});

		if (currentRequestId === requestId) {
			highlightedHtml = html;
		}
	}

	onMount(() => {
		mounted = true;
	});

	$effect(() => {
		if (!mounted) return;

		highlightedHtml = "";
		void highlight(code, lang);
	});
</script>

<div class={`highlighted-code ${className}`}>
	{#if highlightedHtml}
		{@html highlightedHtml}
	{:else}
		<pre><code>{code}</code></pre>
	{/if}
</div>

<style>
	.highlighted-code {
		min-width: 0;
	}

	.highlighted-code :global(.shiki),
	.highlighted-code pre {
		margin: 0;
		overflow: visible;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
		background: transparent !important;
		font: inherit;
		line-height: inherit;
	}

	.highlighted-code :global(.shiki code),
	.highlighted-code code {
		display: block;
		font: inherit;
		line-height: inherit;
	}
</style>

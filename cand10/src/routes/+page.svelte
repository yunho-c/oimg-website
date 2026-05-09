<script lang="ts">
	import { onMount, tick } from "svelte";
	import { cubicInOut, cubicOut } from "svelte/easing";
	import { fade, fly, scale } from "svelte/transition";
	import {
		ArrowLeftRight,
		Check,
		Copy,
		Download,
		ExternalLink,
		FolderOpen,
		Layers3,
		Lock,
		Scaling,
		ScanSearch,
		ShieldCheck,
		TrendingUp
	} from "@lucide/svelte";
	import Autoplay from "embla-carousel-autoplay";
	import NumberFlow, { NumberFlowGroup } from "@number-flow/svelte";
	import { AppleLogoIcon, LinuxLogoIcon, WindowsLogoIcon } from "phosphor-svelte";
	import { BarChart } from "layerchart";
	import { scaleBand } from "d3-scale";
	import InteractiveImage from "$lib/components/interactive-image.svelte";
	import InteractiveVideo from "$lib/components/interactive-video.svelte";
	import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "$lib/components/ui/accordion";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import * as Chart from "$lib/components/ui/chart";
	import * as Carousel from "$lib/components/ui/carousel";
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";
	import { Slider } from "$lib/components/ui/slider";
	import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs";
	import {
		getCloudflareImageUrl,
		getOptimizedQualityImageUrl,
		getOptimizedQualityFileSize,
		getOriginalQualityFileSize,
		getQualityMetrics,
		getTransformedOptimizedQualityImageUrl,
		qualityMetricLabels,
		type QualityImageId,
		type QualityMetricKey
	} from "$lib/data/quality-metrics";
	import type { CarouselAPI } from "$lib/components/ui/carousel";

	type DownloadPlatform = "macos" | "windows" | "linux";
	type DownloadArch = "x64" | "arm64";

	type DownloadTarget = {
		label: string;
		downloadHref: string;
		command: string;
	};

	type PlatformDownloadConfig = {
		label: string;
		arches: Partial<Record<DownloadArch, DownloadTarget>>;
	};

	type PageMedia = {
		src: string;
		relativeSize: number;
	};

	type PageImageMedia = PageMedia & {
		alt: string;
	};

	type NavigateTradeoffImage = {
		id: QualityImageId;
		title: string;
		src: string;
		alt: string;
	};

	type CommandToken = {
		text: string;
		kind: "binary" | "verb" | "flag" | "package" | "utility";
	};

	type FileSizeDisplay = {
		value: number;
		unit: string;
	};

	type NavigatorWithUAData = Navigator & {
		userAgentData?: {
			platform?: string;
			architecture?: string;
			getHighEntropyValues?: (
				keys: string[]
			) => Promise<{ architecture?: string; platform?: string }>;
		};
	};

	const oimgRepoHref = "https://github.com/yunho-c/oimg";
	const siteBaseUrl = "https://oimg.org";
	const mediaBaseUrl = "https://media.oimg.org";
	const analyzeDemoVideoPath = "videos/analyze_demo.mp4";
	const downloadPlatformOrder: DownloadPlatform[] = ["macos", "windows", "linux"];
	const downloadBaseUrl = "https://oimg.org/download";
	const platformIcons = {
		macos: AppleLogoIcon,
		windows: WindowsLogoIcon,
		linux: LinuxLogoIcon
	} as const;
	const platformIconColors: Record<DownloadPlatform, string> = {
		macos: "currentColor",
		windows: "#0078D4",
		linux: "#EAB308"
	};

	function getMediaUrl(path: string) {
		return `${mediaBaseUrl}/${path}`;
	}

	const downloadCatalog: Record<DownloadPlatform, PlatformDownloadConfig> = {
			macos: {
				label: "macOS",
				arches: {
						arm64: {
							label: "Apple Silicon",
							downloadHref: `${downloadBaseUrl}/macos-arm64`,
							command: "brew install --cask yunho-c/tap/oimg"
						},
						x64: {
							label: "Intel",
							downloadHref: `${downloadBaseUrl}/macos-x64`,
							command: "brew install --cask yunho-c/tap/oimg"
						}
				}
			},
			windows: {
				label: "Windows",
					arches: {
						x64: {
							label: "x64",
							downloadHref: `${downloadBaseUrl}/windows-x64`,
							command: "winget install YunhoCho.OIMG"
						}
					}
			},
			linux: {
				label: "Linux",
					arches: {
						x64: {
							label: "x64",
							downloadHref: `${downloadBaseUrl}/linux-x64`,
							command: "sudo apt install oimg"
						}
				}
			}
	};

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
				alt: "The OIMG app window receiving an image via drag and drop.",
				relativeSize: 1,
				enableShadow: false
			},
			{
				title: "Open from where you already work",
				description: "Pull images in from the file explorer without breaking the flow of the task.",
				src: "/open_explorer_macos.webp",
				alt: "The macOS Finder open-with menu showing OIMG as an available app.",
				relativeSize: 0.82,
				enableShadow: true
			},
			{
				title: "Launch from the command line",
				description: "Open OIMG from the terminal when the workflow starts in scripts, shells, or quick handoffs.",
				src: "/open_cli_macos.webp",
				alt: "A macOS terminal invoking OIMG from the command line with an image path.",
				relativeSize: 0.82,
				enableShadow: true
			}
		];

		const navigateTradeoffImages: NavigateTradeoffImage[] = [
			{
				id: "fuji",
				title: "Fuji at distance",
				src: "/example_images/fuji.jpg",
				alt: "Mount Fuji photographed at a distance under a pale sky."
			},
			{
				id: "cloudy-yokohama",
				title: "Cloudy Yokohama",
				src: "/example_images/cloudy-yokohama.jpg",
				alt: "Cloudy city scene in Yokohama with buildings and street detail."
			},
			{
				id: "sunny-room",
				title: "Sunny room",
				src: "/example_images/sunny-room.jpg",
				alt: "Sunlit interior room with bright highlights and shadows."
			},
			{
				id: "bracken",
				title: "Bracken",
				src: "/example_images/bracken.jpg",
				alt: "Close-up image of green bracken leaves."
			},
			{
				id: "ducks",
				title: "Ducks",
				src: "/example_images/ducks.jpg",
				alt: "Two ducks on water with natural reflections."
			},
			{
				id: "dark-bulb",
				title: "Dark bulb",
				src: "/example_images/dark-bulb.jpg",
				alt: "Dark moody photograph centered on a lit bulb."
			}
		];
	const qualityMetricOrder: QualityMetricKey[] = ["pmp", "msSsim", "ssimu2"];
	const inlinePreviewImageWidth = 1200;
	const theaterPreviewImageWidth = 2400;
	const thumbnailImageWidth = 320;
	const metricNumberFormat = {
		maximumFractionDigits: 1
	} satisfies Intl.NumberFormatOptions;
	const fileSizeNumberFormat = {
		maximumFractionDigits: 1
	} satisfies Intl.NumberFormatOptions;
	const openEffortlesslyCarouselOptions = { duration: 32 };
	const openEffortlesslyAutoplay = Autoplay({ delay: 5000 });

	const featureSectionColumns = "lg:grid-cols-[1.00fr_1.00fr]";
	const currentYear = new Date().getFullYear();

	const storageSavingsData = [
		{ codec: "PNG optimized", savings: 5.97 },
		{ codec: "JPEG q90", savings: 86.27 },
		{ codec: "WebP q90", savings: 86.42 },
		{ codec: "AVIF q90", savings: 85.7 },
		{ codec: "JPEG XL q90", savings: 87.12 },
		{ codec: "JPEG XL lossless", savings: 35.02 }
	];

	const storageSavingsChartConfig = {
		savings: { label: "Storage saved", color: "rgb(68 125 247)" },
		label: { color: "var(--background)" }
	} satisfies Chart.ChartConfig;

	function formatStorageSavingsPercent(value: unknown) {
		const numericValue = Number(value);

		if (!Number.isFinite(numericValue)) return "";

		return `${numericValue.toFixed(1)}%`;
	}

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

	const heroDemoVideo: PageMedia = {
		src: getMediaUrl(analyzeDemoVideoPath),
		relativeSize: 1
	};

	const navigateTradeoffsVideo: PageMedia = {
		src: getMediaUrl(analyzeDemoVideoPath),
		relativeSize: 1
	};

	const compatibilityImage: PageImageMedia = {
		src: "/save_as_jpg.png",
		alt: "OIMG save-as JPG compatibility workflow.",
		relativeSize: 0.7
	};

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

		let openEffortlesslyApi = $state<CarouselAPI | undefined>(undefined);
		let openEffortlesslyIndex = $state(0);
		let navigateTradeoffIndex = $state(0);
		let navigateTradeoffReveal = $state(50);
		let navigateTradeoffTargetReveal = $state(50);
		let isNavigateTradeoffRevealLatched = $state(false);
		let navigateTradeoffPointerId = $state<number | null>(null);
		let navigateTradeoffPointerStart = $state<{
			x: number;
			y: number;
			source: "inline" | "theater";
			wasLatched: boolean;
		} | null>(null);
		let navigateTradeoffFrame = $state<HTMLDivElement | null>(null);
		let navigateTradeoffTheaterFrame = $state<HTMLDivElement | null>(null);
		let navigateTradeoffSliderValue = $state(50);
		let isNavigateTradeoffTheaterOpen = $state(false);
		let navigateTradeoffTheaterDialog = $state<HTMLDivElement | null>(null);
		let selectedPlatform = $state<DownloadPlatform>("macos");
	let selectedArchitecture = $state<DownloadArch>("arm64");
	let detectedPlatform = $state<DownloadPlatform | null>(null);
	let detectedArchitecture = $state<DownloadArch | null>(null);
	let showAllDownloadOptions = $state(false);
	let showCliInstall = $state(false);
	let copyFeedback = $state<"idle" | "copied">("idle");

	function getAvailableArchitectures(platform: DownloadPlatform): DownloadArch[] {
		return Object.keys(downloadCatalog[platform].arches) as DownloadArch[];
	}

	function isArchitectureAvailable(platform: DownloadPlatform, architecture: DownloadArch): boolean {
		return architecture in downloadCatalog[platform].arches;
	}

	function getArchitectureLabel(platform: DownloadPlatform, architecture: DownloadArch): string {
		return downloadCatalog[platform].arches[architecture]?.label ?? architecture;
	}

	function getDownloadButtonLabel(platform: DownloadPlatform, architecture: DownloadArch): string {
		return `Download for ${downloadCatalog[platform].label} (${getArchitectureLabel(platform, architecture)})`;
	}

	function parseFileSizeDisplay(fileSize: string | null | undefined): FileSizeDisplay | null {
		const match = fileSize?.match(/^([\d.]+)\s+(.+)$/);
		if (!match) return null;

		return {
			value: Number(match[1]),
			unit: match[2]
		};
	}

	function selectPlatform(platform: DownloadPlatform) {
		selectedPlatform = platform;

		if (!isArchitectureAvailable(platform, selectedArchitecture)) {
			selectedArchitecture = getAvailableArchitectures(platform)[0];
		}
	}

	function detectPlatform(platformValue: string, userAgent: string): DownloadPlatform | null {
		const normalizedPlatform = platformValue.toLowerCase();
		const normalizedUserAgent = userAgent.toLowerCase();

		if (normalizedPlatform.includes("mac") || normalizedUserAgent.includes("mac os")) return "macos";
		if (normalizedPlatform.includes("win") || normalizedUserAgent.includes("windows")) return "windows";
		if (normalizedPlatform.includes("linux") || normalizedUserAgent.includes("linux")) return "linux";

		return null;
	}

	function detectArchitecture(value: string | undefined): DownloadArch | null {
		if (!value) return null;

		const normalizedValue = value.toLowerCase();

		if (
			normalizedValue.includes("arm64") ||
			normalizedValue.includes("aarch64") ||
			normalizedValue.includes("arm")
		) {
			return "arm64";
		}

		if (
			normalizedValue.includes("x86_64") ||
			normalizedValue.includes("x64") ||
			normalizedValue.includes("amd64") ||
			normalizedValue.includes("win64") ||
			normalizedValue.includes("wow64") ||
			normalizedValue.includes("x86")
		) {
			return "x64";
		}

		return null;
	}

	const selectedArchitectures = $derived(getAvailableArchitectures(selectedPlatform));
	const selectedPlatformConfig = $derived(downloadCatalog[selectedPlatform]);
	const effectiveArchitecture = $derived(
		selectedArchitectures.includes(selectedArchitecture)
			? selectedArchitecture
			: selectedArchitectures[0]
	);
	const selectedTarget = $derived(
		selectedPlatformConfig.arches[effectiveArchitecture] as DownloadTarget
	);
	const selectedQualityMetrics = $derived(
		getQualityMetrics(navigateTradeoffImages[navigateTradeoffIndex].id, navigateTradeoffSliderValue)
	);
	const selectedTradeoffImage = $derived(navigateTradeoffImages[navigateTradeoffIndex]);
	const selectedRawOptimizedPreviewSrc = $derived(
		getOptimizedQualityImageUrl(
			selectedTradeoffImage.id,
			navigateTradeoffSliderValue
		)
	);
	const selectedInlineOriginalPreviewSrc = $derived(
		getCloudflareImageUrl(selectedTradeoffImage.src, {
			width: inlinePreviewImageWidth,
			fit: "scale-down",
			sourceOrigin: siteBaseUrl
		})
	);
	const selectedTheaterOriginalPreviewSrc = $derived(
		getCloudflareImageUrl(selectedTradeoffImage.src, {
			width: theaterPreviewImageWidth,
			fit: "scale-down",
			sourceOrigin: siteBaseUrl
		})
	);
	const selectedInlineOptimizedPreviewSrc = $derived(
		getTransformedOptimizedQualityImageUrl(selectedTradeoffImage.id, navigateTradeoffSliderValue, {
			width: inlinePreviewImageWidth,
			fit: "scale-down"
		})
	);
	const selectedTheaterOptimizedPreviewSrc = $derived(
		getTransformedOptimizedQualityImageUrl(selectedTradeoffImage.id, navigateTradeoffSliderValue, {
			width: theaterPreviewImageWidth,
			fit: "scale-down"
		})
	);
	const selectedOriginalFileSize = $derived(
		getOriginalQualityFileSize(selectedTradeoffImage.id)
	);
	const selectedOptimizedFileSize = $derived(
		getOptimizedQualityFileSize(
			selectedTradeoffImage.id,
			navigateTradeoffSliderValue
		)
	);
	const selectedOriginalFileSizeDisplay = $derived(parseFileSizeDisplay(selectedOriginalFileSize));
	const selectedOptimizedFileSizeDisplay = $derived(parseFileSizeDisplay(selectedOptimizedFileSize));
	function getQualityMetricColor(value: number | null) {
		if (value === null) return undefined;
		if (value < 0) return "#440000";
		if (value < 30) return "#AA0000";
		if (value < 50) return "#DE602E";
		if (value < 70) return "#DBDE25";

		return undefined;
	}

	const remainControlStats = $derived(
		qualityMetricOrder.map((metric) => {
			const rawValue = selectedQualityMetrics[metric];
			const value = rawValue === null ? null : Math.round(rawValue * 1000) / 10;

			return {
				value,
				color: getQualityMetricColor(value),
				label: qualityMetricLabels[metric]
			};
		})
	);
	$effect(() => {
		if (!selectedArchitectures.includes(selectedArchitecture)) {
			selectedArchitecture = selectedArchitectures[0];
		}
	});

	function handlePreviewImageError(event: Event) {
		const image = event.currentTarget as HTMLImageElement | null;

		if (!image) return;

		const fallbackSrc = image.dataset.fallbackSrc ?? selectedTradeoffImage.src;
		if (image.dataset.usedFallbackFor === fallbackSrc) return;

		image.dataset.usedFallbackFor = fallbackSrc;
		image.src = fallbackSrc;
	}

	onMount(() => {
		let cancelled = false;

		const applyDetection = (platform: DownloadPlatform | null, architecture: DownloadArch | null) => {
			if (cancelled) return;

			if (platform) {
				detectedPlatform = platform;
				selectPlatform(platform);
			}

			if (platform && architecture && isArchitectureAvailable(platform, architecture)) {
				detectedArchitecture = architecture;
				selectedArchitecture = architecture;
				return;
			}

			detectedArchitecture = architecture;
		};

		const detectClientPlatform = async () => {
			const nav = navigator as NavigatorWithUAData;
			const userAgentPlatform = nav.userAgentData?.platform ?? nav.platform ?? "";
			const userAgent = nav.userAgent ?? "";
			let platform = detectPlatform(userAgentPlatform, userAgent);
			let architecture =
				detectArchitecture(nav.userAgentData?.architecture) ?? detectArchitecture(userAgent);

			if (nav.userAgentData?.getHighEntropyValues) {
				try {
					const highEntropy = await nav.userAgentData.getHighEntropyValues(["architecture", "platform"]);
					platform = detectPlatform(highEntropy.platform ?? userAgentPlatform, userAgent) ?? platform;
					architecture = detectArchitecture(highEntropy.architecture) ?? architecture;
				} catch {
					// Ignore and fall back to low-entropy detection.
				}
			}

			applyDetection(platform, architecture);
		};

		void detectClientPlatform();

		const clearTopHashOnScroll = () => {
			if (window.location.hash === "#top" && window.scrollY > 0) {
				window.history.replaceState(
					window.history.state,
					"",
					window.location.pathname + window.location.search
				);
			}
		};

		window.addEventListener("scroll", clearTopHashOnScroll, { passive: true });

		return () => {
			cancelled = true;
			window.removeEventListener("scroll", clearTopHashOnScroll);
		};
	});

	async function copySelectedCommand() {
		if (!navigator.clipboard) return;

		await navigator.clipboard.writeText(selectedTarget.command);
		copyFeedback = "copied";

		window.setTimeout(() => {
			copyFeedback = "idle";
		}, 1500);
	}

	function scrollToTop(event: MouseEvent) {
		event.preventDefault();
		window.scrollTo({ top: 0, behavior: "smooth" });

		if (window.location.hash === "#top") {
			window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
		}
	}

		function showNavigateTradeoffImage(index: number) {
			navigateTradeoffIndex = index;
			navigateTradeoffReveal = 50;
			navigateTradeoffTargetReveal = 50;
			isNavigateTradeoffRevealLatched = false;
		}

	function tokenizeCommand(command: string): CommandToken[] {
		const tokens = command.trim().split(/\s+/);
		const binaryIndex = tokens[0] === "sudo" ? 1 : 0;
		const verbIndex = binaryIndex + 1;

		return tokens.map((text, index) => {
			if (text === "sudo") {
				return { text, kind: "utility" };
			}

			if (index === binaryIndex) {
				return { text, kind: "binary" };
			}

			if (index === verbIndex) {
				return { text, kind: "verb" };
			}

			if (text.startsWith("-")) {
				return { text, kind: "flag" };
			}

			return { text, kind: "package" };
		});
	}

	function getCommandTokenClass(kind: CommandToken["kind"]) {
		if (kind === "binary") return "text-sky-200";
		if (kind === "verb") return "text-violet-200";
		if (kind === "flag") return "text-amber-200";
		if (kind === "utility") return "text-neutral-400";

		return "text-emerald-200";
	}

		function updateNavigateTradeoffReveal(clientX: number, source: "inline" | "theater" = "inline") {
			const frame = source === "theater" ? navigateTradeoffTheaterFrame : navigateTradeoffFrame;
			if (!frame) return;

			const rect = frame.getBoundingClientRect();
			const relativeX = clientX - rect.left;
			const ratio = Math.min(Math.max(relativeX / rect.width, 0), 1);

			navigateTradeoffTargetReveal = ratio * 100;
		}

		function handleNavigateTradeoffPointerDown(event: PointerEvent, source: "inline" | "theater" = "inline") {
			navigateTradeoffPointerId = event.pointerId;
			navigateTradeoffPointerStart = {
				x: event.clientX,
				y: event.clientY,
				source,
				wasLatched: isNavigateTradeoffRevealLatched
			};
			(source === "theater" ? navigateTradeoffTheaterFrame : navigateTradeoffFrame)?.setPointerCapture(
				event.pointerId
			);
			updateNavigateTradeoffReveal(event.clientX, source);
		}

		function handleNavigateTradeoffPointerMove(event: PointerEvent, source: "inline" | "theater" = "inline") {
			if (navigateTradeoffPointerId === event.pointerId) {
				updateNavigateTradeoffReveal(event.clientX, source);
				return;
			}

			if (event.pointerType !== "mouse" || isNavigateTradeoffRevealLatched) {
				return;
			}

			updateNavigateTradeoffReveal(event.clientX, source);
		}

		function releaseNavigateTradeoffPointer(event: PointerEvent) {
			if (navigateTradeoffPointerId !== event.pointerId) return;

			const pointerStart = navigateTradeoffPointerStart;
			const source = pointerStart?.source ?? "inline";
			(source === "theater" ? navigateTradeoffTheaterFrame : navigateTradeoffFrame)?.releasePointerCapture(
				event.pointerId
			);
			navigateTradeoffPointerId = null;
			navigateTradeoffPointerStart = null;

			if (event.type !== "pointerup" || !pointerStart) return;

			const movement = Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y);
			if (pointerStart.wasLatched) {
				isNavigateTradeoffRevealLatched = false;
				return;
			}

			isNavigateTradeoffRevealLatched = true;

			if (pointerStart.source !== "inline") return;

			if (movement <= 6) {
				void openNavigateTradeoffTheater();
			}
		}

		function handleNavigateTradeoffKeydown(event: KeyboardEvent) {
			if (event.key === "ArrowLeft") {
				event.preventDefault();
				navigateTradeoffTargetReveal = Math.max(navigateTradeoffTargetReveal - 5, 0);
			} else if (event.key === "ArrowRight") {
				event.preventDefault();
				navigateTradeoffTargetReveal = Math.min(navigateTradeoffTargetReveal + 5, 100);
			} else if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				void openNavigateTradeoffTheater();
			}
		}

		async function openNavigateTradeoffTheater() {
			if (isNavigateTradeoffTheaterOpen) return;

			isNavigateTradeoffTheaterOpen = true;
			await tick();
			navigateTradeoffTheaterFrame?.focus();
		}

		async function closeNavigateTradeoffTheater() {
			if (!isNavigateTradeoffTheaterOpen) return;

			isNavigateTradeoffTheaterOpen = false;
			await tick();
			navigateTradeoffFrame?.focus();
		}

		function handleNavigateTradeoffTheaterBackdropClick(event: MouseEvent) {
			const target = event.target;
			if (!(target instanceof Node)) return;

			if (!navigateTradeoffTheaterDialog?.contains(target)) {
				void closeNavigateTradeoffTheater();
			}
		}

		function handleWindowKeydown(event: KeyboardEvent) {
			if (event.key === "Escape" && isNavigateTradeoffTheaterOpen) {
				event.preventDefault();
				void closeNavigateTradeoffTheater();
			}
		}

		$effect(() => {
			let frameId = 0;

			const animate = () => {
				const delta = navigateTradeoffTargetReveal - navigateTradeoffReveal;

				if (Math.abs(delta) < 0.15) {
					navigateTradeoffReveal = navigateTradeoffTargetReveal;
					frameId = 0;
					return;
				}

				navigateTradeoffReveal += delta * 0.18;
				frameId = requestAnimationFrame(animate);
			};

			if (Math.abs(navigateTradeoffTargetReveal - navigateTradeoffReveal) >= 0.15) {
				frameId = requestAnimationFrame(animate);
			}

			return () => {
				if (frameId) {
					cancelAnimationFrame(frameId);
				}
			};
		});

		$effect(() => {
			if (!isNavigateTradeoffTheaterOpen || typeof document === "undefined") return;

			const previousOverflow = document.body.style.overflow;
			document.body.style.overflow = "hidden";

			return () => {
				document.body.style.overflow = previousOverflow;
			};
		});

	function showOpenEffortlesslySlide(index: number) {
		openEffortlesslyApi?.scrollTo(index);
		openEffortlesslyApi?.plugins().autoplay?.reset();
		openEffortlesslyIndex = index;
	}

	$effect(() => {
		const api = openEffortlesslyApi;

		if (!api) return;

		api.plugins().autoplay?.play();

		const syncCurrentSlide = () => {
			openEffortlesslyIndex = api.selectedScrollSnap();
		};

		syncCurrentSlide();
		api.on("select", syncCurrentSlide);
		api.on("reInit", syncCurrentSlide);

		return () => {
			api.plugins().autoplay?.stop();
			api.off("select", syncCurrentSlide);
			api.off("reInit", syncCurrentSlide);
		};
	});
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<svelte:head>
	<title>OIMG | A better way to compress images</title>
	<meta
		name="description"
		content="A stock shadcn-styled OIMG landing page framed as a cleaner operator board for lighter exports, format changes, and safer final-file decisions."
	/>
</svelte:head>

<div id="top" class="bg-background text-foreground">
	<div class="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-10">
		<header class="flex flex-col gap-4 border-b py-4 sm:flex-row sm:items-center sm:justify-between">
				<a href="/" class="flex items-center gap-3 transition-colors hover:text-foreground" onclick={scrollToTop}>
					<div class="group/logo flex size-9 items-center justify-center rounded-lg bg-card">
						<img src="/favicon.svg" alt="OIMG logo" class="size-9 group-hover/logo:animate-spin" />
					</div>
					<div>
					<p class="text-lg font-semibold">OIMG</p>
				</div>
			</a>

				<div class="flex flex-col gap-3 sm:mr-2 sm:flex-row sm:items-center">
				<nav class="flex items-center gap-5 text-sm text-muted-foreground">
					<a href="/" class="transition-colors hover:text-foreground" onclick={scrollToTop}>
						Download
					</a>
					<div class="group/web-version relative">
						<button
							type="button"
							class="cursor-not-allowed transition-colors opacity-60"
							aria-disabled="true"
						>
							Web version
						</button>
						<span
							class="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 rounded-lg border bg-background px-3 py-1.5 text-sm font-medium whitespace-nowrap text-foreground opacity-0 shadow-lg transition-opacity duration-150 group-hover/web-version:opacity-100 group-focus-within/web-version:opacity-100"
							role="tooltip"
						>
							Coming soon
						</span>
					</div>
					<a
						href="https://github.com/yunho-c/oimg"
						target="_blank"
						rel="noreferrer"
						class="transition-[color,text-shadow] duration-200 hover:text-[#6d4db3] hover:[text-shadow:0_0_18px_rgba(109,77,179,0.15)]"
					>
						GitHub
					</a>
				</nav>
			</div>
		</header>

		<main class="flex flex-col gap-16 py-10 sm:gap-20 sm:py-16">
				<section id="download" class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
					<div class="space-y-6">
						<!-- <Badge variant="secondary">Preview-first export workflow</Badge> -->
					<div class="space-y-4">
						<h1 class="max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
							Compress images without losing quality.
						</h1>
							<p class="max-w-2xl text-lg leading-8 text-muted-foreground">
								OIMG uses state-of-the-art image compression techniques to reduce file size with minimal quality drop.
                <!-- Save storage and network bandwidth while keeping your precious memories using OIMG! -->
							</p>
						</div>

							<div class="max-w-2xl space-y-5">
									<div class="flex flex-col gap-2.5 sm:flex-row sm:items-center">
										<Button
											size="lg"
											href={selectedTarget.downloadHref}
										class="sm:w-auto"
									>
											{getDownloadButtonLabel(selectedPlatform, effectiveArchitecture)}
											<Download class="size-4" />
										</Button>
										<span class="text-sm text-muted-foreground">or</span>
										<Button
											type="button"
											size="lg"
											variant="outline"
											class="sm:w-auto"
											aria-expanded={showCliInstall}
											onclick={() => (showCliInstall = !showCliInstall)}
										>
											Install via CLI
										</Button>
										<Button
											type="button"
											size="lg"
											variant="ghost"
											class="sm:w-auto"
											onclick={() => (showAllDownloadOptions = !showAllDownloadOptions)}
										>
											{showAllDownloadOptions ? "Hide options" : "More options"}
										</Button>
									</div>

									{#if showCliInstall}
										<div
											class="w-full rounded-xl border border-white/10 bg-neutral-950 p-4 text-white sm:w-4/5"
											in:fly={{ y: -8, duration: 180 }}
											out:fly={{ y: -6, duration: 150 }}
										>
											<div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
												<div class="space-y-2">
													<div class="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-sm leading-6">
														{#each tokenizeCommand(selectedTarget.command) as token}
															<span class={getCommandTokenClass(token.kind)}>
																{token.text}
															</span>
														{/each}
													</div>
												</div>
												<Button
													type="button"
													size="sm"
													variant="outline"
													class={`sm:shrink-0 transition-colors duration-200 ${
														copyFeedback === "copied"
															? "border-white bg-white text-neutral-950 hover:bg-white hover:text-neutral-950"
															: "border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
													}`}
													onclick={copySelectedCommand}
												>
												{#if copyFeedback === "copied"}
													Copied
													<Check class="size-4" />
												{:else}
													Copy
													<Copy class="size-4" />
												{/if}
											</Button>
											</div>
										</div>
									{/if}

									{#if showAllDownloadOptions}
										<div
											class="grid gap-4 sm:grid-cols-2"
											in:fly={{ y: -8, duration: 180 }}
											out:fly={{ y: -6, duration: 150 }}
										>
											<div class="space-y-2">
												<p class="text-sm font-medium">Platform</p>
												<div class="flex flex-wrap gap-2">
													{#each downloadPlatformOrder as platform}
														{@const PlatformIcon = platformIcons[platform]}
														<Button
															type="button"
															size="sm"
															variant={selectedPlatform === platform ? "default" : "outline"}
															onclick={() => selectPlatform(platform)}
														>
															<PlatformIcon
																class="size-4"
																color={platformIconColors[platform]}
																weight="fill"
															/>
															{downloadCatalog[platform].label}
														</Button>
													{/each}
												</div>
											</div>

											<div class="space-y-2">
												<p class="text-sm font-medium">Architecture</p>
												<div class="flex flex-wrap gap-2">
													{#each selectedArchitectures as architecture}
														<Button
															type="button"
															size="sm"
															variant={selectedArchitecture === architecture ? "default" : "outline"}
															onclick={() => (selectedArchitecture = architecture)}
														>
															{getArchitectureLabel(selectedPlatform, architecture)}
														</Button>
													{/each}
												</div>
											</div>
										</div>
									{/if}
						</div>
					</div>

				<InteractiveVideo
					src={heroDemoVideo.src}
					triggerLabel="Open product demo in theater mode"
					theaterLabel="Product demo theater mode"
					relativeSize={heroDemoVideo.relativeSize}
				/>
			</section>

			<section class={`grid gap-6 pt-12 sm:pt-16 ${featureSectionColumns} lg:items-center`}>
				<div class="space-y-4">
					<h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
						Save storage
					</h2>
					<p class="text-base leading-7 text-muted-foreground">
						Lighter exports compound quickly across libraries, campaigns, and handoff folders.
						OIMG keeps the image readable while reducing the space every finished file has to occupy.
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Average storage savings by codec</CardTitle>
						<CardDescription>CLIC 2024 image test set</CardDescription>
					</CardHeader>
					<CardContent>
						<Chart.Container config={storageSavingsChartConfig} class="min-h-[260px] w-full">
							<BarChart
								labels={{
									offset: 12,
									format: formatStorageSavingsPercent
								}}
								data={storageSavingsData}
								orientation="horizontal"
								yScale={scaleBand().padding(0.25)}
								y="codec"
								xDomain={[0, 100]}
								axis="y"
								rule={false}
								series={[
									{
										key: "savings",
										label: storageSavingsChartConfig.savings.label,
										color: storageSavingsChartConfig.savings.color
									}
								]}
								padding={{ right: 16 }}
								props={{
									bars: {
										stroke: "none",
										radius: 5,
										rounded: "all",
										motion: { type: "tween", duration: 500, easing: cubicInOut }
									},
									highlight: { area: { fill: "none" } },
									yAxis: {
										tickLabelProps: {
											textAnchor: "start",
											dx: 6,
											class: "stroke-none fill-background!"
										},
										tickLength: 0
									}
								}}
							>
								{#snippet tooltip()}
									<Chart.Tooltip hideLabel />
								{/snippet}
							</BarChart>
						</Chart.Container>
					</CardContent>
					<CardFooter>
						<div class="flex w-full items-start gap-2 text-sm">
							<div class="grid gap-2">
								<div class="flex items-center gap-2 leading-none font-medium">
									JPEG XL q90 saves 87.1% on average <TrendingUp class="size-4" />
								</div>
								<div class="flex items-center gap-2 leading-none text-muted-foreground">
									Calculated from the CSV average savings row
								</div>
							</div>
						</div>
					</CardFooter>
				</Card>
			</section>

			<section class={`grid gap-6 pt-12 sm:pt-16 ${featureSectionColumns} lg:items-center`}>
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
							open from file explorer
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
							run from the command line
						</button>.
					</p>
				</div>

					<div class="space-y-4">
						<Carousel.Root
							setApi={(api) => (openEffortlesslyApi = api)}
							opts={openEffortlesslyCarouselOptions}
							plugins={[openEffortlesslyAutoplay]}
							class="w-full"
						>
								<Carousel.Content class="-ms-0">
									{#each openEffortlesslySlides as slide, index}
										<Carousel.Item class="ps-0">
											<div
												class={`flex aspect-[16/10] items-center justify-center ${
													slide.enableShadow ? "px-6 py-6 sm:px-8 sm:py-8" : ""
												}`}
											>
												<InteractiveImage
													src={slide.src}
													alt={slide.alt}
													triggerLabel={`Open screenshot ${index + 1} in theater mode`}
													theaterLabel={`Open effortlessly screenshot ${index + 1}`}
													relativeSize={slide.relativeSize}
													triggerClass="outline-none"
													surfaceClass={`transform-gpu transition-all duration-500 ease-in-out hover:scale-110 ${
														slide.enableShadow
															? "shadow-[0_24px_70px_-24px_rgba(15,23,42,0.18),0_12px_28px_-18px_rgba(15,23,42,0.12)] hover:shadow-2xl"
															: "shadow-none hover:shadow-none"
													}`}
													inlineImageClass="block max-h-full w-auto max-w-full rounded-xl"
													theaterImageClass="block h-auto max-h-[90vh] w-auto max-w-[90vw] rounded-xl"
													imageLoading={index === 0 ? "eager" : "lazy"}
												/>
											</div>
										</Carousel.Item>
									{/each}
								</Carousel.Content>
							</Carousel.Root>

					<div class="flex items-center justify-center gap-2">
						{#each openEffortlesslySlides as _, index}
							<button
								type="button"
									class={`size-2.5 rounded-full transition-colors ${
										index === openEffortlesslyIndex ? "bg-foreground" : "bg-muted-foreground/25 hover:bg-muted-foreground/45"
									}`}
									aria-label={`Show screenshot ${index + 1}`}
									aria-pressed={index === openEffortlesslyIndex}
									onmouseenter={() => showOpenEffortlesslySlide(index)}
									onfocus={() => showOpenEffortlesslySlide(index)}
									ontouchstart={() => showOpenEffortlesslySlide(index)}
								></button>
							{/each}
						</div>
				</div>
			</section>

			{#if isNavigateTradeoffTheaterOpen}
				<div
					class="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px]"
					role="presentation"
					onclick={handleNavigateTradeoffTheaterBackdropClick}
					transition:fade={{ duration: 200 }}
				>
					<div class="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-10">
						<div
							bind:this={navigateTradeoffTheaterDialog}
							class="relative mx-auto flex w-fit max-w-[min(90vw,72rem)] flex-col gap-3"
							role="dialog"
							tabindex="-1"
							aria-modal="true"
							aria-label="Quality comparison theater mode"
							transition:scale={{ duration: 220, easing: cubicOut, start: 0.96 }}
						>
							<div class="flex max-w-full flex-col items-center gap-3 lg:flex-row lg:items-stretch lg:justify-center">
								<!-- svelte-ignore a11y_no_static_element_interactions -->
								<div
									bind:this={navigateTradeoffTheaterFrame}
									class="relative w-fit max-w-full touch-none select-none cursor-ew-resize overflow-hidden rounded-[1.25rem] bg-muted/30 shadow-2xl ring-1 ring-white/10"
									role="slider"
									tabindex="0"
									aria-label="Theater before and after image comparison"
									aria-valuemin={0}
									aria-valuemax={100}
									aria-valuenow={Math.round(navigateTradeoffReveal)}
									onpointerdown={(event) => handleNavigateTradeoffPointerDown(event, "theater")}
									onpointermove={(event) => handleNavigateTradeoffPointerMove(event, "theater")}
									onpointerup={releaseNavigateTradeoffPointer}
									onpointercancel={releaseNavigateTradeoffPointer}
									onlostpointercapture={releaseNavigateTradeoffPointer}
									onkeydown={handleNavigateTradeoffKeydown}
								>
									<img
										class="block h-auto max-h-[72vh] max-w-full object-contain"
										src={selectedTheaterOriginalPreviewSrc}
										data-fallback-src={selectedTradeoffImage.src}
										alt={selectedTradeoffImage.alt}
										draggable="false"
										onerror={handlePreviewImageError}
									/>
									<div
										class="absolute inset-0 overflow-hidden"
										style={`clip-path: inset(0 0 0 ${navigateTradeoffReveal}%);`}
									>
										<img
											class="block h-full w-full object-cover"
											src={selectedTheaterOptimizedPreviewSrc}
											data-fallback-src={selectedRawOptimizedPreviewSrc}
											alt=""
											aria-hidden="true"
											draggable="false"
											onerror={handlePreviewImageError}
										/>
									</div>
									<div class="pointer-events-none absolute inset-y-0" style={`left: calc(${navigateTradeoffReveal}% - 1px);`}>
										<div class="h-full w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(15,23,42,0.18)]"></div>
									</div>
									<div
										class="pointer-events-none absolute top-1/2 z-10 -translate-y-1/2"
										style={`left: calc(${navigateTradeoffReveal}% - 22px);`}
									>
										<div class="flex size-11 items-center justify-center rounded-full border border-white/80 bg-white/90 shadow-lg backdrop-blur">
											{#if isNavigateTradeoffRevealLatched}
												<Lock class="size-4 text-slate-900" aria-hidden="true" />
											{:else}
												<ArrowLeftRight class="size-4 text-slate-900" aria-hidden="true" />
											{/if}
										</div>
									</div>
									<div class="pointer-events-none absolute inset-x-0 top-0 h-28 shadow-[inset_0_48px_36px_-30px_rgba(0,0,0,0.94)]"></div>
									<div class="pointer-events-none absolute inset-x-0 top-0 flex justify-between gap-4 px-4 pt-3 text-white">
										<div class="min-w-0 text-xs font-medium tracking-[0.12em] uppercase drop-shadow">
											Original
											{#if selectedOriginalFileSizeDisplay}
												<span class="ml-2 inline-flex items-baseline gap-1 font-semibold tracking-normal normal-case tabular-nums">
													<NumberFlow
														value={selectedOriginalFileSizeDisplay.value}
														format={fileSizeNumberFormat}
														class="[font:inherit] leading-none"
													/>
													<span>{selectedOriginalFileSizeDisplay.unit}</span>
												</span>
											{:else}
												<span class="ml-2 font-semibold tracking-normal normal-case tabular-nums">--</span>
											{/if}
										</div>
										<div class="min-w-0 text-right text-xs font-medium tracking-[0.12em] uppercase drop-shadow">
											Optimized
											{#if selectedOptimizedFileSizeDisplay}
												<span class="ml-2 inline-flex items-baseline gap-1 font-semibold tracking-normal normal-case tabular-nums">
													<NumberFlow
														value={selectedOptimizedFileSizeDisplay.value}
														format={fileSizeNumberFormat}
														class="[font:inherit] leading-none"
													/>
													<span>{selectedOptimizedFileSizeDisplay.unit}</span>
												</span>
											{:else}
												<span class="ml-2 font-semibold tracking-normal normal-case tabular-nums">--</span>
											{/if}
										</div>
									</div>
								</div>

								<div class="flex min-h-40 items-center justify-center px-1 py-3">
									<div class="flex h-full min-h-40 flex-col items-center gap-2">
										<span class="text-[0.65rem] font-semibold tabular-nums text-white">
											{navigateTradeoffSliderValue}
										</span>
										<div class="relative flex min-h-40 flex-1 items-center justify-center">
											<Slider
												type="single"
												bind:value={navigateTradeoffSliderValue}
												orientation="vertical"
												min={0}
												max={100}
												step={10}
												aria-label="Theater optimized preview amount"
												aria-valuetext={`${navigateTradeoffSliderValue}%`}
												class="h-full min-h-40 [&_[data-slot=slider-range]]:bg-[oklch(58.8%_0.158_241.966)]"
											/>
										</div>
									</div>
								</div>
							</div>

							<div class="grid grid-cols-3 px-2 py-1 text-white">
								<NumberFlowGroup>
									{#each remainControlStats as stat}
										<div class="px-3 text-center">
											<div
												class="text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl"
												style:color={stat.color}
											>
												{#if stat.value === null}
													<span aria-label="No metric data">--</span>
												{:else}
													<NumberFlow
														value={stat.value}
														format={metricNumberFormat}
														class="[font:inherit] leading-none"
													/>
												{/if}
											</div>
											<div class="mt-1 text-[0.6rem] font-medium tracking-[0.12em] text-white/60 uppercase">
												{stat.label}
											</div>
										</div>
									{/each}
								</NumberFlowGroup>
							</div>
						</div>
					</div>
				</div>
			{/if}

				<section class={`grid gap-6 ${featureSectionColumns} lg:items-center`}>
					<div class="space-y-4">
							<h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
								Remain in control
						</h2>
						<p class="text-base leading-7 text-muted-foreground">
							OIMG computes
							<span class="group/metrics relative inline-flex items-center">
								<button
									type="button"
									class="font-medium text-foreground underline decoration-current underline-offset-4"
									aria-label="Show image quality assessment metrics"
								>
									image quality metrics
								</button>
								<span
									class="pointer-events-none absolute bottom-full left-1/2 z-10 mb-3 w-64 -translate-x-1/2 rounded-xl border bg-background px-3 py-2 text-sm leading-6 text-foreground opacity-0 shadow-lg transition-opacity duration-150 group-hover/metrics:opacity-100 group-focus-within/metrics:opacity-100"
									role="tooltip"
								>
									Pixel Match Percentage, MS-SSIM, and SSIMULACRA 2
								</span>
							</span>
							in real time — so you can adjust proactively instead of experiencing unexpected quality drops.
							</p>
						</div>

						<div class="space-y-4 py-3">
							<div class="grid grid-cols-[minmax(0,1fr)_3.5rem] items-stretch gap-3">
									<div class="overflow-hidden rounded-[1.5rem] border bg-card">
										<!-- svelte-ignore a11y_no_static_element_interactions -->
										<div
											bind:this={navigateTradeoffFrame}
											class="relative touch-none select-none cursor-ew-resize overflow-hidden rounded-[1.5rem] bg-muted/30"
										role="slider"
										tabindex="0"
										aria-label="Before and after image comparison"
										aria-valuemin={0}
										aria-valuemax={100}
										aria-valuenow={Math.round(navigateTradeoffReveal)}
										onpointerdown={handleNavigateTradeoffPointerDown}
										onpointermove={handleNavigateTradeoffPointerMove}
										onpointerup={releaseNavigateTradeoffPointer}
										onpointercancel={releaseNavigateTradeoffPointer}
										onlostpointercapture={releaseNavigateTradeoffPointer}
										onkeydown={handleNavigateTradeoffKeydown}
									>
										<img
											class="block aspect-[16/10] h-auto w-full object-cover"
											src={selectedInlineOriginalPreviewSrc}
											data-fallback-src={selectedTradeoffImage.src}
											alt={selectedTradeoffImage.alt}
											draggable="false"
											loading="lazy"
											onerror={handlePreviewImageError}
										/>
									<div
										class="absolute inset-0 overflow-hidden"
										style={`clip-path: inset(0 0 0 ${navigateTradeoffReveal}%);`}
									>
										<img
											class="block aspect-[16/10] h-full w-full object-cover"
											src={selectedInlineOptimizedPreviewSrc}
											data-fallback-src={selectedRawOptimizedPreviewSrc}
											alt=""
											aria-hidden="true"
											draggable="false"
											loading="lazy"
											onerror={handlePreviewImageError}
										/>
									</div>
									<div class="pointer-events-none absolute inset-y-0" style={`left: calc(${navigateTradeoffReveal}% - 1px);`}>
										<div class="h-full w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(15,23,42,0.18)]"></div>
									</div>
									<div
										class="pointer-events-none absolute top-1/2 z-10 -translate-y-1/2"
										style={`left: calc(${navigateTradeoffReveal}% - 22px);`}
									>
										<div class="flex size-11 items-center justify-center rounded-full border border-white/80 bg-white/90 shadow-lg backdrop-blur">
											{#if isNavigateTradeoffRevealLatched}
												<Lock class="size-4 text-slate-900" aria-hidden="true" />
											{:else}
												<ArrowLeftRight class="size-4 text-slate-900" aria-hidden="true" />
											{/if}
										</div>
									</div>
									<div class="pointer-events-none absolute inset-x-0 top-0 h-24 shadow-[inset_0_42px_32px_-28px_rgba(0,0,0,0.92)]"></div>
									<div class="pointer-events-none absolute inset-x-0 top-0 flex justify-between gap-4 px-4 pt-3 text-white">
										<div class="min-w-0 text-xs font-medium tracking-[0.12em] uppercase drop-shadow">
											Original
											{#if selectedOriginalFileSizeDisplay}
												<span class="ml-2 inline-flex items-baseline gap-1 font-semibold tracking-normal normal-case tabular-nums">
													<NumberFlow
														value={selectedOriginalFileSizeDisplay.value}
														format={fileSizeNumberFormat}
														class="[font:inherit] leading-none"
													/>
													<span>{selectedOriginalFileSizeDisplay.unit}</span>
												</span>
											{:else}
												<span class="ml-2 font-semibold tracking-normal normal-case tabular-nums">--</span>
											{/if}
										</div>
										<div class="min-w-0 text-right text-xs font-medium tracking-[0.12em] uppercase drop-shadow">
											Optimized
											{#if selectedOptimizedFileSizeDisplay}
												<span class="ml-2 inline-flex items-baseline gap-1 font-semibold tracking-normal normal-case tabular-nums">
													<NumberFlow
														value={selectedOptimizedFileSizeDisplay.value}
														format={fileSizeNumberFormat}
														class="[font:inherit] leading-none"
													/>
													<span>{selectedOptimizedFileSizeDisplay.unit}</span>
												</span>
											{:else}
												<span class="ml-2 font-semibold tracking-normal normal-case tabular-nums">--</span>
											{/if}
										</div>
									</div>
									</div>
								</div>

								<div class="flex px-1 py-1">
									<div class="flex w-full flex-col items-center gap-2">
										<span class="text-[0.65rem] font-semibold tabular-nums text-foreground">
											{navigateTradeoffSliderValue}
										</span>
										<div class="relative flex min-h-44 flex-1 items-center justify-center">
											<Slider
												type="single"
												bind:value={navigateTradeoffSliderValue}
												orientation="vertical"
												min={0}
												max={100}
												step={10}
												aria-label="Optimized preview amount"
												aria-valuetext={`${navigateTradeoffSliderValue}%`}
												class="h-full min-h-44"
											/>
										</div>
									</div>
								</div>
							</div>

							<div class="grid grid-cols-3">
								<!-- border-y -->
								<NumberFlowGroup>
								{#each remainControlStats as stat}
									<div class="px-3 py-4 text-center">
										<div
											class="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl"
											style:color={stat.color}
										>
											{#if stat.value === null}
												<span aria-label="No metric data">--</span>
											{:else}
												<NumberFlow
													value={stat.value}
													format={metricNumberFormat}
													class="[font:inherit] leading-none"
												/>
											{/if}
										</div>
										<div class="mt-1 text-[0.65rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
											{stat.label}
										</div>
									</div>
								{/each}
								</NumberFlowGroup>
							</div>

						<div class="flex gap-3 overflow-x-auto pb-1">
							{#each navigateTradeoffImages as image, index}
								<button
									type="button"
									class={`group shrink-0 rounded-2xl border p-1 transition-all ${
										index === navigateTradeoffIndex
											? "border-foreground bg-card shadow-sm"
											: "border-border/60 bg-background hover:border-foreground/40 hover:bg-card"
									}`}
									aria-label={`Show ${image.title}`}
									aria-pressed={index === navigateTradeoffIndex}
									onmouseenter={() => showNavigateTradeoffImage(index)}
									onfocus={() => showNavigateTradeoffImage(index)}
									onclick={() => showNavigateTradeoffImage(index)}
								>
									<img
										class="block h-18 w-24 rounded-xl object-cover sm:h-20 sm:w-28"
										src={getCloudflareImageUrl(image.src, {
											width: thumbnailImageWidth,
											fit: "cover",
											sourceOrigin: siteBaseUrl
										})}
										data-fallback-src={image.src}
										alt={image.alt}
										loading="lazy"
										onerror={handlePreviewImageError}
									/>
								</button>
							{/each}
						</div>
					</div>
				</section>

				<section class={`grid gap-6 ${featureSectionColumns} lg:items-center`}>
					<div class="space-y-4">
						<h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
							Find optimal thresholds
					</h2>
					<p class="text-base leading-7 text-muted-foreground">
						Explore the size vs. quality trade-off by visualizing quality metrics and compression efficiency on a graph.
					</p>
				</div>

					<div class="py-3">
						<InteractiveVideo
							src={navigateTradeoffsVideo.src}
							triggerLabel="Open navigate trade-offs video in theater mode"
							theaterLabel="Navigate trade-offs theater mode"
							relativeSize={navigateTradeoffsVideo.relativeSize}
							cardClass="transform-gpu w-full gap-0 overflow-hidden py-0 bg-background shadow-sm transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-2xl focus-within:ring-2 focus-within:ring-primary/40"
							inlineHostClass="flex w-full items-center justify-center"
							inlineVideoClass="block h-auto w-full max-w-full bg-black"
						/>
					</div>
				</section>

				<section class="grid gap-6 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
					<div class="space-y-4">
						<h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
							Compatibility? No problem.
						</h2>
						<p class="text-base leading-7 text-muted-foreground">
							Convert back to JPG or PNG on demand with one click. (This is handy when uploading images to old websites!)
						</p>
					</div>

						<div class="py-3">
							<InteractiveImage
								src={compatibilityImage.src}
								alt={compatibilityImage.alt}
								triggerLabel="Open compatibility workflow image in theater mode"
								theaterLabel="Compatibility workflow theater mode"
								relativeSize={compatibilityImage.relativeSize}
								triggerClass="mx-auto outline-none"
								surfaceClass="transform-gpu transition-all duration-500 ease-in-out shadow-[0_24px_70px_-24px_rgba(15,23,42,0.28),0_12px_28px_-18px_rgba(15,23,42,0.2)] hover:scale-110 hover:shadow-2xl"
								frameClass="overflow-hidden rounded-xl border bg-background"
								inlineImageClass="block h-auto w-full max-w-full"
							/>
					</div>
				</section>

				<section class="space-y-4">
					<h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
						Built for speed
					</h2>
					<p class="max-w-3xl text-base leading-7 text-muted-foreground">
						OIMG is written in Rust for speed and memory safety, and utilizes multithreading and SIMD optimizations so that you can make the most of your time.
					</p>
				</section>

				<section class="space-y-4">
					<h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
						Private by design
					</h2>
					<p class="max-w-3xl text-base leading-7 text-muted-foreground">
						OIMG makes zero network calls. All data stays local.
					</p>
				</section>

				<section class="grid gap-6 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
					<div class="space-y-4">
						<h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
							Free and Open Source
						</h2>
						<p class="text-base leading-7 text-muted-foreground">
							OIMG is free for personal and academic use forever,
							and is open sourced under GPLv3 license.
              Please contact
							<a
								href="mailto:license@oimg.org"
								class="underline decoration-current underline-offset-4 transition-colors hover:text-foreground"
							>
								license@oimg.org
							</a>
							to discuss custom license arrangements.
						</p>
					</div>

						<div class="flex items-center lg:justify-end">
							<Button
								size="lg"
								variant="outline"
								href="https://github.com/yunho-c/oimg"
								target="_blank"
								rel="noreferrer"
								class="mx-2 border-2 border-[#6d4db3] bg-background text-[#6d4db3] hover:bg-[#f4f0ff] hover:text-[#5e43a0] hover:shadow-[0_0_10px_rgba(109,77,179,0.1)] sm:w-auto"
							>
									Source code
									<svg viewBox="0 0 24 24" aria-hidden="true" class="size-4 fill-current">
										<path
											d="M12 2C6.48 2 2 6.58 2 12.23c0 4.51 2.87 8.34 6.84 9.69.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z"
										/>
									</svg>
								</Button>
							<Button
							size="lg"
							variant="outline"
							href="https://github.com/yunho-c/oimg/issues"
							target="_blank"
							rel="noreferrer"
							class="mx-2 border-2 border-[#dc2626] bg-background text-[#dc2626] hover:bg-[#fff1f1] hover:text-[#b91c1c] hover:shadow-[0_0_10px_rgba(220,38,38,0.1)] sm:w-auto"
							>
								Issue tracker
								<ExternalLink class="size-4" />
							</Button>
						</div>
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

			{#if false}
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
			{/if}
		</main>

		<footer class="flex flex-col gap-2 border-t py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
			<p>&copy; {currentYear} OIMG. All rights reserved.</p>
			<p>
				Built with care and love by
				<a
					href="https://yunhocho.com/"
					target="_blank"
					rel="noreferrer"
					class="underline decoration-current underline-offset-4 transition-colors hover:text-foreground"
				>
					Yunho Cho
				</a>
			</p>
		</footer>
	</div>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>

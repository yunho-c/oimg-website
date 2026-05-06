export type QualityImageId =
	| "fuji"
	| "cloudy-yokohama"
	| "sunny-room"
	| "bracken"
	| "ducks"
	| "dark-bulb";

export type QualityValue = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;

export type QualityMetricKey = "pmp" | "msSsim" | "ssimu2";

export type QualityMetrics = Record<QualityMetricKey, number | null>;

export type QualityFileSizes = {
	original: string;
	optimized: Record<QualityValue, string>;
};

export type CloudflareImageTransformOptions = {
	width: number;
	fit?: "cover" | "scale-down";
	format?: "auto";
	sourceOrigin?: string;
};

export const qualityMetricLabels: Record<QualityMetricKey, string> = {
	pmp: "Pixel match",
	msSsim: "MS-SSIM",
	ssimu2: "SSIMULACRA"
};

const qualitySweepBaseUrl = "https://media.oimg.org/images/quality-sweep";

export const qualityMetricTable: Record<QualityImageId, Record<QualityValue, QualityMetrics>> = {
	fuji: {
		0: { pmp: 0.18, msSsim: 0.369, ssimu2: -0.692 },
		10: { pmp: 0.916, msSsim: 0.8, ssimu2: -0.155 },
		20: { pmp: 0.963, msSsim: 0.871, ssimu2: 0.279 },
		30: { pmp: 0.98, msSsim: 0.902, ssimu2: 0.462 },
		40: { pmp: 0.988, msSsim: 0.918, ssimu2: 0.564 },
		50: { pmp: 0.992, msSsim: 0.928, ssimu2: 0.629 },
		60: { pmp: 0.995, msSsim: 0.936, ssimu2: 0.669 },
		70: { pmp: 0.997, msSsim: 0.946, ssimu2: 0.719 },
		80: { pmp: 0.999, msSsim: 0.961, ssimu2: 0.777 },
		90: { pmp: 1, msSsim: 0.98, ssimu2: 0.829 },
		100: { pmp: 1, msSsim: 0.999, ssimu2: 0.877 }
	},
	"cloudy-yokohama": {
		0: { pmp: 0.351, msSsim: 0.223, ssimu2: -1.241 },
		10: { pmp: 0.818, msSsim: 0.767, ssimu2: -0.267 },
		20: { pmp: 0.881, msSsim: 0.865, ssimu2: 0.192 },
		30: { pmp: 0.91, msSsim: 0.9, ssimu2: 0.394 },
		40: { pmp: 0.927, msSsim: 0.919, ssimu2: 0.501 },
		50: { pmp: 0.938, msSsim: 0.929, ssimu2: 0.561 },
		60: { pmp: 0.948, msSsim: 0.939, ssimu2: 0.611 },
		70: { pmp: 0.96, msSsim: 0.949, ssimu2: 0.664 },
		80: { pmp: 0.973, msSsim: 0.962, ssimu2: 0.735 },
		90: { pmp: 0.994, msSsim: 0.996, ssimu2: 0.842 },
		100: { pmp: 1, msSsim: 1, ssimu2: 0.929 }
	},
	"sunny-room": {
		0: { pmp: 0.225, msSsim: 0.187, ssimu2: -0.752 },
		10: { pmp: 0.904, msSsim: 0.572, ssimu2: -0.202 },
		20: { pmp: 0.945, msSsim: 0.681, ssimu2: 0.231 },
		30: { pmp: 0.961, msSsim: 0.74, ssimu2: 0.412 },
		40: { pmp: 0.972, msSsim: 0.794, ssimu2: 0.537 },
		50: { pmp: 0.978, msSsim: 0.823, ssimu2: 0.608 },
		60: { pmp: 0.984, msSsim: 0.859, ssimu2: 0.66 },
		70: { pmp: 0.99, msSsim: 0.889, ssimu2: 0.718 },
		80: { pmp: 0.995, msSsim: 0.926, ssimu2: 0.79 },
		90: { pmp: 0.999, msSsim: 0.973, ssimu2: 0.854 },
		100: { pmp: 1, msSsim: 0.999, ssimu2: 0.92 }
	},
	bracken: {
		0: { pmp: 1, msSsim: 1, ssimu2: 0.935 },
		10: { pmp: 1, msSsim: 0.998, ssimu2: 0.891 },
		20: { pmp: 0.999, msSsim: 0.995, ssimu2: 0.849 },
		30: { pmp: 0.997, msSsim: 0.986, ssimu2: 0.774 },
		40: { pmp: 0.995, msSsim: 0.982, ssimu2: 0.725 },
		50: { pmp: 0.991, msSsim: 0.977, ssimu2: 0.67 },
		60: { pmp: 0.986, msSsim: 0.966, ssimu2: 0.602 },
		70: { pmp: 0.971, msSsim: 0.934, ssimu2: 0.469 },
		80: { pmp: 0.946, msSsim: 0.909, ssimu2: 0.284 },
		90: { pmp: 0.855, msSsim: 0.825, ssimu2: -0.174 },
		100: { pmp: 0.231, msSsim: 0.204, ssimu2: -2.547 }
	},
	ducks: {
		0: { pmp: 0.017, msSsim: 0.204, ssimu2: -3.664 },
		10: { pmp: 0.843, msSsim: 0.923, ssimu2: -0.105 },
		20: { pmp: 0.957, msSsim: 0.965, ssimu2: 0.367 },
		30: { pmp: 0.983, msSsim: 0.977, ssimu2: 0.543 },
		40: { pmp: 0.992, msSsim: 0.982, ssimu2: 0.637 },
		50: { pmp: 0.995, msSsim: 0.986, ssimu2: 0.694 },
		60: { pmp: 0.997, msSsim: 0.988, ssimu2: 0.735 },
		70: { pmp: 0.999, msSsim: 0.991, ssimu2: 0.779 },
		80: { pmp: 1, msSsim: 0.994, ssimu2: 0.83 },
		90: { pmp: 1, msSsim: 0.997, ssimu2: 0.877 },
		100: { pmp: 1, msSsim: 1, ssimu2: 0.935 }
	},
	"dark-bulb": {
		0: { pmp: 0.18, msSsim: 0.049, ssimu2: -0.588 },
		10: { pmp: 0.992, msSsim: 0.139, ssimu2: 0.015 },
		20: { pmp: 0.997, msSsim: null, ssimu2: 0.337 },
		30: { pmp: 0.998, msSsim: 0.246, ssimu2: 0.493 },
		40: { pmp: 0.999, msSsim: 0.263, ssimu2: 0.598 },
		50: { pmp: 0.999, msSsim: 0.326, ssimu2: 0.634 },
		60: { pmp: 1, msSsim: null, ssimu2: 0.681 },
		70: { pmp: 1, msSsim: 0.402, ssimu2: 0.728 },
		80: { pmp: 1, msSsim: null, ssimu2: 0.801 },
		90: { pmp: 1, msSsim: null, ssimu2: 0.905 },
		100: { pmp: 1, msSsim: null, ssimu2: 0.938 }
	}
};

export const qualityFileSizeTable: Record<QualityImageId, QualityFileSizes> = {
	fuji: {
		original: "8.8 MB",
		optimized: {
			0: "60 KB",
			10: "215 KB",
			20: "390 KB",
			30: "534 KB",
			40: "664 KB",
			50: "778 KB",
			60: "906 KB",
			70: "1.1 MB",
			80: "1.4 MB",
			90: "2.3 MB",
			100: "7.5 MB"
		}
	},
	"cloudy-yokohama": {
		original: "2.8 MB",
		optimized: {
			0: "40 KB",
			10: "228 KB",
			20: "418 KB",
			30: "575 KB",
			40: "716 KB",
			50: "834 KB",
			60: "981 KB",
			70: "1.2 MB",
			80: "1.5 MB",
			90: "2.6 MB",
			100: "4.6 MB"
		}
	},
	"sunny-room": {
		original: "1.6 MB",
		optimized: {
			0: "38 KB",
			10: "147 KB",
			20: "278 KB",
			30: "367 KB",
			40: "494 KB",
			50: "581 KB",
			60: "675 KB",
			70: "807 KB",
			80: "1.0 MB",
			90: "1.4 MB",
			100: "3.2 MB"
		}
	},
	bracken: {
		original: "2.7 MB",
		optimized: {
			0: "55 KB",
			10: "318 KB",
			20: "590 KB",
			30: "781 KB",
			40: "1.0 MB",
			50: "1.2 MB",
			60: "1.4 MB",
			70: "1.6 MB",
			80: "2.2 MB",
			90: "2.7 MB",
			100: "5.0 MB"
		}
	},
	ducks: {
		original: "9.7 MB",
		optimized: {
			0: "66 KB",
			10: "369 KB",
			20: "696 KB",
			30: "973 KB",
			40: "1.2 MB",
			50: "1.4 MB",
			60: "1.7 MB",
			70: "2.0 MB",
			80: "2.7 MB",
			90: "4.2 MB",
			100: "9.9 MB"
		}
	},
	"dark-bulb": {
		original: "438 KB",
		optimized: {
			0: "19 KB",
			10: "27 KB",
			20: "38 KB",
			30: "48 KB",
			40: "60 KB",
			50: "69 KB",
			60: "84 KB",
			70: "105 KB",
			80: "177 KB",
			90: "408 KB",
			100: "903 KB"
		}
	}
};

export function getNearestQualityValue(quality: number) {
	return Math.min(Math.max(Math.round(quality / 10) * 10, 0), 100) as QualityValue;
}

export function getOptimizedQualityImageUrl(imageId: QualityImageId, quality: number) {
	return `${qualitySweepBaseUrl}/${imageId}_opt_q${getNearestQualityValue(quality)}.jpeg`;
}

export function getCloudflareImageUrl(
	src: string,
	{ width, fit = "scale-down", format = "auto", sourceOrigin }: CloudflareImageTransformOptions
) {
	const options = `width=${width},fit=${fit},format=${format}`;

	if (src.startsWith("http://") || src.startsWith("https://")) {
		const url = new URL(src);

		return `${url.origin}/cdn-cgi/image/${options}${url.pathname}${url.search}`;
	}

	if (src.startsWith("/")) {
		if (sourceOrigin) {
			return `${sourceOrigin}/cdn-cgi/image/${options}${src}`;
		}

		return `/cdn-cgi/image/${options}${src}`;
	}

	return src;
}

export function getTransformedOptimizedQualityImageUrl(
	imageId: QualityImageId,
	quality: number,
	options: CloudflareImageTransformOptions
) {
	return getCloudflareImageUrl(getOptimizedQualityImageUrl(imageId, quality), options);
}

export function getQualityMetrics(imageId: QualityImageId, quality: number) {
	const nearestQuality = getNearestQualityValue(quality);

	return qualityMetricTable[imageId][nearestQuality];
}

export function getOriginalQualityFileSize(imageId: QualityImageId) {
	return qualityFileSizeTable[imageId].original;
}

export function getOptimizedQualityFileSize(imageId: QualityImageId, quality: number) {
	return qualityFileSizeTable[imageId].optimized[getNearestQualityValue(quality)];
}

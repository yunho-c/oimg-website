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

export const qualityMetricLabels: Record<QualityMetricKey, string> = {
	pmp: "Pixel match",
	msSsim: "MS-SSIM",
	ssimu2: "SSIMULACRA"
};

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

export function getQualityMetrics(imageId: QualityImageId, quality: number) {
	const nearestQuality = Math.min(Math.max(Math.round(quality / 10) * 10, 0), 100) as QualityValue;

	return qualityMetricTable[imageId][nearestQuality];
}

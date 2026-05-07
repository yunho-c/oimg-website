type DownloadTarget = {
	label: string;
	pattern: RegExp;
	getAssetName: (version: string) => string;
};

type GitHubReleaseAsset = {
	name: string;
	browser_download_url: string;
	size: number;
	download_count: number;
};

type GitHubRelease = {
	tag_name: string;
	html_url: string;
	assets: GitHubReleaseAsset[];
};

class DownloadAssetNotFoundError extends Error {
	constructor(message = "Download asset not found") {
		super(message);
		this.name = "DownloadAssetNotFoundError";
	}
}

const TARGETS: Record<string, DownloadTarget> = {
	"macos-arm64": {
		label: "macOS Apple Silicon DMG",
		pattern: /^OIMG-[\d.]+(?:-[\w]+)?\.dmg$/i,
		getAssetName: (version) => `OIMG-${version}.dmg`
	},
	"macos-x64": {
		label: "macOS Intel DMG",
		pattern: /^OIMG-[\d.]+(?:-[\w]+)?\.dmg$/i,
		getAssetName: (version) => `OIMG-${version}.dmg`
	},
	"windows-x64": {
		label: "Windows x64 setup",
		pattern: /^OIMG-[\d.]+-windows-x64-setup\.exe$/i,
		getAssetName: (version) => `OIMG-${version}-windows-x64-setup.exe`
	},
	"linux-x64": {
		label: "Linux amd64 deb",
		pattern: /^oimg_[\d.]+(?:\+\d+)?_amd64\.deb$/i,
		getAssetName: (version) => `oimg_${version}_amd64.deb`
	}
};

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);

		if (!url.pathname.startsWith("/download/")) {
			return new Response("Not found", { status: 404 });
		}

		const targetKey = url.pathname.replace("/download/", "").replace(/\/$/, "");
		const target = TARGETS[targetKey];

		if (!target) {
			return new Response("Unknown download target", { status: 404 });
		}

		let resolvedAsset: {
			releaseTag: string;
			name: string;
			browserDownloadUrl: string;
			size: number;
		};

		try {
			resolvedAsset = await resolveDownloadAsset(target, env, ctx);
		} catch (error) {
			if (error instanceof DownloadAssetNotFoundError) {
				return new Response("Download asset not found", { status: 404 });
			}

			console.error("Download asset resolution failed", error);

			return new Response("Download temporarily unavailable", { status: 502 });
		}

		env.DOWNLOAD_ANALYTICS.writeDataPoint({
			blobs: [
				targetKey,
				target.label,
				resolvedAsset.releaseTag,
				resolvedAsset.name,
				request.headers.get("referer") ?? "",
				request.cf?.country ?? "",
				request.headers.get("user-agent") ?? ""
			],
			doubles: [Date.now(), resolvedAsset.size],
			indexes: [targetKey]
		});

		return Response.redirect(resolvedAsset.browserDownloadUrl, 302);
	}
} satisfies ExportedHandler<Env>;

async function resolveDownloadAsset(
	target: DownloadTarget,
	env: Env,
	ctx: ExecutionContext
) {
	let release: GitHubRelease;

	try {
		release = await getLatestReleaseFromApi(env, ctx);
	} catch (error) {
		console.warn("GitHub API release lookup failed; falling back to latest release redirect", error);

		return getDownloadAssetFromLatestRedirect(target, env, ctx);
	}

	const asset = release.assets.find((asset) => target.pattern.test(asset.name));

	if (!asset) {
		console.error("No matching asset", {
			tagName: release.tag_name,
			assetNames: release.assets.map((asset) => asset.name)
		});

		throw new DownloadAssetNotFoundError();
	}

	return {
		releaseTag: release.tag_name,
		name: asset.name,
		browserDownloadUrl: asset.browser_download_url,
		size: asset.size
	};
}

async function getDownloadAssetFromLatestRedirect(
	target: DownloadTarget,
	env: Env,
	ctx: ExecutionContext
) {
	const releaseTag = await getLatestReleaseTagFromRedirect(env, ctx);
	const expandedAsset = await getDownloadAssetFromExpandedAssets(target, env, releaseTag);

	if (expandedAsset) {
		return expandedAsset;
	}

	const version = releaseTag.replace(/^v/i, "");
	const assetName = target.getAssetName(version);

	return {
		releaseTag,
		name: assetName,
		browserDownloadUrl: `https://github.com/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/releases/download/${releaseTag}/${assetName}`,
		size: 0
	};
}

async function getLatestReleaseFromApi(env: Env, ctx: ExecutionContext): Promise<GitHubRelease> {
	const cache = caches.default;
	const cacheKey = new Request(
		`https://oimg.org/__release-cache/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/latest`
	);

	const cached = await cache.match(cacheKey);
	if (cached) {
		return cached.json();
	}

	const response = await fetch(
		`https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/releases/latest`,
		{
			headers: {
				Accept: "application/vnd.github+json",
				"User-Agent": "oimg-download-worker"
			}
		}
	);

	if (!response.ok) {
		throw new Error(`GitHub returned ${response.status}`);
	}

	const release = await response.json<GitHubRelease>();
	const cacheResponse = new Response(JSON.stringify(release), {
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "public, max-age=300"
		}
	});

	ctx.waitUntil(cache.put(cacheKey, cacheResponse.clone()));

	return release;
}

async function getLatestReleaseTagFromRedirect(env: Env, ctx: ExecutionContext) {
	const cache = caches.default;
	const cacheKey = new Request(
		`https://oimg.org/__release-tag-cache/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/latest`
	);

	const cached = await cache.match(cacheKey);
	if (cached) {
		return cached.text();
	}

	const response = await fetch(
		`https://github.com/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/releases/latest`,
		{
			redirect: "manual",
			headers: {
				"User-Agent": "oimg-download-worker"
			}
		}
	);
	const location = response.headers.get("location");

	if (!location) {
		throw new Error(`GitHub latest release redirect returned ${response.status}`);
	}

	const releaseUrl = new URL(location, `https://github.com/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/`);
	const releaseTag = releaseUrl.pathname.split("/").pop();

	if (!releaseTag) {
		throw new Error(`Could not read latest release tag from ${releaseUrl.href}`);
	}

	const cacheResponse = new Response(releaseTag, {
		headers: {
			"Cache-Control": "public, max-age=300"
		}
	});

	ctx.waitUntil(cache.put(cacheKey, cacheResponse.clone()));

	return releaseTag;
}

async function getDownloadAssetFromExpandedAssets(
	target: DownloadTarget,
	env: Env,
	releaseTag: string
) {
	const response = await fetch(
		`https://github.com/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/releases/expanded_assets/${releaseTag}`,
		{
			headers: {
				"User-Agent": "oimg-download-worker"
			}
		}
	);

	if (!response.ok) {
		console.warn(`GitHub expanded assets returned ${response.status}`);

		return null;
	}

	const html = await response.text();
	const hrefPattern = /href="([^"]+)"/g;
	let match: RegExpExecArray | null;

	while ((match = hrefPattern.exec(html)) !== null) {
		const href = match[1].replaceAll("&amp;", "&");
		const releasePath = `/releases/download/${releaseTag}/`;
		const releasePathIndex = href.indexOf(releasePath);

		if (releasePathIndex === -1) continue;

		const assetName = decodeURIComponent(href.slice(releasePathIndex + releasePath.length));
		if (!target.pattern.test(assetName)) continue;

		return {
			releaseTag,
			name: assetName,
			browserDownloadUrl: new URL(href, "https://github.com").href,
			size: 0
		};
	}

	return null;
}

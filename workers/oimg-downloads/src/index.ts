type DownloadTarget = {
	label: string;
	pattern: RegExp;
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

const TARGETS: Record<string, DownloadTarget> = {
	"macos-arm64": {
		label: "macOS Apple Silicon DMG",
		pattern: /^OIMG-[\d.]+-macos\.dmg$/i
	},
	"macos-x64": {
		label: "macOS Intel DMG",
		pattern: /^OIMG-[\d.]+-macos\.dmg$/i
	},
	"windows-x64": {
		label: "Windows x64 setup",
		pattern: /^OIMG-[\d.]+-windows-x64-setup\.exe$/i
	},
	"linux-x64": {
		label: "Linux amd64 deb",
		pattern: /^oimg_[\d.]+_amd64\.deb$/i
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

		let release: GitHubRelease;

		try {
			release = await getLatestRelease(env, ctx);
		} catch (error) {
			console.error("GitHub release lookup failed", error);

			return new Response("Download temporarily unavailable", { status: 502 });
		}

		const asset = release.assets.find((asset) => target.pattern.test(asset.name));

		if (!asset) {
			console.error("No matching asset", {
				targetKey,
				tagName: release.tag_name,
				assetNames: release.assets.map((asset) => asset.name)
			});

			return new Response("Download asset not found", { status: 404 });
		}

		env.DOWNLOAD_ANALYTICS.writeDataPoint({
			blobs: [
				targetKey,
				target.label,
				release.tag_name,
				asset.name,
				request.headers.get("referer") ?? "",
				request.cf?.country ?? "",
				request.headers.get("user-agent") ?? ""
			],
			doubles: [Date.now(), asset.size],
			indexes: [targetKey]
		});

		return Response.redirect(asset.browser_download_url, 302);
	}
} satisfies ExportedHandler<Env>;

async function getLatestRelease(env: Env, ctx: ExecutionContext): Promise<GitHubRelease> {
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

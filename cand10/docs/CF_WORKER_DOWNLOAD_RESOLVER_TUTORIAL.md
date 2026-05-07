# Cloudflare Worker Download Resolver Tutorial

This guide explains how to put clean, first-party download URLs in front of versioned GitHub Release assets.

The intended UX is:

```txt
https://oimg.org/download/windows-x64-setup
```

The Worker records a download event, resolves the current GitHub Release asset, then redirects to the real versioned installer:

```txt
https://github.com/yunho-c/oimg/releases/download/v0.1.1/OIMG-0.1.1-windows-x64-setup.exe
```

## Why Use This

Use this pattern when you want:

- Clean website URLs that do not expose GitHub UI details.
- Versioned release filenames for support, checksums, and cache correctness.
- Server-side analytics for download requests.
- The flexibility to move hosting from GitHub Releases to R2 later without changing website links.

## Architecture

```txt
Website button
  -> https://oimg.org/download/windows-x64-setup
  -> Cloudflare Worker
  -> Workers Analytics Engine event
  -> GitHub latest release API
  -> matching release asset
  -> 302 redirect to browser_download_url
```

## Recommended Filename Strategy

Keep version numbers in the actual GitHub Release asset filenames:

```txt
OIMG-0.1.1-windows-x64-setup.exe
OIMG-0.1.1-windows-x64.zip
OIMG-0.1.1-macos-universal.dmg
OIMG-0.1.1-linux-x64.AppImage
oimg_0.1.1+4_amd64.deb
```

Expose stable URLs through Cloudflare:

```txt
https://oimg.org/download/windows-x64-setup
https://oimg.org/download/windows-x64-zip
https://oimg.org/download/macos-dmg
https://oimg.org/download/linux-x64-appimage
https://oimg.org/download/linux-amd64-deb
```

## 1. Create A Worker Project

Create a small standalone Worker project. It can live in this repo under a folder such as `workers/download-resolver`, or in a separate repo.

```sh
bunx wrangler init oimg-downloads
cd oimg-downloads
bun add -D wrangler typescript
```

If Wrangler asks what template to use, choose a basic Worker with TypeScript.

## 2. Configure Wrangler

Create or edit `wrangler.jsonc`:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "oimg-downloads",
	"main": "src/index.ts",
	"compatibility_date": "2026-05-05",
	"observability": {
		"enabled": true
	},
	"analytics_engine_datasets": [
		{
			"binding": "DOWNLOAD_ANALYTICS",
			"dataset": "oimg_downloads"
		}
	],
	"vars": {
		"GITHUB_OWNER": "yunho-c",
		"GITHUB_REPO": "oimg"
	}
}
```

Notes:

- `compatibility_date` should be kept current when you create or update the Worker.
- `DOWNLOAD_ANALYTICS` is the binding name used in Worker code.
- The Analytics Engine dataset is created automatically when the Worker first writes to it.

## 3. Add The Worker Code

Create `src/index.ts`:

```ts
type Env = {
	GITHUB_OWNER: string;
	GITHUB_REPO: string;
	DOWNLOAD_ANALYTICS: AnalyticsEngineDataset;
};

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
	"windows-x64-setup": {
		label: "Windows x64 setup",
		pattern: /^OIMG-[\d.]+-windows-x64-setup\.exe$/i
	},
	"windows-x64-zip": {
		label: "Windows x64 zip",
		pattern: /^OIMG-[\d.]+-windows-x64\.zip$/i
	},
	"macos-dmg": {
		label: "macOS DMG",
		pattern: /^OIMG-[\d.]+(?:-[\w]+)?\.dmg$/i
	},
	"linux-x64-appimage": {
		label: "Linux x64 AppImage",
		pattern: /^OIMG-[\d.]+-linux-x64\.AppImage$/i
	},
	"linux-amd64-deb": {
		label: "Linux amd64 deb",
		pattern: /^oimg_[\d.]+(?:\+\d+)?_amd64\.deb$/i
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

	const apiUrl = `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/releases/latest`;

	const response = await fetch(apiUrl, {
		headers: {
			Accept: "application/vnd.github+json",
			"User-Agent": "oimg-download-worker"
		}
	});

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
```

## 4. Generate Worker Types

Generate Cloudflare Worker types from the Wrangler config:

```sh
bunx wrangler types
```

If generated types define `Env` for you, remove the hand-written `type Env = ...` block from `src/index.ts` and use the generated one.

## 5. Test Locally

Start local development:

```sh
bunx wrangler dev
```

Then open:

```txt
http://localhost:8787/download/windows-x64-setup
```

Expected behavior:

- If the latest GitHub release has a matching asset, the browser redirects to GitHub's direct asset download URL.
- If the release does not have a matching asset, the Worker returns `404 Download asset not found`.

## 6. Deploy

Deploy the Worker:

```sh
bunx wrangler deploy
```

After deploy, bind it to a route or custom domain in Cloudflare.

Recommended route:

```txt
oimg.org/download/*
```

Alternative subdomain:

```txt
downloads.oimg.org/*
```

## 7. Update Website Links

In the Svelte website, point download buttons at the Worker URLs:

```ts
const downloadCatalog = {
	macos: {
		label: "macOS",
		arches: {
			arm64: {
				label: "Apple Silicon",
				downloadHref: "https://oimg.org/download/macos-dmg",
				command: "brew install --cask oimg"
			}
		}
	},
	windows: {
		label: "Windows",
		arches: {
			x64: {
				label: "x64",
				downloadHref: "https://oimg.org/download/windows-x64-setup",
				command: "winget install YunhoCho.OIMG"
			}
		}
	}
};
```

For the download button, use a normal anchor link. Avoid `target="_blank"` if the desired UX is immediate download in the same browser context.

```svelte
<Button size="lg" href={selectedTarget.downloadHref} class="sm:w-auto">
	{getDownloadButtonLabel(selectedPlatform, effectiveArchitecture)}
	<Download class="size-4" />
</Button>
```

## 8. Query Analytics

Workers Analytics Engine stores the custom events written by `writeDataPoint()`.

The fields in this tutorial are:

- `blob1`: target key, such as `windows-x64-setup`
- `blob2`: human label
- `blob3`: release tag, such as `v0.1.1`
- `blob4`: resolved asset filename
- `blob5`: referrer
- `blob6`: Cloudflare country
- `blob7`: user agent
- `double1`: timestamp in milliseconds
- `double2`: asset size in bytes
- `index1`: target key

Example queries can group downloads by target, version, or country. Use Cloudflare's Analytics Engine SQL API for dashboards or periodic reports.

## 9. More Deterministic Option: Release Manifest

Regex matching is convenient, but a release manifest is more deterministic.

During the GitHub Actions release job in the main `oimg` repo, publish a manifest like this:

```json
{
	"version": "0.1.1",
	"tag": "v0.1.1",
	"assets": {
		"windows-x64-setup": "OIMG-0.1.1-windows-x64-setup.exe",
		"windows-x64-zip": "OIMG-0.1.1-windows-x64.zip",
		"macos-dmg": "OIMG-0.1.1-macos-universal.dmg",
		"linux-x64-appimage": "OIMG-0.1.1-linux-x64.AppImage",
		"linux-amd64-deb": "oimg_0.1.1+4_amd64.deb"
	}
}
```

Then upload it to the same GitHub Release as:

```txt
oimg-release-manifest.json
```

The Worker can fetch the latest release, find `oimg-release-manifest.json`, fetch that asset, and resolve exact filenames instead of guessing by regex.

Use the manifest approach once release automation is stable and asset naming is final.

## 10. Future Option: Mirror To R2

If downloads become important enough to own the full delivery path:

1. Keep GitHub Releases as the public archive.
2. Mirror installers to Cloudflare R2 during the release job.
3. Have the Worker redirect to R2 or serve from R2.

This gives better control over:

- Branded URLs.
- Cache headers.
- Download analytics.
- Regional performance.
- Fallback behavior.

The website does not need to change if it already points to `https://oimg.org/download/...`.

## References

- Cloudflare Workers Wrangler configuration: https://developers.cloudflare.com/workers/wrangler/configuration/
- Cloudflare Workers Wrangler commands: https://developers.cloudflare.com/workers/wrangler/commands/workers/
- Cloudflare Workers Analytics Engine: https://developers.cloudflare.com/analytics/analytics-engine/get-started/
- GitHub release asset links: https://docs.github.com/articles/linking-to-releases
- GitHub release assets API: https://docs.github.com/en/rest/releases/assets

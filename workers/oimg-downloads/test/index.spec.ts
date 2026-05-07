import { createExecutionContext, waitOnExecutionContext } from "cloudflare:test";
import { afterEach, describe, expect, it, vi } from "vitest";
import worker from "../src/index";

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

type MockAsset = {
	name: string;
	size?: number;
};

function createRelease(assets: MockAsset[] = defaultAssets()) {
	return {
		tag_name: "v0.1.1",
		html_url: "https://github.com/yunho-c/oimg/releases/tag/v0.1.1",
		assets: assets.map((asset) => ({
			name: asset.name,
			browser_download_url: `https://github.com/yunho-c/oimg/releases/download/v0.1.1/${asset.name}`,
			size: asset.size ?? 1024,
			download_count: 0
		}))
	};
}

function defaultAssets() {
	return [
		{ name: "OIMG-0.1.1-macos.dmg", size: 10_000 },
		{ name: "OIMG-0.1.1-windows-x64-setup.exe", size: 20_000 },
		{ name: "oimg_0.1.1_amd64.deb", size: 30_000 }
	];
}

function createEnv(testName: string) {
	return {
		GITHUB_OWNER: "yunho-c",
		GITHUB_REPO: `oimg-${testName}`,
		DOWNLOAD_ANALYTICS: {
			writeDataPoint: vi.fn()
		}
	} as unknown as Env;
}

function mockGitHubRelease(response: Response) {
	vi.stubGlobal("fetch", vi.fn(async () => response));
}

async function fetchWorker(path: string, env: Env) {
	const ctx = createExecutionContext();
	const response = await worker.fetch(
		new IncomingRequest(`https://oimg.org${path}`, {
			headers: {
				referer: "https://oimg.org/",
				"user-agent": "vitest"
			},
			redirect: "manual"
		}),
		env,
		ctx
	);

	await waitOnExecutionContext(ctx);

	return response;
}

afterEach(() => {
	vi.unstubAllGlobals();
});

describe("download resolver", () => {
	it.each([
		["/download/macos-arm64", "OIMG-0.1.1-macos.dmg"],
		["/download/macos-x64", "OIMG-0.1.1-macos.dmg"],
		["/download/windows-x64", "OIMG-0.1.1-windows-x64-setup.exe"],
		["/download/linux-x64", "oimg_0.1.1_amd64.deb"]
	])("redirects %s to the matching GitHub release asset", async (path, assetName) => {
		const env = createEnv(path.replaceAll("/", "-"));
		mockGitHubRelease(Response.json(createRelease()));

		const response = await fetchWorker(path, env);

		expect(response.status).toBe(302);
		expect(response.headers.get("location")).toBe(
			`https://github.com/yunho-c/oimg/releases/download/v0.1.1/${assetName}`
		);
		expect(env.DOWNLOAD_ANALYTICS.writeDataPoint).toHaveBeenCalledWith(
			expect.objectContaining({
				blobs: expect.arrayContaining([expect.stringMatching(/macos|windows|linux/), assetName]),
				indexes: [path.replace("/download/", "")]
			})
		);
	});

	it("returns 404 for an unknown download target", async () => {
		const env = createEnv("unknown-target");

		const response = await fetchWorker("/download/linux-arm64", env);

		expect(response.status).toBe(404);
		expect(await response.text()).toBe("Unknown download target");
	});

	it("returns 404 when the latest release has no matching asset", async () => {
		const env = createEnv("missing-asset");
		mockGitHubRelease(Response.json(createRelease([{ name: "OIMG-0.1.1-windows-x64.zip" }])));

		const response = await fetchWorker("/download/windows-x64", env);

		expect(response.status).toBe(404);
		expect(await response.text()).toBe("Download asset not found");
	});

	it("returns 502 when GitHub release lookup fails", async () => {
		const env = createEnv("github-failure");
		mockGitHubRelease(new Response("rate limited", { status: 403 }));

		const response = await fetchWorker("/download/windows-x64", env);

		expect(response.status).toBe(502);
		expect(await response.text()).toBe("Download temporarily unavailable");
	});
});

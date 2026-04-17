#!/usr/bin/env node

import { access, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const assetManifest = [
	{
		localPath: "static/analyze_demo.mp4",
		r2Key: "videos/analyze_demo.mp4",
		contentType: "video/mp4"
	}
];

function printUsage() {
	console.log(`Usage: bun run sync:r2-media [--bucket <name>] [--prefix <path>] [--dry-run]

Uploads the media assets needed by the landing page to Cloudflare R2 using Wrangler.

Options:
  --bucket <name>   R2 bucket name. Defaults to "oimg".
  --prefix <path>   Optional path prefix inside the bucket, for example "staging".
  --dry-run         Print the upload plan without calling Wrangler.
  --help            Show this help text.
`);
}

function parseArgs(argv) {
	const options = {
		bucket: "oimg",
		prefix: "",
		dryRun: false
	};

	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];

		if (arg === "--bucket") {
			options.bucket = argv[index + 1] ?? "";
			index += 1;
			continue;
		}

		if (arg === "--prefix") {
			options.prefix = argv[index + 1] ?? "";
			index += 1;
			continue;
		}

		if (arg === "--dry-run") {
			options.dryRun = true;
			continue;
		}

		if (arg === "--help" || arg === "-h") {
			printUsage();
			process.exit(0);
		}

		throw new Error(`Unknown argument: ${arg}`);
	}

	if (!options.bucket) {
		throw new Error("Missing bucket name after --bucket.");
	}

	return options;
}

function joinR2Key(prefix, key) {
	return [prefix, key].filter(Boolean).join("/").replace(/\/{2,}/g, "/");
}

function formatBytes(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KiB`;
	if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MiB`;
	return `${(bytes / 1024 ** 3).toFixed(1)} GiB`;
}

async function runCommand(command, args, cwd) {
	await new Promise((resolve, reject) => {
		const child = spawn(command, args, {
			cwd,
			stdio: "inherit",
			shell: false
		});

		child.on("error", reject);
		child.on("exit", (code) => {
			if (code === 0) {
				resolve();
				return;
			}

			reject(new Error(`${command} exited with code ${code ?? "unknown"}`));
		});
	});
}

async function ensureFilesExist(manifest) {
	for (const asset of manifest) {
		const absolutePath = path.join(projectRoot, asset.localPath);
		await access(absolutePath);
	}
}

async function main() {
	const options = parseArgs(process.argv.slice(2));
	await ensureFilesExist(assetManifest);

	console.log(`Syncing ${assetManifest.length} media asset(s) to R2 bucket "${options.bucket}"`);
	if (options.prefix) {
		console.log(`Using key prefix "${options.prefix}"`);
	}

	for (const asset of assetManifest) {
		const absolutePath = path.join(projectRoot, asset.localPath);
		const fileStats = await stat(absolutePath);
		const objectKey = joinR2Key(options.prefix, asset.r2Key);
		const objectPath = `${options.bucket}/${objectKey}`;

		console.log(`\n${asset.localPath} -> ${objectPath} (${formatBytes(fileStats.size)})`);

		if (options.dryRun) {
			continue;
		}

		await runCommand(
			"bun",
			[
				"x",
				"wrangler",
				"r2",
				"object",
				"put",
				objectPath,
				"--remote",
				"--file",
				absolutePath,
				"--content-type",
				asset.contentType
			],
			projectRoot
		);
	}

	console.log("\nDone.");
}

main().catch((error) => {
	console.error(`\nError: ${error.message}`);
	process.exit(1);
});

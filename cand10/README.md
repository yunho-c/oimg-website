# cand10

Alternative stock-style `shadcn-svelte` landing page for OIMG on SvelteKit and Bun.

## Develop

```sh
bun install
bun run dev
```

## Validate

```sh
bun run check
bun run build
```

## Upload Media To R2

The landing page video is served from `https://media.oimg.org/videos/oimg_demo.mp4`.

Preview the upload plan:

```sh
bun run sync:r2-media -- --dry-run
```

Upload to the default bucket:

```sh
bun run sync:r2-media
```

Upload to a different bucket or prefix:

```sh
bun run sync:r2-media -- --bucket oimg --prefix staging
```

This uses `wrangler r2 object put ... --remote`, so the caller must already be authenticated with Cloudflare and have permission to write to the target bucket.

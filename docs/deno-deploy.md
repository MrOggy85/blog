# Deploying to Deno Deploy

Deployed via [console.deno.com](https://console.deno.com). Entrypoint: `src/main.ts`.

Things that must be right or the deploy fails during the **warmup phase** (Deno
Deploy boots the app and exercises it during the build; if it can't get a
healthy app, it restarts in a loop across regions — ord, ams, … — and reports
"Warm up failed").

## 0. Use Deno.serve

Deno Deploy detects readiness through `Deno.serve`. A server that opens a port
another way (e.g. `Deno.serveHttp` / `Deno.listen`, as oak v12 did) is never
registered as ready, so warmup fails even though the process is listening.
`src/main.ts` uses `Deno.serve`.

## 1. Port

Deno Deploy routes traffic to **port 8000** and does not inject a `PORT`
variable. `src/main.ts` reads `PORT` and falls back to `4444` for local dev:

```ts
const PORT = Number(Deno.env.get('PORT')) || 4444;
```

So set `PORT=8000` in the project's environment variables. Without it the app
binds 4444, which the platform never probes.

## 2. Working directory

Locally the app runs with `Deno.cwd()` at the repo root. On Deno Deploy the cwd
is the entrypoint's directory (`/app/src`), so any `Deno.cwd()`-relative path
breaks. All file reads (markdown posts, `index.html`, `static/`) are anchored to
the `src/` module directory instead, via `import.meta.dirname` in
`src/constants.ts`:

```ts
export const CWD = import.meta.dirname ?? './src';
```

Do not reintroduce cwd-relative paths (e.g. `'./src'`) — they only work when the
process happens to start from the repo root.

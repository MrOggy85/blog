# CLAUDE.md

Personal blog. Deno std lib only (`Deno.serve` + `serveDir`), markdown posts
rendered to HTML. No web framework.

## Layout

- `markdown/<slug>.md` — one file per post. The **filename is the slug** (the
  `slug:` frontmatter field is ignored, see `src/getContent.ts`).
- `static/` — assets (`img/`, `gifs/`, css). Served from the URL root.
- `src/` — server. `main.ts` (`Deno.serve`) → `server.ts` (static + router) →
  `route.ts` (handlers return `Response`) → `getContent.ts`.

## Post frontmatter

```md
---
title: ...
description: ...
slug: ...
date: DD/MM/YYYY   # sort order on the index; parsed as dd/MM/yyyy
img: img/foo.png   # path under static/
alt: ...
width: 1280
height: 720
---
```

## Commands (see `Makefile`)

- `make -C . run` — dev server, port 4444 (override with `PORT`), `--watch`.
- `make -C . cache-deps` — cache deps; needs network to npmjs.org, jsr.io, deno.land.
- `make -C . check-all` — format + lint + typecheck.

## Gotchas

- File reads anchor to the `src/` dir via `import.meta.dirname` (`src/constants.ts`),
  not `Deno.cwd()` — don't reintroduce cwd-relative paths.
- Deploy: see `docs/deno-deploy.md` (needs `PORT=8000`).

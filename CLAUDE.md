# CLAUDE.md

Personal blog. Deno std lib only (`Deno.serve` + `serveDir`), markdown posts
rendered to HTML. No web framework.

## Layout

- `markdown/<slug>.md` — one file per post. The **filename is the slug** (the
  `slug:` frontmatter field is ignored, see `src/getContent.ts`).
- `static/` — assets (`img/`, `gifs/`, `thumbs/`, `blog.css`). Served from the URL root.
  The whole look is `static/blog.css` (Kotoba's palette); it re-points the inline
  GitHub-markdown CSS variables rather than overriding its rules.
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

## Cover images (Oskar, 2026-11-16)

**Landscape 16:9** — e.g. 1280×720. The model covers are
`evolution-of-frontend-devs` (880×495) and `private-npm-registry-with-verdaccio-2-2`
(500×274): those proportions suit both the index card and the post page. Older
posts with square or portrait covers stay as they are. Keep it a JPEG or WebP
under ~300 KB; a 2.5 MB PNG is what made the index slow.

After adding or changing a cover, run `scripts/make-thumbs.sh` (ImageMagick;
`CONVERT="tk convert"` on odin) and commit `static/thumbs/<slug>.webp` — the index
shows the thumb, falling back to the full cover if there is none.

## Commands (see `Makefile`)

- `make -C . run` — dev server, port 4444 (override with `PORT`), `--watch`.
- `make -C . cache-deps` — cache deps; needs network to npmjs.org, jsr.io, deno.land.
- `make -C . check-all` — format + lint + typecheck.

## Gotchas

- File reads anchor to the `src/` dir via `import.meta.dirname` (`src/constants.ts`),
  not `Deno.cwd()` — don't reintroduce cwd-relative paths.
- Deploy: **Cloudflare Workers, static assets** (since 2026-11-18). `cloudflare/wr build`
  renders everything into `dist/` with `scripts/prerender.ts`, which calls the handlers in
  `src/route.ts` — so `make run` and the deployed site come from the same code. Then
  `cloudflare/wr deploy`. A new route in `server.ts` must be added to the prerender too, or
  it exists only locally. `docs/deno-deploy.md` is the old Deno Deploy setup.

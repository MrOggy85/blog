// Renders the whole blog to static files in dist/, for Cloudflare Workers static assets
// (cloudflare/README.md). Uses the server's own handlers in src/route.ts, so the output is
// byte for byte what the Deno server answers; nothing about rendering lives here.
//
//   deno run --allow-read --allow-write=dist --allow-env --allow-net scripts/prerender.ts
//
// URL shapes kept: /<slug> is dist/<slug>.html (served without a redirect), and the feeds
// /rss, /atom, /json are extensionless files whose types come from dist/_headers.
import { getAll, getAtom, getJson, getPost, getRss } from '../src/route.ts';

const ROOT = new URL('../', import.meta.url).pathname;
const DIST = `${ROOT}dist`;

async function write(name: string, res: Response) {
	if (res.status !== 200) throw new Error(`${name}: HTTP ${res.status}`);
	await Deno.writeFile(`${DIST}/${name}`, new Uint8Array(await res.arrayBuffer()));
}

async function copyDir(from: string, to: string) {
	await Deno.mkdir(to, { recursive: true });
	for await (const e of Deno.readDir(from)) {
		if (e.isDirectory) await copyDir(`${from}/${e.name}`, `${to}/${e.name}`);
		else if (e.isFile) await Deno.copyFile(`${from}/${e.name}`, `${to}/${e.name}`);
	}
}

await Deno.remove(DIST, { recursive: true }).catch(() => {});
await copyDir(`${ROOT}static`, DIST);

await write('index.html', await getAll());
let posts = 0;
for await (const e of Deno.readDir(`${ROOT}markdown`)) {
	if (!e.name.endsWith('.md')) continue;
	const slug = e.name.slice(0, -3);
	await write(`${slug}.html`, await getPost(slug));
	posts++;
}
await write('rss', await getRss());
await write('atom', await getAtom());
await write('json', await getJson());

// Workers static assets types a file by its extension; the feeds have none.
// Images and gifs keep the week of caching the Deno server gave static files.
await Deno.writeTextFile(
	`${DIST}/_headers`,
	`/rss
  Content-Type: application/rss+xml; charset=utf-8
/atom
  Content-Type: application/xml; charset=utf-8
/json
  Content-Type: application/json
/img/*
  Cache-Control: max-age=604800
/gifs/*
  Cache-Control: max-age=604800
/thumbs/*
  Cache-Control: max-age=604800
`,
);
console.log(`dist/: index, ${posts} posts, 3 feeds, static/`);

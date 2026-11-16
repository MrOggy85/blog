import { CWD } from './constants.ts';
import {
	Feed,
	GitHub_Flavored_Markdown_CSS,
	htmlEscape,
	parse,
} from './deps.ts';
import getContent from './getContent.ts';
import { render } from './gfm/render.ts';

const MARKDOWN_CSS_PLACEHOLDER = '/* %CSS% */';
const BODY_PLACEHOLDER = '%body%';

async function getHtml(body: string) {
	const data = await Deno.readFile(`${CWD}/../index.html`);
	const html = new TextDecoder('utf-8').decode(data);

	return html
		.replace(MARKDOWN_CSS_PLACEHOLDER, GitHub_Flavored_Markdown_CSS)
		.replace(BODY_PLACEHOLDER, body);
}

/** Kotoba's two ridges, squashed to a strip along the bottom of each card. */
const RIDGE =
	`<svg class="card-ridge" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
<path class="far" d="M0 40 L0 22 L46 12 L92 24 L133 6 L186 20 L233 2 L288 18 L332 9 L400 22 L400 40 Z" />
<path class="near" d="M0 40 L0 32 L58 24 L104 33 L152 18 L211 30 L262 16 L318 28 L360 21 L400 32 L400 40 Z" />
</svg>`;

/** YYYY-MM-DD, from the frontmatter's dd/MM/yyyy. */
function isoDate(date: Date) {
	const pad = (n: number) => String(n).padStart(2, '0');
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${
		pad(date.getDate())
	}`;
}

function htmlResponse(html: string) {
	return new Response(html, {
		headers: { 'content-type': 'text/html' },
	});
}

export async function getAll(): Promise<Response> {
	const posts: { html: string; date: Date }[] = [];
	for await (const dirEntry of Deno.readDir(`${CWD}/../markdown`)) {
		const content = await getContent(dirEntry.name);
		const date = parse(content.date, 'dd/MM/yyyy');
		const html = `
<li>
	<a class="card" href="${content.slug}">
		<img src="${content.img}" alt="${
			htmlEscape(content.alt ?? '')
		}" loading="lazy" />
		${RIDGE}
		<span class="card-text">
			<time class="card-date mono" datetime="${isoDate(date)}">${
			isoDate(date)
		}</time>
			<span class="card-title">${htmlEscape(content.title)}</span>
			<span class="card-desc">${htmlEscape(content.description ?? '')}</span>
		</span>
	</a>
</li>`;

		posts.push({ html, date });
	}

	const ordered = posts.sort((a, b) => {
		return b.date.getTime() - a.date.getTime();
	});

	const body = `
<header class="masthead">
	<h1><a href="">Oskar Okuno's Blog</a></h1>
	<p class="dim">${ordered.length} posts</p>
</header>
<ul class="posts stagger">${ordered.map((x) => x.html).join('')}</ul>`;

	const html = await getHtml(body);

	return htmlResponse(html);
}

export async function getPost(title: string): Promise<Response> {
	const content = await getContent(`${title}.md`);
	const date = parse(content.date, 'dd/MM/yyyy');
	const head = `
<header class="post-head">
	<a class="back" href="./">← Oskar Okuno's Blog</a>
	<h1>${htmlEscape(content.title)}</h1>
	<p class="lede">${htmlEscape(content.description ?? '')}</p>
	<time class="faint mono" datetime="${isoDate(date)}">${isoDate(date)}</time>
	<img class="hero" src="${content.img}" alt="${
		htmlEscape(content.alt ?? '')
	}"${content.width ? ` width="${content.width}"` : ''}${
		content.height ? ` height="${content.height}"` : ''
	} />
</header>`;

	const body = `${head}<article>${render(content.content, {})}</article>`;
	const html = await getHtml(body);

	return htmlResponse(html);
}

type Content = Awaited<ReturnType<typeof getContent>>;

async function getFeed() {
	const feed = new Feed({
		title: 'Oskar Okuno Blog',
		id: 'https://okuno.se/blog/',
		description:
			'Oskar Okuno is a Fullstack Dev experienced with React, React Native, Vue. As a Fullstack Dev he also uses Node.js, Go, Java and C#.',
		link: 'https://okuno.se/blog/',
		copyright: '2022 Oskar Okuno',
		language: 'en',
		favicon: 'https://okuno.se/blog/favicon.ico',
		ttl: 60,
		author: {
			name: 'Oskar Okuno',
			email: 'johndoe@example.com',
			link: 'https://okuno.se',
		},
		feedLinks: {
			json: 'https://okuno.se/blog/json',
			atom: 'https://okuno.se/blog/atom',
			rss: 'https://okuno.se/blog/rss',
		},
	});

	const contentsUnsorted: { content: Content; date: Date }[] = [];
	for await (const dirEntry of Deno.readDir(`${CWD}/../markdown`)) {
		const content = await getContent(dirEntry.name);
		const date = parse(content.date, 'dd/MM/yyyy');
		contentsUnsorted.push({ content, date });
	}

	const contentsSorted = contentsUnsorted.sort((a, b) => {
		return b.date.getTime() - a.date.getTime();
	});

	contentsSorted.forEach((x) => {
		feed.addItem({
			id: `https://okuno.se/blog/${x.content.slug}`,
			title: x.content.title,
			description: x.content.description,
			content: render(x.content.content),
			link: `https://okuno.se/blog/${x.content.slug}`,
			date: x.date,
			image: `https://okuno.se/blog/${x.content.img}`,
		});
	});

	return feed;
}

export async function getRss(): Promise<Response> {
	const feed = await getFeed();
	return new Response(feed.rss2(), {
		headers: { 'content-type': 'application/rss+xml; charset=utf-8' },
	});
}

export async function getAtom(): Promise<Response> {
	const feed = await getFeed();
	return new Response(feed.atom1(), {
		headers: { 'content-type': 'application/xml; charset=utf-8' },
	});
}

export async function getJson(): Promise<Response> {
	const feed = await getFeed();
	return new Response(feed.json1(), {
		headers: { 'content-type': 'application/json' },
	});
}

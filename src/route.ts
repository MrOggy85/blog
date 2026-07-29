import { CWD } from './constants.ts';
import { Feed, GitHub_Flavored_Markdown_CSS, parse } from './deps.ts';
import getContent from './getContent.ts';
import { render } from './gfm/render.ts';

const MARKDOWN_CSS_PLACEHOLDER = '/* %CSS% */';
const BODY_PLACEHOLDER = '%body%';
const CSS_FILE_PLACEHOLDER = '%CSS_FILE%';

async function getHtml(body: string, cssFile: string) {
	const data = await Deno.readFile(`${CWD}/../index.html`);
	const html = new TextDecoder('utf-8').decode(data);

	return html
		.replace(MARKDOWN_CSS_PLACEHOLDER, GitHub_Flavored_Markdown_CSS)
		.replace(BODY_PLACEHOLDER, body)
		.replace(CSS_FILE_PLACEHOLDER, cssFile);
}

function getTitleHtml() {
	return `
<h1 style="font-size:4em;"><a href="">Oskar Okuno's Blog</a></h1>
`;
}

function htmlResponse(html: string) {
	return new Response(html, {
		headers: { 'content-type': 'text/html' },
	});
}

export async function getAll(): Promise<Response> {
	const posts: { markdown: string; date: Date }[] = [];
	for await (const dirEntry of Deno.readDir(`${CWD}/../markdown`)) {
		const content = await getContent(dirEntry.name);
		const markdown = `
## [<img src="${content.img}" alt="${content.alt}" /> ${content.title}](${content.slug})

### ${content.description}
`;

		const date = parse(content.date, 'dd/MM/yyyy');

		posts.push({ markdown, date });
	}

	const ordered = posts.sort((a, b) => {
		return b.date.getTime() - a.date.getTime();
	});

	const contentMarkdown = ordered.map((x) => x.markdown).join('');

	const body = `${getTitleHtml()}` +
		`${render(`${contentMarkdown}`, {})}`;

	const html = await getHtml(`<div class="main">${body}</div>`, 'main.css');

	return htmlResponse(html);
}

export async function getPost(title: string): Promise<Response> {
	const content = await getContent(`${title}.md`);
	const titleMarkdown = `
  <header><a href="./">Oskar Okuno's Blog</a></header>
  `;
	const headerMarkdown = `
# ${content.title}
<p class="date">${content.date}</p>

${content.description}

![${content.alt}](${content.img})
  `;

	const body = render(
		`${titleMarkdown} ${headerMarkdown} ${content.content}`,
		{},
	);
	const html = await getHtml(`<div>${body}</div>`, 'post.css');

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

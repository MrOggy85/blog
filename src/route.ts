import { CWD } from './constants.ts';
import {
	Context,
	Feed,
	GitHub_Flavored_Markdown_CSS,
	parse,
	Router,
	RouterContext,
} from './deps.ts';
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

async function getAll(ctx: Context) {
	const hej: { markdown: string; date: Date }[] = [];
	for await (const dirEntry of Deno.readDir(`${CWD}/../markdown`)) {
		const content = await getContent(dirEntry.name);
		const markdown = `
## [<img src="${content.img}" alt="${content.alt}" /> ${content.title}](${content.slug})

### ${content.description}
`;

		const date = parse(content.date, 'dd/MM/yyyy');

		hej.push({ markdown, date });
	}

	const hejOrdered = hej.sort((a, b) => {
		return b.date.getTime() - a.date.getTime();
	});

	const contentMarkdown = hejOrdered.map((x) => x.markdown).join('');

	const titleHtml = getTitleHtml();
	const body = `${titleHtml}` +
		`${render(`${contentMarkdown}`, {})}`;

	const html = await getHtml(`<div class="main">${body}</div>`, 'main.css');

	ctx.response.headers.set('content-type', 'text/html');
	ctx.response.body = html;
}

type GetByIdContext = RouterContext<'/:title', { title: string }>;
async function getPost(ctx: GetByIdContext) {
	const title = ctx.params.title;

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

	ctx.response.headers.set('content-type', 'text/html');
	ctx.response.body = html;
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

async function getRss(ctx: Context) {
	const feed = await getFeed();

	ctx.response.headers.set(
		'content-type',
		'application/rss+xml; charset=utf-8',
	);
	ctx.response.body = feed.rss2();
}

async function getAtom(ctx: Context) {
	const feed = await getFeed();

	ctx.response.headers.set('content-type', 'application/xml; charset=utf-8');
	ctx.response.body = feed.atom1();
}

async function getJson(ctx: Context) {
	const feed = await getFeed();

	ctx.response.headers.set('content-type', 'application/json');
	ctx.response.body = feed.json1();
}

function init(router: Router) {
	router
		.get('/', getAll)
		.get('/rss', getRss)
		.get('/atom', getAtom)
		.get('/json', getJson)
		.get('/:title', getPost);
}

export default init;

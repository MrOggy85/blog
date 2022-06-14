import { Context, Router, RouterContext, CSS, render, parse } from "./deps.ts";
import getContent from "./getContent.ts";

const ROUTE = "/";

const CSS_PLACEHOLDER = '/* %CSS% */';
const BODY_PLACEHOLDER = '%body%';

function getHtml(body: string) {
  const path = `./index.html`;
  const decoder = new TextDecoder("utf-8");
  const data = Deno.readFileSync(path);
  const html = decoder.decode(data);

  return html.replace(CSS_PLACEHOLDER, CSS).replace(BODY_PLACEHOLDER, body);
}

function getTitleMarkdown(ctx: Context) {
  const url = ctx.request.url;
  const baseUrl = `${url.protocol}//${url.host}`;
  const titleMarkdown = `
<h1 style="font-size:4em;"><a href="${baseUrl}/">Oskar Okuno's Blog</a></h1>
`;

  return titleMarkdown;
}

async function getAll(ctx: Context) {
  const url = ctx.request.url;
  const baseUrl = `${url.protocol}//${url.host}`;



  const hej: { markdown: string; date: Date; }[] = [];
  for await (const dirEntry of Deno.readDir("./markdown")) {
    const content = getContent(dirEntry.name);
    const markdown = `
## [${content.title}](${baseUrl}/${content.slug})

${content.description}
`;

    const date = parse(content.date, 'dd/MM/yyyy');

    hej.push({ markdown, date });
  }

  const hejOrdered = hej.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  const contentMarkdown = hejOrdered.map(x => x.markdown).join('');

  const titleMarkdown = getTitleMarkdown(ctx);
  const body =
    `${titleMarkdown}` +
    `${render(`${contentMarkdown}`, {})}`;
  const html = getHtml(body);

  ctx.response.headers.set('content-type', 'text/html');
  ctx.response.body = html;
}

type GetByIdContext = RouterContext<"/:title", { title: string; }>;
function getPost(ctx: GetByIdContext) {
  const title = ctx.params.title;

  const content = getContent(`${title}.md`);
  const url = ctx.request.url;
  const baseUrl = `${url.protocol}//${url.host}`;

  const titleMarkdown = `
  <header><a href="${baseUrl}/">Oskar Okuno's Blog</a></header>
  `;
  const headerMarkdown = `
# ${content.title}
<p class="date">${content.date}</p>

${content.description}

![${content.alt}](${content.img})
  `;

  const body = render(`${titleMarkdown} ${headerMarkdown} ${content.content}`, {});
  const html = getHtml(body);

  ctx.response.headers.set('content-type', 'text/html');
  ctx.response.body = html;
}

function init(router: Router) {
  router
    .get(ROUTE, getAll)
    .get(`${ROUTE}:title`, getPost);
}

export default init;

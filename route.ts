import { Context, CSS, parse, render, Router, RouterContext } from "./deps.ts";
import getContent from "./getContent.ts";

const BASE_URL = Deno.env.get("BASE_URL") || "/";
console.log("BASE_URL", BASE_URL);

const CSS_PLACEHOLDER = "/* %CSS% */";
const BODY_PLACEHOLDER = "%body%";
// const BASE_URL_PLACEHOLDER = "%base_url%";

async function getHtml(body: string) {
  const path = `./index.html`;
  const decoder = new TextDecoder("utf-8");
  const data = await Deno.readFile(path);
  const html = decoder.decode(data);

  return html
    .replace(CSS_PLACEHOLDER, CSS)
    .replace(BODY_PLACEHOLDER, body);
  // .replaceAll(BASE_URL_PLACEHOLDER, BASE_URL);
}

function getTitleMarkdown(ctx: Context) {
  const titleMarkdown = `
<h1 style="font-size:4em;"><a href="${BASE_URL}">Oskar Okuno's Blog</a></h1>
`;

  return titleMarkdown;
}

async function getAll(ctx: Context) {
  // const baseUrl = `${BASE_URL}`;

  const hej: { markdown: string; date: Date; }[] = [];
  for await (const dirEntry of Deno.readDir("./markdown")) {
    const content = await getContent(dirEntry.name);
    const markdown = `
## [${content.title}](${content.slug})

${content.description}
`;

    const date = parse(content.date, "dd/MM/yyyy");

    hej.push({ markdown, date });
  }

  const hejOrdered = hej.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  const contentMarkdown = hejOrdered.map((x) => x.markdown).join("");

  const titleMarkdown = getTitleMarkdown(ctx);
  const body = `${titleMarkdown}` +
    `${render(`${contentMarkdown}`, {})}`;
  const html = await getHtml(body);

  ctx.response.headers.set("content-type", "text/html");
  ctx.response.body = html;
}

type GetByIdContext = RouterContext<`${string}:title`, { title: string; }>;
async function getPost(ctx: GetByIdContext) {
  const title = ctx.params.title;

  const content = await getContent(`${title}.md`);
  const titleMarkdown = `
  <header><a href="${BASE_URL}">Oskar Okuno's Blog</a></header>
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
  const html = await getHtml(body);

  ctx.response.headers.set("content-type", "text/html");
  ctx.response.body = html;
}

function init(router: Router) {
  router
    .get(BASE_URL, getAll)
    .get(`${BASE_URL}:title`, getPost);
}

export default init;

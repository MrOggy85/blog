import { Context, CSS, parse, render, Router, RouterContext } from "./deps.ts";
import getContent from "./getContent.ts";

const CSS_PLACEHOLDER = "/* %CSS% */";
const BODY_PLACEHOLDER = "%body%";

async function getHtml(body: string) {
  const path = `./index.html`;
  const decoder = new TextDecoder("utf-8");
  const data = await Deno.readFile(path);
  const html = decoder.decode(data);

  return html
    .replace(CSS_PLACEHOLDER, CSS)
    .replace(BODY_PLACEHOLDER, body);
}

function getTitleHtml() {
  return `
<h1 style="font-size:4em;"><a href="">Oskar Okuno's Blog</a></h1>
`;
}

async function getAll(ctx: Context) {
  const hej: { markdown: string; date: Date }[] = [];
  for await (const dirEntry of Deno.readDir("./markdown")) {
    const content = await getContent(dirEntry.name);
    const markdown = `
## [${content.title}](${content.slug})

### ${content.description}
`;

    const date = parse(content.date, "dd/MM/yyyy");

    hej.push({ markdown, date });
  }

  const hejOrdered = hej.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  const contentMarkdown = hejOrdered.map((x) => x.markdown).join("");

  const titleHtml = getTitleHtml();
  const body = `${titleHtml}` +
    `${render(`${contentMarkdown}`, {})}`;
  const html = await getHtml(body);

  ctx.response.headers.set("content-type", "text/html");
  ctx.response.body = html;
}

type GetByIdContext = RouterContext<"/:title", { title: string }>;
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
  const html = await getHtml(body);

  ctx.response.headers.set("content-type", "text/html");
  ctx.response.body = html;
}

function init(router: Router) {
  router
    .get("/", getAll)
    .get("/:title", getPost);
}

export default init;

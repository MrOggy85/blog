import { CWD } from "./constants.ts";
import {
  Context,
  CSS,
  parse,
  render,
  Router,
  RouterContext,
  RSS,
} from "./deps.ts";
import getContent from "./getContent.ts";

const CSS_PLACEHOLDER = "/* %CSS% */";
const BODY_PLACEHOLDER = "%body%";

async function getHtml(body: string) {
  const data = await Deno.readFile(`${CWD}/../index.html`);
  const html = new TextDecoder("utf-8").decode(data);

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
  for await (const dirEntry of Deno.readDir(`${CWD}/../markdown`)) {
    const content = await getContent(dirEntry.name);
    const markdown = `
## [<img src="${content.img}" alt="${content.alt}" /> ${content.title}](${content.slug})

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

  const html = await getHtml(`<div class="main">${body}</div>`);

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
  const html = await getHtml(`<div>${body}</div>`);

  ctx.response.headers.set("content-type", "text/html");
  ctx.response.body = html;
}

type Content = Awaited<ReturnType<typeof getContent>>;

async function getFeed(ctx: Context) {
  const feed = new RSS({
    title: "Oskar Okuno Blog",
    feed_url: "https://example.com/rss.xml",
    site_url: "https://okuno.se/blog/",
    managingEditor: "Oskar Okuno",
    webMaster: "Oskar Okuno",
    copyright: "2022 Oskar Okuno",
    language: "en",
    image_url: "https://okuno.se/blog/favicon.ico",
    ttl: 60,
  });

  const contentsUnsorted: { content: Content; date: Date }[] = [];
  for await (const dirEntry of Deno.readDir(`${CWD}/../markdown`)) {
    const content = await getContent(dirEntry.name);
    const date = parse(content.date, "dd/MM/yyyy");
    contentsUnsorted.push({ content, date });
  }

  const contentsSorted = contentsUnsorted.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  contentsSorted.forEach((x) => {
    feed.item({
      guid: x.content.slug,
      title: x.content.title,
      description: x.content.description,
      url: `https://okuno.se/blog/${x.content.slug}`,
      date: x.content.date,
    });
  });

  const xml = feed.xml({ indent: true });

  ctx.response.headers.set("content-type", "application/rss+xml");
  ctx.response.body = xml;
}

function init(router: Router) {
  router
    .get("/", getAll)
    .get("/rss.xml", getFeed)
    .get("/:title", getPost);
}

export default init;

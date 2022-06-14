type Content = {
  title: string;
  description: string;
  content: string;
  slug: string;
  img: string;
  alt: string;
  width: string;
  height: string;
  date: string;
};

function getContent(filename: string): Content {
  const path = `./markdown/${filename}`;
  const decoder = new TextDecoder("utf-8");
  const data = Deno.readFileSync(path);
  const markdown = decoder.decode(data);
  const [_, metadataRaw, content] = markdown.split('---');

  const rows = metadataRaw.split('\n');
  const metadata: Record<string, string> = {};
  rows.forEach(x => {
    const [key, value] = x.split(':');
    if (key && value) {
      metadata[key] = value.trim();
    }
  });

  return {
    title: metadata['title'],
    description: metadata['description'],
    img: metadata['img'],
    alt: metadata['alt'],
    width: metadata['width'],
    height: metadata['height'],
    date: metadata['date'],
    content,
    slug: filename.split('.md')[0],
  };
}

export default getContent;

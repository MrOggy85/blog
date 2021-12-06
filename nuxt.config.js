import path from 'path';
import fs from 'fs';

let posts = [];

const constructFeedItem = async (post, dir, hostname) => {
  // note the path used here, we are using a dummy page with an empty layout in order to not send that data along with our other content
  const filePath = path.join(__dirname, `dist/${post.slug}/index.html`);
  const content = await fs.promises.readFile(filePath, 'utf8');
  const url = `${hostname}/${dir}/${post.slug}`;
  return {
    title: post.title,
    id: url,
    link: url,
    description: post.description,
    content,
  };
};

const create = async (feed, args) => {
  const [filePath, ext] = args;
  const hostname =
    process.NODE_ENV === 'production'
      ? 'https://oskarlindgren.se/blog'
      : 'http://localhost:3000/blog';
  feed.options = {
    title: 'My Blog',
    description: /Blog Stuff!/,
    link: `${hostname}/feed.${ext}`,
  };
  const { $content } = require('@nuxt/content');
  if (posts === null || posts.length === 0) {
    posts = await $content('articles').fetch();
  }
  for (const post of posts) {
    const feedItem = await constructFeedItem(post, filePath, hostname);
    feed.addItem(feedItem);
  }
  return feed;
};

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Oskar Lindgren's Blog",
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Oskar Lindgren Tech Blog FullStack Dev',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'style.css',
      },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Oskar Lindgren Tech Blog FullStack Dev',
        href: 'https://www.oskarlindgren.se/blog/feed.xml',
      },
    ],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  // plugins: ['@/plugins/antd-ui'],
  plugin: ['prism'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/feed',
  ],

  feed: [
    {
      path: '/feed.xml',
      create,
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
      data: ['blog', 'xml'],
    },
  ],

  render: {
    injectScripts: false,
  },

  router: {
    base: '/blog',
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css',
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, _ctx) {
      // ... other code ...
      // add frontmatter-markdown-loader
      config.module.rules.push({
        test: /\.md$/,
        include: path.resolve(__dirname, 'content'),
        loader: 'frontmatter-markdown-loader',
      });
    },
  },
};

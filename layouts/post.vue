<template>
  <div class="post-wrapper">
    <div class="inner">
      <Nuxt />
    </div>
    <footer>
      <a href="http://localhost:3000/blog/feed/articles/rss.xml" style="display:flex;"><img src="rss-icon.png" alt="rss" width="20" height="20" /> <p>RSS</p></a>
    </footer>
  </div>
</template>

<style>
.post-wrapper h1 {
  font-size: 3.5rem;
  font-weight: 600;
  line-height: 1.15;
  text-rendering: optimizeLegibility;
  word-break: break-word;
}

.post-wrapper p {
  margin-bottom: 20px;
  min-width: 100%;
}
.post-wrapper p,
.post-wrapper li,
.post-wrapper code {
  font-size: 20px;
}

.post-wrapper img {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: block;
}

.post-wrapper footer img {
  width: 20px;
  height: 20px;
}


.post-wrapper footer p {
  margin-top: 0;
  font-size: 18px;
  overflow: hidden;
  line-height: 1em;
  max-height: 2em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.post-wrapper blockquote {
  margin: 0 0 1.5em;
  padding: 0 1.5em;
  border-left: 3px solid #3eb0ef;
}
.post-wrapper blockquote em {
  color: #fff;
}
.post-wrapper figcaption {
  margin: 0 auto;
  color: hsla(0, 0%, 100%, 0.6);
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;
  font-size: 65%;
  line-height: 1.5em;
  text-align: center;
  max-width: 1040px;
}

.post-wrapper {
  padding: 15px;
}

@media (min-width: 400px) {
  .post-wrapper .inner {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
}
</style>

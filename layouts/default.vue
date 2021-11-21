<template>
  <div class="blog-wrapper">
    <div class="inner">
      <h1>Blog</h1>
      <h2>Oskar Lindgren</h2>
      <Nuxt />
    </div>
    <footer>
      <a href="http://localhost:3000/blog/feed/articles/rss.xml" style="display:flex;"><img src="rss-icon.png" alt="rss" width="20" height="20" /> <p>RSS</p></a>
    </footer>
  </div>
</template>

<style>
.blog-wrapper {
  /* margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center; */
  padding: 15px;
}
.blog-wrapper .inner {
  text-align: center;
}

.blog-wrapper h1,
.blog-wrapper h2 {
  margin: 0;
}

.blog-wrapper ul {
  padding: 0;
}
.blog-wrapper li {
  list-style-type: none;
}
.blog-wrapper p {
  margin-top: 0;
  font-size: 18px;
  overflow: hidden;
  line-height: 1em;
  max-height: 2em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  /* line-height: 25px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; */
}

@media (min-width: 400px) {
  .blog-wrapper .inner {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
}
</style>

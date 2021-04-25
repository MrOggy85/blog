<template>
  <div class="post-wrapper">
    <div class="inner">
      <Nuxt />
    </div>
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
  /* margin-bottom: 20px; */
  margin: 0 auto;
  display: block;
}
/* .hej {
  margin-left: auto;
    margin-right: auto;
    display: block;
} */

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
  /* margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center; */
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

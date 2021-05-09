<template>
  <article class="blog-post">
    <h1>{{ article.title }}</h1>
    <p class="date">{{ article.date }}</p>
    <p>{{ article.description }}</p>
    <img
      :src="article.img"
      :alt="article.alt"
      :width="article.width"
      :height="article.height"
    />
    <nuxt-content :document="article" />
  </article>
</template>

<script>
export default {
  layout: 'post',
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  },
}
</script>

<style scoped>
.blog-post h1 {
  margin: 0;
}
.date {
  margin-top: 0;
}
</style>

<template>
  <article>
    <h1>{{ article.title }}</h1>
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

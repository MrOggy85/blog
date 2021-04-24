<template>
  <ul>
    <li v-for="post in posts" :key="post.attributes.title">
      <nuxt-link :to="post.attributes.slug">
        {{ post.attributes.title }}
      </nuxt-link>
      <p>{{ post.attributes.description }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  async asyncData() {
    const resolve = await require.context('~/content/articles/', true, /\.md$/)
    const imports = resolve.keys().map((key) => resolve(key))
    // sort by date
    // imports.sort((a, b) =>
    //   moment(b.attributes.date, 'DD/MM/YYYY').diff(moment(a.attributes.date, 'DD/MM/YYYY'))
    // )
    return { posts: imports }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  text-align: center;
}
</style>

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
import { DateTime } from 'luxon';

export default {
  async asyncData() {
    const resolve = await require.context('~/content/articles/', true, /\.md$/)
    const posts = resolve
      .keys()
      .map((key) => resolve(key))
      .sort((a, b) => {
        return DateTime.fromFormat(b.attributes.date, 'dd/mm/yyyy').diff(DateTime.fromFormat(a.attributes.date, 'dd/mm/yyyy'))
      });

    return { posts }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>

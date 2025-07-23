<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('legal').path(route.path).first()
})
if (!page.value)
  throw createError({ statusCode: 404, statusMessage: 'Not found' })

route.meta.title = page.value.title
</script>

<template>
  <Header show-back-link size="medium" class="-mb-4!" :title="page.title" />

  <article class="prose prose-invert text-lithium-white leading-relaxed">
    <ContentRenderer :value="page.body" />
  </article>

  <span class="mt-6! mb-6" v-if="page?.lastUpdated"
    >Last updated on: {{ page.lastUpdated }}</span
  >
</template>

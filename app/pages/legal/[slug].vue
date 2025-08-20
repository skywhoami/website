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
  <Header show-back-link size="medium" :title="page.title" class="-mb-4!">
    <template #subtitle>
      <p v-if="page?.lastUpdated">
        Last updated on: {{ page.lastUpdated }}
      </p></template
    >
  </Header>

  <article class="prose prose-invert text-lithium-white leading-relaxed">
    <ContentRenderer :value="page.body" />
  </article>
</template>

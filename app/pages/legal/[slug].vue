<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData(route.path, () => {
  return queryCollection('legal').path(route.path).first()
})
if (!data.value)
  throw createError({ statusCode: 404, statusMessage: 'Not found' })

useHead({
  title: data.value.title || 'Legal'
})
</script>

<template>
  <Header show-back-link size="medium" class="-mb-4!" :title="data.title" />

  <article class="prose prose-invert text-true-white leading-relaxed">
    <ContentRenderer :value="data.body" />
  </article>

  <span class="mt-6! mb-6">Last updated on: {{ data.lastUpdated }}</span>

  <Footer />
</template>

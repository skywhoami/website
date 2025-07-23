<script setup>
const route = useRoute()

useHead({
  title: () => route.meta.title || '',
  titleTemplate: title => (title ? `${title} · skylar.sh` : "sky's site"),
  link: [
    {
      rel: 'canonical',
      href: `https://skylar.sh${route.fullPath}`
    }
  ],
  meta: () => [
    {
      property: 'og:image',
      content: '/__og-image__/static/og.png',
      key: 'og:image'
    },
    { property: 'og:url', content: `https://skylar.sh${route.fullPath}` },
    { property: 'og:title', content: route.meta.title || 'Skylar' },
    {
      property: 'og:description',
      content: route.meta.description || "Skylar's home on the webs"
    },
    {
      name: 'description',
      content: route.meta.description || "Skylar's home on the webs"
    }
  ]
})

defineOgImageComponent('Default', {
  title: 'skylar.sh',
  description: route.meta.description
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

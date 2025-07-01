<script setup>
useHead({
  titleTemplate: title => (title ? `${title} · skylar.sh` : "sky's site"),
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Skylar',
        alternateName: 'skywhoami',
        description: 'Software Developer',
        url: 'https://skylar.sh',
        sameAs: ['https://github.com/skywhoami']
      })
    }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

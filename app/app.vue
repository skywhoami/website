<script setup>
useHead({
  titleTemplate: title => (title ? `${title} · diogo.wtf` : "diogo's site"),
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Diogo Castro',
        alternateName: 'st6rdustx',
        description: 'Software Developer',
        url: 'https://diogo.wtf',
        sameAs: ['https://github.com/st6rdustx']
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

<script setup>
useHead({
  titleTemplate: title => title ? `${ title } · star` : 'star\'s site',
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Skylar',
        alternateName: 'star',
        description: 'Software Developer',
        url: 'https://skylar.sh',
        sameAs: [ 'https://github.com/skywhoami' ]
      })
    }
  ]
});
</script>

<template>
<NuxtLayout>
  <NuxtPage/>
</NuxtLayout>
</template>

<script setup lang="ts">
const quotes404 = [
  'this page got lost in the void.',
  '404? more like 4-oops.',
  "the meows couldn't find what you're looking for.",
  "it's not you. it's the URL.",
  '404. a digital ghost town.',
  'oops. this page went to take a nap.'
]
const quote404 = quotes404[Math.floor(Math.random() * quotes404.length)]

const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <NuxtLayout>
    <Header size="large" :title="error.statusCode" class="text-center" />
    <section class="mb-12 text-center text-base text-zinc-400 md:text-lg">
      <p class="mb-4 italic">
        {{
          error.statusCode === 404
            ? quote404
            : "well that wasn't supposed to happen"
        }}
      </p>
      <BaseLink
        to="/"
        class="inline-block rounded-xl border border-zinc-800 bg-zinc-950 px-6 py-4 text-lg font-semibold text-white transition hover:bg-zinc-900"
      >
        go back home
      </BaseLink>
    </section>

    <Footer />
  </NuxtLayout>
</template>

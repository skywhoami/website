<script setup lang="ts">
import type { NuxtError } from '#app'

const quotes404 = [
  'this page got lost in the void.',
  '404? more like 4-oops.',
  "the meows couldn't find what you're looking for.",
  "it's not you. it's the URL.",
  '404. a digital ghost town.',
  'oops. this page went to take a nap.'
]
const quote404 = quotes404[Math.floor(Math.random() * quotes404.length)]

const props = defineProps<{
  error: NuxtError
}>()

defineOgImageComponent('Default', {
  title: error.statusCode.toString(),
  description: error.statusText
})
</script>

<template>
  <NuxtLayout>
    <Header size="large" :title="error.statusCode" class="text-center" />
    <section
      class="text-lithium-white/70 mb-12 text-center text-base md:text-lg"
    >
      <p class="mb-4 italic">
        {{
          error.statusCode === 404
            ? quote404
            : "well that wasn't supposed to happen"
        }}
      </p>
      <BaseLink
        to="/"
        class="border-lithium-white/10 bg-velvet-black text-lithium-white inline-block border px-6 py-4 text-lg font-semibold"
        variant="button"
      >
        ← go back home
      </BaseLink>
    </section>
  </NuxtLayout>
</template>

<script lang="ts" setup>
useHead({
  title: 'domains',
  link: [
    {
      rel: 'canonical',
      href: 'https://skylar.sh/domains'
    }
  ]
})

const {
  data: domainsContent,
  pending,
  error,
  refresh
} = await useFetch('/domains.txt', {
  headers: {
    'Cache-Control': 'no-cache'
  },
  key: 'domains-content-' + Date.now(),
  responseType: 'text'
})

watch(error, (newError: Error) => {
  if (newError) {
    console.error('Error fetching domains.txt, retrying...', newError)
    refresh()
  }
})

const domainsList = computed(() => {
  if (!domainsContent.value) return []
  const content =
    typeof domainsContent.value === 'string'
      ? domainsContent.value
      : String(domainsContent.value)
  return content.trimEnd().split('\n')
})
</script>

<template>
  <Header show-back-link size="medium" title="domain list">
    <template #subtitle>
      <p>
        <BaseLink
          rel="noopener noreferrer"
          target="_blank"
          to="/domains.txt"
          underline
          >raw file
        </BaseLink>
      </p>
      <p>
        inspired by
        <BaseLink class="text-[#c63b65]" underline to="https://erisa.uk/domains"
          >Erisa's /domains</BaseLink
        >
      </p>
    </template>
  </Header>

  <section class="mb-6 space-y-6 text-sm leading-loose md:text-base">
    <div>
      <div
        class="border-lithium-white/10 bg-velvet-black overflow-x-auto rounded-lg border-2 p-4 font-mono text-sm shadow-lg"
      >
        <div v-for="(line, index) in domainsList" :key="index" class="py-1">
          <div v-if="line.startsWith('#')" class="text-zinc-400 italic">
            {{ line }}
          </div>
          <div v-else-if="line.trim() === ''" class="h-2"></div>
          <div v-else class="text-bubblegum font-medium">{{ line }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

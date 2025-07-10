<script lang="ts" setup>
useHead({
  title: 'domains',
  link: [
    {
      rel: 'canonical',
      href: 'https://diogo.wtf/domains'
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
  return content.split('\n')
})
</script>

<template>
  <Header show-back-link size="medium" title="domain list">
    <template #subtitle>
      <div class="space-y-1 text-sm text-zinc-400 md:text-base">
        <div>
          <BaseLink
            class="transition-colors hover:text-white"
            rel="noopener noreferrer"
            target="_blank"
            to="/domains.txt"
            underline
            >raw file
          </BaseLink>
        </div>
      </div>
    </template>
  </Header>

  <section class="mb-16 space-y-6 text-sm leading-loose md:text-base">
    <div>
      <div
        class="overflow-x-auto rounded-lg border-2 border-zinc-800 bg-zinc-950 p-4 font-mono text-sm shadow-lg"
      >
        <div v-for="(line, index) in domainsList" :key="index" class="py-1">
          <div v-if="line.startsWith('#')" class="text-zinc-400 italic">
            {{ line }}
          </div>
          <div v-else-if="line.trim() === ''" class="h-2"></div>
          <div v-else class="text-primary font-medium">{{ line }}</div>
        </div>
      </div>
    </div>
  </section>

  <span class="text-zinc-300"
    >inspired by
    <BaseLink class="text-[#c63b65]" underline to="https://erisa.uk/domains"
      >erisa.uk/domains</BaseLink
    ></span
  >

  <Footer />
</template>

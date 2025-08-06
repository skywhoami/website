<script lang="ts" setup>
definePageMeta({ title: 'guestbook', description: 'say hi' })

const {
  data: entries,
  error,
  status
} = await useLazyFetch('/api/guestbook', { server: false })

// holy, have you ever seen a timeAgo function this overengineered?
const timeAgo = (input: string | number | Date) => {
  let utc: Date

  if (typeof input === 'string') {
    if (/[Z+-]/.test(input)) {
      utc = new Date(input)
    } else {
      utc = new Date(input + 'Z')
    }
  } else {
    utc = new Date(input)
  }

  const diff = Date.now() - utc.getTime()

  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`

  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`

  const months = Math.floor(days / 30)
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`

  const years = Math.floor(months / 12)
  return `${years} year${years === 1 ? '' : 's'} ago`
}
</script>

<template>
  <Header show-back-link size="medium" title="guestbook">
    <template #subtitle>
      <p class="italic">messages from lovely people 💌</p>
      <p>
        inspired by
        <BaseLink
          to="https://sapphic.moe/guestbook"
          class="text-[rgb(245,194,231)]"
          underline
          >Sapphic Angels' /guestbook</BaseLink
        >
      </p>
    </template>
  </Header>

  <section class="mb-8">
    <BaseLink
      to="/guestbook/sign"
      class="border-lithium-white/10 text-md inline-block border px-5 py-3 font-medium"
      variant="button"
    >
      sign the guestbook <span class="font-mono">→</span>
    </BaseLink>
  </section>

  <section class="mb-16 space-y-6 text-sm leading-relaxed md:text-base">
    <p v-if="status !== 'success' && !error" class="text-lithium-white/60">
      loading...
    </p>

    <p v-else-if="error" class="text-cherry-soda">
      something went wrong. try again later :(
    </p>

    <div v-else>
      <p v-if="!entries?.length" class="text-lithium-white/60">
        no entries yet, be the first to say hi!
      </p>

      <div v-else class="space-y-4">
        <div
          v-for="entry in entries"
          :key="entry.id"
          class="border-lithium-white/10 bg-velvet-black rounded-lg border-2 p-4"
        >
          <p class="text-lithium-white mb-1 font-semibold">{{ entry.name }}</p>
          <p class="text-lithium-white whitespace-pre-wrap">
            {{ entry.message }}
          </p>
          <p class="text-lithium-white/50 text-end text-xs">
            {{ timeAgo(entry.created_at) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

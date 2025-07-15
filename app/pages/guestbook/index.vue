<script lang="ts" setup>
const { data: entries, pending, error } = await useFetch('/api/guestbook')

const timeAgo = (input: string | number | Date) => {
  const utc =
    typeof input === 'string' ? new Date(input + 'Z') : new Date(input)
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
      <p class="text-zinc-400 italic">messages from lovely people 💌</p>
    </template>
  </Header>

  <section class="mb-8">
    <BaseLink
      to="/guestbook/sign"
      class="inline-block rounded-md border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-900"
    >
      sign the guestbook →
    </BaseLink>
  </section>

  <section class="mb-16 space-y-6 text-sm leading-relaxed md:text-base">
    <p v-if="pending" class="text-zinc-400">loading...</p>

    <p v-else-if="error" class="text-red-400">
      something went wrong. try again later :(
    </p>

    <div v-else>
      <p v-if="!entries?.length" class="text-zinc-400">
        no entries yet, be the first to say hi!
      </p>

      <div v-else class="space-y-4">
        <div
          v-for="entry in entries"
          :key="entry.id"
          class="rounded-md border border-zinc-800 bg-zinc-950 p-4"
        >
          <p class="mb-1 font-medium text-white">{{ entry.name }}</p>
          <p class="whitespace-pre-wrap text-zinc-300">{{ entry.message }}</p>
          <p class="mt-2 text-xs text-zinc-500">
            {{ timeAgo(entry.created_at) }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</template>

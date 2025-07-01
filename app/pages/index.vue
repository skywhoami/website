<script lang="ts" setup>
const age = Math.floor(
  (Date.now() - new Date('2006-11-28').getTime()) /
    (1000 * 60 * 60 * 24 * 365.25)
)

const socials: {
  name: string
  url?: string
  username?: string
}[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/st6rdustx'
  },
  {
    name: 'Discord',
    url: 'https://discord.com/users/293020630608248832',
    username: 'st6rdustx'
  },
  {
    name: 'Email',
    url: 'mailto:hi@diogo.wtf'
  },
  {
    name: 'Bluesky',
    url: 'https://bsky.app/profile/diogo.wtf'
  },
  {
    name: 'Signal',
    url: 'https://signal.me/#eu/pFCjcZ8ENJmnG2Jf49vhI1MPE_eyU_T5rw4YZ1KWP3uJ8WKykx9Ma6xJHMdkm2Q5',
    username: 'st6rdustx.01'
  }
]

const getDescriptionId = (item: SocialItem) =>
  `desc-${item.name.toLowerCase().replace(/\s+/g, '-')}`

const getDisplayText = (item: SocialItem) => {
  if (item.username || !item.url) {
    return `@${item.username}`
  }
  if (item.url.includes('mailto:')) {
    return item.url.split(':')[1]
  }

  return `@${item.url.split('/').pop()}`
}
</script>

<template>
  <Header size="large" title="diogo">
    <template #subtitle>
      <div class="space-y-1 text-sm text-zinc-400 md:text-base">
        <div>portugal</div>
        <div>{{ age }}yo</div>
        <div>silly wannabe programmer</div>
      </div>
    </template>
  </Header>

  <section class="mb-12 space-y-4 text-sm leading-relaxed md:text-base">
    <p>
      i write spaghetti code, build personal stuff - small, weird and sometimes
      unfinished.
    </p>
    <p>
      →
      <BaseLink class="underline" to="/me">read more about me</BaseLink>
    </p>
  </section>

  <NowPlaying />

  <section aria-labelledby="connect" class="mb-16">
    <div
      id="connect"
      class="mb-6 text-xs tracking-wider text-zinc-400 uppercase"
    >
      where you can find me
    </div>

    <div class="space-y-2">
      <BaseLink
        v-for="social in socials"
        :key="social.name"
        :aria-describedby="getDescriptionId(social)"
        :to="social.url || ''"
        variant="social"
      >
        <div class="flex items-center space-x-4">
          <span class="text-base font-medium">{{ social.name }}</span>
          <span
            :id="getDescriptionId(social)"
            class="font-mono text-sm text-zinc-400"
          >
            {{ getDisplayText(social) }}
          </span>
        </div>
        <div
          aria-hidden="true"
          class="text-zinc-600 transition-colors duration-200 group-hover:text-white"
        >
          →
        </div>
      </BaseLink>
    </div>
  </section>

  <Footer show-navigation />
</template>

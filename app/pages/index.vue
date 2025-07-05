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
    username: 'diogo.06'
  }
]

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
  <Header size="medium" title="diogo 💫" class="mb-2!" />

  <section class="mb-4 space-y-4 text-sm leading-relaxed md:text-base">
    <p>
      hiya! i'm a silly wannabe software developer from portugal. i'm
      {{ age }} years old. currently i mostly make stuff for my own use.
    </p>
    <details class="space-y-4">
      <summary class="hover:cursor-pointer">read more</summary>
      <p>aw, flattered you're actually curious about me.</p>
      <p>
        i started coding when i was 9 (yeah, probably shouldn't have been on the
        internet unsupervised, but here we are).
      </p>
      <p>
        i mostly build weird little things because it's fun and makes me feel
        like something's alive. i like when software has soul.
      </p>
      <p>
        when i'm not coding, i'm probably lost in some deep-dive, tweaking my
        setup for the hundredth time, or just vibing with music and games.
      </p>
      <p class="mb-4">
        if you ever just feel like saying hi, seriously, go for it. links are
        down there.
      </p>
    </details>
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
        :aria-describedby="`desc-${social.name.toLowerCase().replace(/\s+/g, '-')}`"
        :to="social.url || ''"
        variant="social"
      >
        <div class="flex items-center space-x-4">
          <span class="text-base font-medium">{{ social.name }}</span>
          <span
            :id="social.name.toLowerCase().replace(/\s+/g, '-')"
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

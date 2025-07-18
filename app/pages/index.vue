<script lang="ts" setup>
const age = Math.floor(
  (Date.now() - new Date('2006-11-28').getTime()) /
    (1000 * 60 * 60 * 24 * 365.25)
)

const socials: {
  name: string
  url?: string
  username?: string
  icon: string
}[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/skywhoami',
    icon: 'mdi:github'
  },
  {
    name: 'Steam',
    url: 'https://steamcommunity.com/id/skywhoami',
    icon: 'mdi:steam'
  },
  {
    name: 'Signal',
    url: 'https://signal.me/#eu/Ivfw7s4QOC5HiEV1F9etrB3_iZe0k0kiZKHkcEexftl6zGRNaulHRYB1PVCn_l8c',
    username: 'skywhoami.01',
    icon: 'simple-icons:signal'
  },
  {
    name: 'Twitch',
    url: 'https://www.twitch.tv/skywhoami',
    icon: 'mdi:twitch'
  },
  {
    name: 'Bluesky',
    url: 'https://bsky.app/profile/skylar.sh',
    icon: 'tabler:brand-bluesky'
  },
  {
    name: 'Email',
    url: 'mailto:hi@skylar.sh',
    icon: 'mdi:mail-ru'
  }
]

const webring: { name: string; url: string; img: string }[] = [
  { name: 'me', url: '', img: '/buttons/sky.png' },
  { name: 'neru', url: 'https://diogo.wtf', img: '/buttons/neru.png' }
]

const getDisplayText = (item: (typeof socials)[number]) => {
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
  <Header size="medium" title="sky" class="text-purple mb-2!">
    <template #subtitle>
      <p class="italic">she/her</p>
    </template>
  </Header>

  <section class="mb-4 space-y-4 text-sm leading-relaxed md:text-base">
    <p>
      hiya! i'm a silly wannabe software developer. i'm
      {{ age }} years old. currently i mostly make stuff for my own use.
    </p>
    <details class="space-y-2">
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
        dotfiles, or just vibing with music and games.
      </p>
      <p class="mb-4">
        if you ever just feel like saying hi, seriously, go for it. i won't bite
        :3
      </p>
    </details>
  </section>

  <NowPlaying />

  <section aria-labelledby="connect" class="mb-16">
    <div
      id="connect"
      class="text-lithium-white/60 mb-6 text-xs tracking-wider uppercase"
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
          <Icon :name="social.icon" class="text-lemon-drop size-8!" />
          <div class="flex flex-col">
            <span
              class="group-hover:text-purple text-base leading-tight font-medium transition-colors duration-200"
              >{{ social.name }}</span
            >
            <span
              :id="social.name.toLowerCase().replace(/\s+/g, '-')"
              class="text-lithium-white/60 text-sm leading-tight"
            >
              {{ getDisplayText(social) }}
            </span>
          </div>
        </div>
        <div
          aria-hidden="true"
          class="group-hover:text-lithium-white text-zinc-600 transition-colors duration-200"
        >
          →
        </div>
      </BaseLink>
    </div>
  </section>

  <section aria-labelledby="friends">
    <div class="flex flex-wrap justify-center gap-2">
      <BaseLink v-for="friend in webring" :key="friend.name" :to="friend.url">
        <img
          :src="friend.img"
          :alt="friend.name"
          width="88"
          height="31"
          class="pixelated"
        />
      </BaseLink>
    </div>
  </section>
</template>

<style scoped>
.pixelated {
  image-rendering: pixelated;
}
</style>

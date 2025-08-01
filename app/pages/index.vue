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

const getDisplayText = (item: (typeof socials)[number]) => {
  if (item.username || !item.url) {
    return `@${item.username}`
  }
  if (item.url.includes('mailto:')) {
    return item.url.split(':')[1]
  }

  return `@${item.url.split('/').pop()}`
}

const { data: github } = await useGitHubUser('skywhoami')

function centsToDollars(
  cents: number,
  locale = 'en-US',
  currency = 'USD'
): string {
  const dollars = cents / 100
  return dollars.toLocaleString(locale, {
    style: 'currency',
    currency
  })
}
</script>

<template>
  <Header
    size="medium"
    :title="`hii, i'm sky ${github.status?.emojiHTML?.replace(/<div[^>]*>/, '').replace('</div>', '') || ''}`"
    class="text-purple mb-2!"
  >
    <template #subtitle>
      <p>{{ age }} y/o</p>
      <p class="italic">{{ github.pronouns }}</p>
    </template>
  </Header>

  <section class="mb-4 space-y-4 text-sm leading-relaxed md:text-base">
    <p>{{ github.bio }}</p>
    <details class="space-y-2">
      <summary class="hover:cursor-pointer">read more</summary>
      <p>aw, flattered you're curious about me.</p>
      <p>
        i started messing with computers when i was 9 (probably shouldn't have
        been on the internet unsupervised, but here we are).
      </p>
      <p>
        i like making little things when i feel like it. no end goal, just that
        itch to create something because it sounds fun or strange or mildly
        cursed.
      </p>
      <p>
        outside of code, i'm usually tweaking my dotfiles, turning deep dives
        into mini obsessions, or vibing to music while forgetting what i was
        doing.
      </p>
      <p>
        if you ever just feel like saying hi, seriously, go for it. i don't bite
        :3
      </p>
    </details>
  </section>

  <Music />

  <section aria-labelledby="connect" class="mb-8">
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
          <Icon :name="social.icon" class="text-lemon-drop size-6!" />
          <div class="flex flex-col">
            <p
              class="group-hover:text-purple text-base leading-tight font-medium transition-colors duration-200"
            >
              {{ social.name }}

              <span class="text-lithium-white/60 text-sm leading-tight">{{
                getDisplayText(social)
              }}</span>
            </p>
          </div>
        </div>
        <div
          aria-hidden="true"
          class="group-hover:text-lithium-white font-mono text-zinc-600 transition-colors duration-200"
        >
          →
        </div>
      </BaseLink>
    </div>
  </section>

  <section
    v-if="github.sponsoring.nodes"
    aria-labelledby="sponsoring"
    class="mb-16"
  >
    <div class="flex space-y-4 space-x-4">
      <div
        v-for="person in github.sponsoring.nodes"
        :key="person.login"
        class="group relative"
      >
        <BaseLink :to="`https://github.com/${person.login}`">
          <NuxtImg
            :src="person.avatarUrl"
            :alt="person.login"
            loading="lazy"
            class="h-10 w-10 rounded-full transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12"
          />
        </BaseLink>

        <div
          class="bg-velvet-black text-lithium-white pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform rounded px-2 py-1 text-sm whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100"
        >
          {{ person.name }} -
          {{
            centsToDollars(
              person.sponsorshipForViewerAsSponsor?.tier?.monthlyPriceInCents ??
                0
            )
          }}/mo
        </div>
      </div>
    </div>
    <div
      id="sponsored"
      class="text-lithium-white/40 mt-2 text-xs tracking-wider uppercase"
    >
      money well misplaced —
      {{ centsToDollars(github.totalSponsorshipAmountAsSponsorInCents) }}
      <span class="italic">since July 10, 2025</span>
    </div>
  </section>
</template>

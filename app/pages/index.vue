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
    name: 'Bluesky',
    url: 'https://bsky.app/profile/did:plc:hsxlal467wtwb3rqlx3tkgue',
    icon: 'tabler:brand-bluesky'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/skywhoami',
    icon: 'mdi:github'
  },
  {
    name: 'Signal',
    url: 'https://signal.me/#eu/8gvzfrLzp0kKXGMOZ4Vd1jXN1W1AxSdgXVVk00rzHaeGq7hRTeZPsJDZWg49OC_V',
    icon: 'simple-icons:signal'
  },

  {
    name: 'Email',
    url: 'mailto:hi@skylar.sh',
    icon: 'mdi:mail-ru'
  }
]

const peeple = [
  { username: 'espimarisa' },
  { username: 'isneru' },
  { username: 'sapphosys' }
]
</script>

<template>
  <Header size="medium" title="sky 🌸" class="text-purple mb-2!">
    <template #subtitle>
      <p>{{ age }} y/o</p>
      <p>she/her</p>
    </template>
  </Header>

  <section class="mb-8 space-y-4 text-sm leading-relaxed md:text-base">
    <p>neurospicy anti-productivity princess</p>
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

  <section v-if="peeple" aria-labelledby="peeple" class="mb-16">
    <div
      id="peeple"
      class="text-lithium-white/60 mb-6 text-xs tracking-wider uppercase"
    >
      people i find cool
    </div>
    <div class="flex space-y-2 space-x-4">
      <div
        v-for="person in peeple"
        :key="person.username"
        class="group relative"
      >
        <BaseLink :to="`https://github.com/${person.username}`">
          <img
            :src="`https://github.com/${person.username}.png`"
            :alt="person.username"
            loading="lazy"
            class="h-10 w-10 rounded-full transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12"
          />
        </BaseLink>

        <div
          class="bg-velvet-black text-lithium-white pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform rounded px-2 py-1 text-sm whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100"
        >
          {{ person.username }}
        </div>
      </div>
    </div>
  </section>
</template>

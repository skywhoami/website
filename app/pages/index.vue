<script lang="ts" setup>
const age = Math.floor(
  (Date.now() - new Date('2006-11-28').getTime()) /
    (1000 * 60 * 60 * 24 * 365.25)
)

const socials: {
  name: string
  url: string
}[] = [
  {
    name: 'Bluesky',
    url: 'https://bsky.app/profile/did:plc:z3gvivss7o74w6c6kxj6qvqp'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/skywhoami'
  },
  {
    name: 'Signal',
    url: 'https://signal.me/#eu/wRxOOt3-bfVYll4yyDXfe1mbmHsvQ9cz7OeFVT46H2M5_4ov4ehMar7hTOzbeLQS'
  },
  {
    name: 'Email',
    url: 'mailto:hi@skylar.sh'
  }
]

const pages: {
  name: string
  url: string
}[] = [
  { name: 'About Me', url: '/about' },
  { name: 'Domains', url: '/domains' },
  { name: 'Privacy Policy', url: '/legal/privacy' },
  { name: 'Credits', url: '/legal/credits' }
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
  <Header size="medium" title="Skylar 🌸" class="text-purple mb-2!">
    <template #subtitle>
      <p>{{ age }} y/o</p>
      <p class="italic">she/her</p>
    </template>
  </Header>

  <section class="mb-4 text-sm leading-relaxed md:text-base">
    <p>
      Hiya! I'm Skylar. I'm a student and self-taught developer. I spend most of
      my time on the Internet, making little experiments, and changing my
      dotfiles.
    </p>
  </section>

  <section aria-labelledby="links" class="grid space-x-6 md:grid-cols-2">
    <div class="space-y-2">
      <div
        id="socials"
        class="text-lithium-white/60 mb-6 text-xs tracking-wider uppercase"
      >
        Socials
      </div>
      <BaseLink
        v-for="social in socials"
        :key="social.name"
        :aria-describedby="`desc-${social.name.toLowerCase().replace(/\s+/g, '-')}`"
        :to="social.url || ''"
        variant="social"
      >
        <div class="flex items-center space-x-4">
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
    <div class="space-y-2">
      <div
        id="pages"
        class="text-lithium-white/60 mb-6 text-xs tracking-wider uppercase"
      >
        Pages
      </div>
      <BaseLink
        v-for="page in pages"
        :key="page.name"
        :aria-describedby="`desc-${page.name.toLowerCase().replace(/\s+/g, '-')}`"
        :to="page.url || ''"
        variant="social"
      >
        <div class="flex items-center space-x-4">
          <div class="flex flex-col">
            <p
              class="group-hover:text-purple text-base leading-tight font-medium transition-colors duration-200"
            >
              {{ page.name }}
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
</template>

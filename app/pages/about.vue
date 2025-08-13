<script lang="ts" setup>
const age = Math.floor(
  (Date.now() - new Date('2006-11-28').getTime()) /
    (1000 * 60 * 60 * 24 * 365.25)
)

interface UsesItem {
  name: string
  description?: string
  url?: string
}

interface UsesSubsection {
  category?: string
  items: UsesItem[]
}

interface UsesSection {
  category: string
  description?: string
  items?: UsesItem[]
  subsections?: UsesSubsection[]
}

const hardware: UsesSection[] = [
  {
    category: 'Hardware',
    items: [
      {
        name: 'Gloss',
        description:
          "MacBook Pro 16'' M3 Pro 18GB, my daily driver, managed with nix"
      },
      {
        name: 'Sage',
        description: 'My primary cloud server running NixOS'
      },
      {
        name: 'Apple Magic Mouse',
        description:
          'Not very ergonomic but great aesthetic and I love the gestures'
      },
      {
        name: 'Logitech G PRO X SUPERLIGHT',
        description: 'Gaming mouse'
      },
      {
        name: 'AirPods Pro (2nd gen)'
      },
      { name: 'Razer BlackShark V2 X' },
      { name: 'iPhone 15 Pro' },
      {
        name: "iPad Air 11'' M2",
        description:
          'Barely used, mostly for reading, and sketching paired with an Apple Pencil Pro'
      },
      {
        name: 'Apple Watch Series 8',
        description: 'Fitness and notifications'
      }
    ]
  }
]

const languages: UsesSection[] = [
  {
    category: 'Programming Languages',
    description: 'Sorted by how much I like them',
    items: [
      {
        name: 'TypeScript',
        description: 'and JavaScript'
      },
      {
        name: 'Go',
        description: 'Currently learning'
      }
    ]
  }
]

const terminal: UsesSection[] = [
  {
    category: 'Terminal & Editor',
    items: [{ name: 'Kitty' }, { name: 'Neovim', description: 'btw' }]
  }
]

const internet: UsesSection[] = [
  {
    category: 'Internet',
    items: [
      { name: 'Zen Browser' },
      { name: 'Proton Mail' },
      { name: 'Signal' },
      { name: 'Vesktop', description: 'Custom Discord client' }
    ]
  }
]

const media: UsesSection = [
  { category: 'Media', items: [{ name: 'Apple Music' }, { name: 'Jellyfin' }] }
]

const gaming: UsesSection = [{ category: 'Gaming', items: [{ name: 'Steam' }] }]

const misc: UsesSection = [
  {
    category: 'Misc',
    items: [
      { name: 'Tailscale', description: 'WireGuard' },
      { name: 'Mullvad VPN' },
      { name: 'Kagi', description: 'Search Engine' }
    ]
  }
]
</script>

<template>
  <Header show-back-link size="medium" title="About Me" />

  <section class="mb-4 space-y-4 text-sm leading-relaxed md:text-base">
    <p>
      Hiya! I'm Skylar. I'm an {{ age }} year old student and self-taught
      developer. My pronouns are she/her.
    </p>

    <h2 class="text-4xl font-bold">Interests & Hobbies</h2>
    <p>
      I've been programming since I was 9, starting with messy little JavaScript
      Discord bots that probably shouldn't have worked, but somehow did.
    </p>
    <p>
      These days I'm still writing spaghetti code, just with slightly better
      skills and other weird projects.
    </p>
    <p>
      I'm also looking into using more privacy-friendly tools as well as
      preferring open-source over closed-source when possible.
    </p>
    <p>
      Outside of programming, I'm usually listening to music, gaming, or
      changing my dotfiles. Lately I've been enjoying messing with NixOS and
      Cloud Servers.
    </p>
  </section>

  <section class="mb-4 space-y-4 text-sm leading-relaxed md:text-base">
    <h2 class="text-4xl">Stuff I use</h2>
    <ul
      v-for="section in [
        ...hardware,
        ...languages,
        ...terminal,
        ...internet,
        ...media,
        ...gaming,
        ...misc
      ]"
      :key="section.category"
    >
      <h2 class="text-2xl">
        {{ section.category }}
      </h2>
      <span class="mb-12 italic opacity-75">{{ section.description }}</span>

      <li v-for="item in section.items" :key="item.name" class="mx-4 list-disc">
        {{ item.name }}
        <span v-if="item.description" class="italic opacity-75"
          >({{ item.description }})</span
        >
      </li>
    </ul>
  </section>
</template>

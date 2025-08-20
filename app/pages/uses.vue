<script lang="ts" setup>
definePageMeta({
  title: 'uses',
  description: "software and hardware that powers Skylar's workflow"
})

interface UsesItem {
  name: string
  note?: string
}

interface UsesSubsection {
  category?: string
  items: UsesItem[]
}

const tools: UsesSubsection[] = [
  {
    category: 'Hardware',
    items: [
      {
        name: 'Gloss',
        note: "My daily driver, MacBook Pro 16'' M3 Pro 18GB"
      },
      {
        name: "MacBook Air 13'' M1 8GB",
        note: 'The MacBook I use at university'
      },
      {
        name: 'Apple Magic Mouse (USB-C)',
        note: 'Not very ergonomic, but love the design and gestures'
      },
      {
        name: 'AirPods Pro (2nd gen)'
      },
      { name: 'iPhone 15 Pro' },
      {
        name: "iPad Air 11'' M2"
      },
      { name: 'Apple Pencil Pro' },
      {
        name: 'Apple Watch Series 8'
      }
    ]
  },
  {
    category: 'Editor & Terminal',
    items: [
      {
        name: 'Neovim',
        note: "it's been a back and forth relationship for a while, but i really want to learn it and use it as my main editor"
      },
      {
        name: 'Xcode',
        note: 'for iOS & macOS development'
      },
      {
        name: 'Maple Mono'
      },
      {
        name: 'kitty'
      },
      {
        name: 'Homebrew',
        note: 'My preferred macOS package manager'
      },
      {
        name: 'Nix',
        note: 'I use Nix (with nix-darwin and home-manager) to manage my dotfiles and ensure everything works the same on every machine I own'
      }
    ]
  },
  {
    category: 'Desktop Applications',
    items: [
      {
        name: 'Zen Browser',
        note: 'Ever since I got my first MacBook I had been using Safari but got tired of not having all extensions and stuff I wanted'
      },
      {
        name: 'Signal'
      },
      {
        name: 'Proton Mail'
      },
      {
        name: 'Vesktop'
      },
      { name: 'Apple Music' },
      {
        name: '1Password'
      },
      {
        name: 'Steam',
        note: 'That one gaming platform no one can talk bad about'
      }
    ]
  }
]

const getSectionId = (category: string) =>
  `section-${category.toLowerCase().replace(/\s+/g, '-')}`
const getItemDescId = (item: UsesItem) =>
  `desc-${item.name.toLowerCase().replace(/\s+/g, '-')}`
</script>

<template>
  <Header show-back-link size="medium" title="Uses">
    <template #subtitle
      ><p>Software and hardware that power my workflow</p>
      <p>
        Inspired by
        <BaseLink
          to="https://sapphic.moe/uses"
          class="text-[rgb(245,194,231)]"
          underline
          >Sapphic Angels' /uses</BaseLink
        >
      </p></template
    >
  </Header>
  <section class="mb-16 space-y-24 text-sm md:text-base">
    <div v-for="section in tools" :key="section.category">
      <h2
        :id="getSectionId(section.category!)"
        class="mb-6 text-2xl font-bold tracking-tight text-white"
      >
        {{ section.category }}
      </h2>
      <div class="space-y-16">
        <ul class="divide-y divide-white/10">
          <li
            v-for="item in section.items"
            :key="item.name"
            class="py-4 md:py-3"
            role="listitem"
          >
            <div class="grid md:grid-cols-2 md:gap-8">
              <div class="flex items-center justify-between md:block">
                <template v-if="item.url">
                  <div class="flex items-center gap-1.5">
                    <span
                      :aria-describedby="
                        item.note ? getItemDescId(item) : undefined
                      "
                      class="font-medium text-white transition-colors"
                      underline
                    >
                      {{ item.name }}
                    </span>
                  </div>
                </template>
                <template v-else>
                  <span
                    :aria-describedby="
                      item.note ? getItemDescId(item) : undefined
                    "
                    class="font-medium text-white"
                  >
                    {{ item.name }}
                  </span>
                </template>
              </div>
              <p
                v-if="item.note"
                :id="getItemDescId(item)"
                class="mt-1 text-sm leading-snug text-zinc-400 md:mt-0"
              >
                {{ item.note }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

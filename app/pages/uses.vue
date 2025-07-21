<script lang="ts" setup>
useHead({
  title: 'uses'
})

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
  category?: string
  items?: UsesItem[]
  subsections?: UsesSubsection[]
}

const hardware: UsesSection[] = [
  {
    items: [
      {
        name: "MacBook Pro 16'' M3 Pro 18GB",
        description: 'daily driver'
      },
      {
        name: "MacBook Air 13'' M1 8GB",
        description:
          'the laptop i use for uni and also serving as my home server'
      },
      {
        name: 'Apple Magic Mouse',
        description:
          "yes it's not ergonomic, but i love the gestures and the design"
      },
      {
        name: 'Logitech G PRO X SUPERLIGHT',
        description: 'gaming mouse',
        url: 'https://www.logitechg.com/en-eu/products/gaming-mice/pro-x-superlight-wireless-mouse.html'
      },
      {
        name: 'AirPods Pro (2nd gen)',
        description:
          "amazing sound quality and transparency mode for when i'm on the go"
      },
      { name: 'Razer BlackShark V2 X' },
      { name: 'iPhone 15 Pro' },
      {
        name: "iPad Air 11'' M2",
        description: 'reading, sketching and entertainment'
      },
      { name: 'Apple Pencil Pro' },
      {
        name: 'Apple Watch Series 8',
        description: 'fitness and notifications'
      },
      {
        name: "AOC 32'' 240Hz (32G2WG8)",
        description: 'secondary monitor'
      },
      {
        name: 'FlexiSpot E1',
        description: 'standing desk',
        url: 'https://flexispot.co.uk/electric-height-adjustable-standing-desk-e1.html?value=EF1black'
      },
      {
        name: 'FlexiSpot BS5',
        description:
          "ergonomic chair, i think it's a bit overpriced but doesn't make my back hurt so",
        url: 'https://flexispot.co.uk/colorful-ergonomic-chair-bs5'
      }
    ]
  }
]

const software: UsesSection[] = [
  {
    category: 'software',
    subsections: [
      {
        category: 'editor & terminal',
        items: [
          {
            name: 'Neovim',
            url: 'https://neovim.io/',
            description:
              "it's been a back and forth relationship for a while, but i really want to learn it and use it as my main editor"
          },
          {
            name: 'Xcode',
            description: 'for iOS & macOS development'
          },
          {
            name: 'Maple Mono',
            url: 'https://github.com/subframe7536/maple-font',
            description: 'my font of choice'
          },
          {
            name: 'zsh',
            description: "comes bundled with macOS and does it's job perfectly"
          },
          {
            name: 'Ghostty',
            url: 'https://ghostty.org/',
            description: 'terminal emulator'
          },
          {
            name: 'Bun',
            url: 'https://bun.sh',
            description: 'javascript runtime and package manager'
          },
          {
            name: 'Homebrew',
            url: 'https://brew.sh',
            description: 'package manager for macOS'
          },
          {
            name: 'Oh My Posh',
            url: 'https://ohmyposh.dev/',
            description: 'prompt theme engine'
          },
          {
            name: 'Colima',
            url: 'https://github.com/abiosoft/colima',
            description: 'container runtime'
          }
        ]
      },
      {
        category: 'browser & extensions',
        items: [
          { name: 'Safari' },
          {
            name: 'Wipr 2',
            description: 'ad and tracker blocker for safari',
            url: 'https://kaylees.site/wipr2.html'
          },
          {
            name: '1Password',
            description: 'browser autofill & integration with desktop app',
            url: 'https://1password.com'
          },
          {
            name: 'Refined GitHub',
            description: 'enhanced github experience',
            url: 'https://github.com/refined-github/refined-github'
          },
          {
            name: 'SponsorBlock',
            description: 'skip youtube sponsor segments',
            url: 'https://github.com/ajayyy/SponsorBlock'
          }
        ]
      },
      {
        category: 'desktop applications',
        items: [
          { name: 'Apple Music' },
          {
            name: 'Sketch',
            description: 'design tool',
            url: 'https://www.sketch.com'
          },
          {
            name: '1Password',
            description: 'password manager',
            url: 'https://1password.com/'
          },
          {
            name: 'Signal',
            description: 'open source private messenger',
            url: 'https://signal.org/'
          },
          {
            name: 'Steam',
            description: 'that one gaming platform no one can talk bad about',
            url: 'https://store.steampowered.com/'
          }
        ]
      }
    ]
  }
]

const getSectionId = (section: UsesSection) =>
  `section-${(section.category || 'hardware')
    .toLowerCase()
    .replace(/\s+/g, '-')}`

const getSubsectionId = (subsection: UsesSubsection | UsesSection) =>
  `subsection-${subsection.category!.toLowerCase().replace(/\s+/g, '-')}`

const getItemDescId = (item: UsesItem) =>
  `desc-${item.name.toLowerCase().replace(/\s+/g, '-')}`
</script>

<template>
  <Header show-back-link size="medium" title="uses">
    <template #subtitle
      ><p>software and hardware that power my workflow</p>
      <p>
        inspired by
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
    <div
      v-for="section in [...hardware, ...software]"
      :key="section.category || 'hardware'"
    >
      <h2
        :id="getSectionId(section)"
        class="mb-6 text-2xl font-bold tracking-tight text-white"
      >
        {{ section.category || 'hardware' }}
      </h2>

      <div class="space-y-16">
        <div
          v-for="subsection in section.subsections || [section]"
          :key="subsection.category || 'items'"
          :aria-labelledby="
            subsection.category
              ? getSubsectionId(subsection)
              : getSectionId(section)
          "
        >
          <h3
            v-if="subsection.category"
            :id="getSubsectionId(subsection)"
            class="mb-4 text-lg font-semibold text-zinc-400"
          >
            {{ subsection.category }}
          </h3>

          <ul class="divide-y divide-white/10">
            <li
              v-for="item in subsection.items"
              :key="item.name"
              class="py-4 md:py-3"
              role="listitem"
            >
              <div class="grid md:grid-cols-2 md:gap-8">
                <div class="flex items-center justify-between md:block">
                  <template v-if="item.url">
                    <div class="flex items-center gap-1.5">
                      <BaseLink
                        :aria-describedby="
                          item.description ? getItemDescId(item) : undefined
                        "
                        :to="item.url"
                        class="font-medium text-white transition-colors"
                        underline
                      >
                        {{ item.name }}
                      </BaseLink>
                    </div>
                  </template>

                  <template v-else>
                    <span
                      :aria-describedby="
                        item.description ? getItemDescId(item) : undefined
                      "
                      class="font-medium text-white"
                    >
                      {{ item.name }}
                    </span>
                  </template>
                </div>

                <p
                  v-if="item.description"
                  :id="getItemDescId(item)"
                  class="mt-1 text-sm leading-snug text-zinc-400 md:mt-0"
                >
                  {{ item.description }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

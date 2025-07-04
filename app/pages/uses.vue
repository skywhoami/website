<script lang="ts" setup>
useHead({
  title: 'uses',
  link: [
    {
      rel: 'canonical',
      href: 'https://skylar.sh/uses'
    }
  ]
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
      { name: 'AirPods Pro (2nd gen)' },
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
        description: 'ergonomic chair',
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
        category: 'editor',
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
            url: 'https://github.com/subframe7536/maple-font'
          }
        ]
      },
      {
        category: 'browser',
        items: [{ name: 'Safari' }]
      },
      {
        category: 'browser extensions',
        items: [
          {
            name: 'Wipr 2',
            description: 'ad and tracker blocker for safari',
            url: 'https://kaylees.site/wipr2.html'
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
          },
          {
            name: '1Password',
            description: 'password manager',
            url: 'https://1password.com/'
          }
        ]
      },
      {
        category: 'applications',
        items: [
          {
            name: 'Ghostty',
            description: 'fast and modern terminal emulator',
            url: 'https://ghostty.org'
          },
          {
            name: 'Sketch',
            description: 'design tool',
            url: 'https://www.sketch.com'
          }
        ]
      },
      {
        category: 'terminal',
        items: [
          { name: 'zsh', description: 'shell' },
          {
            name: 'Bun',
            description: 'javascript runtime and package manager',
            url: 'https://bun.sh'
          },
          {
            name: 'Homebrew',
            description: 'package manager',
            url: 'https://brew.sh'
          },
          {
            name: 'Oh My Posh',
            description: 'prompt theme engine',
            url: 'https://ohmyposh.dev'
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
    <template #subtitle>software and hardware that power my workflow</template>
  </Header>

  <section class="space-y-12 text-sm md:text-base">
    <div
      v-for="section in [...hardware, ...software]"
      :key="section.category || 'hardware'"
    >
      <h2
        :id="getSectionId(section)"
        class="mb-8 text-xl font-bold text-white md:text-2xl"
      >
        {{ section.category || 'hardware' }}
      </h2>

      <div class="space-y-8">
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
            class="mb-4 text-lg font-semibold text-zinc-300"
          >
            {{ subsection.category }}
          </h3>

          <div class="space-y-3" role="list">
            <div
              v-for="item in subsection.items"
              :key="item.name"
              class="flex items-start justify-between border-b border-white/10 py-2"
              role="listitem"
            >
              <div class="flex-1">
                <BaseLink
                  v-if="item.url"
                  :aria-describedby="
                    item.description ? getItemDescId(item) : undefined
                  "
                  :to="item.url"
                  class="font-medium hover:text-zinc-300"
                  variant="button"
                >
                  {{ item.name }}
                </BaseLink>
                <span
                  v-else
                  :aria-describedby="
                    item.description ? getItemDescId(item) : undefined
                  "
                  class="font-medium"
                >
                  {{ item.name }}
                </span>

                <div
                  v-if="item.description"
                  :id="getItemDescId(item)"
                  class="mt-1 text-sm text-zinc-400"
                >
                  {{ item.description }}
                </div>
              </div>

              <div
                v-if="item.url"
                aria-hidden="true"
                class="ml-4 text-zinc-600"
              >
                →
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</template>

import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    name: "sky's site",
    url: 'https://skylar.sh'
  },

  compatibilityDate: '2025-07-18',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@nuxtjs/sitemap',
    '@nuxt/icon',
    '@nuxt/content',
    '@nuxtjs/turnstile',
    '@nuxt/scripts',
    'nuxt-og-image',
    '@nuxt/image'
  ],

  runtimeConfig: {
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    spotifyRefreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
    appleMusicToken: process.env.APPLE_MUSIC_TOKEN,
    appleMusicUserToken: process.env.APPLE_MUSIC_USER_TOKEN,
    githubToken: process.env.GITHUB_TOKEN
  },

  sourcemap: { client: true, server: false },

  css: ['~/assets/main.css'],

  vite: {
    plugins: [tailwindcss()]
  },

  fonts: {
    families: [
      { name: 'Atkinson Hyperlegible Next', provider: 'fontsource' },
      { name: 'Maple Mono', provider: 'fontsource' }
    ]
  },

  experimental: {
    viewTransition: true
  },

  app: {
    head: {
      script: [{ src: '/oneko/oneko.js', tagPosition: 'bodyOpen' }],
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#000000' },
        { name: 'color-scheme', content: 'dark' },
        {
          name: 'description',
          content:
            'Skylar is an experimental software developer building weird digital things. This is her home on the webs.'
        },
        { name: 'author', content: 'Skylar' },
        {
          name: 'keywords',
          content:
            'sky, skylar, skylar.sh, indie dev, experimental software, software developer, personal site, digital playground'
        },

        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'skylar.sh' },
        { property: 'og:title', content: "sky's site" },
        {
          property: 'og:description',
          content: 'Skylar builds weird digital projects.'
        },
        { property: 'og:locale', content: 'en_UK' },
        {
          property: 'og:image',
          content: '/__og-image__/static/og.png',
          key: 'og:image'
        },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '600' },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'skylar.sh' },
        {
          name: 'twitter:description',
          content:
            'Skylar is an experimental software developer building weird digital things. This is her home on the webs.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' }
      ]
    },

    rootAttrs: {
      id: 'sky' // <3
    }
  },

  content: {
    renderer: {
      anchorLinks: { h1: true, h2: true, h3: false }
    },
    database: {
      type: 'postgres',
      url: process.env.DATABASE_URL
    }
  },

  turnstile: {
    siteKey: '0x4AAAAAABlGl3GCGqZycMAD'
  },

  ogImage: {
    zeroRuntime: true
  },

  nitro: {
    compatibilityDate: '2025-07-18',
    preset: 'node-server',
    prerender: {
      crawlLinks: true,
      routes: ['/legal/privacy', '/sitemap.xml', '/robots.txt']
    },
    experimental: { database: true, tasks: true },
    database: {
      default: {
        connector: 'postgresql',
        options: {
          url: process.env.DATABASE_URL
        }
      }
    }
  }
})

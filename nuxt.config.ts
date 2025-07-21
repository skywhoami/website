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
    'nitro-cloudflare-dev'
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
        { property: 'og:url', content: 'https://skylar.sh' },
        { property: 'og:locale', content: 'en_UK' },

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
    }
  },

  turnstile: {
    siteKey: '0x4AAAAAABlGl3GCGqZycMAD'
  },

  nitro: {
    compatibilityDate: '2025-07-18',
    preset: 'cloudflare_module',
    prerender: {
      crawlLinks: true,
      routes: ['/legal/privacy', '/sitemap.xml', '/robots.txt']
    },
    experimental: { database: true, tasks: true },

    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
      wrangler: {
        name: 'website',
        observability: { logs: { enabled: true } },
        keep_vars: true,
        d1_databases: [
          {
            binding: 'DB',
            database_name: 'DB',
            database_id: '2e6393fb-3f43-41f4-bc03-2f76d98e92a2'
          }
        ]
      }
    }
  },

  $production: {
    nitro: {
      database: {
        default: {
          connector: 'cloudflare-d1',
          options: {
            bindingName: 'DB'
          }
        }
      }
    }
  }
})

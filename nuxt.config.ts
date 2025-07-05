import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    name: "sky's site",
    url: 'https://skylar.sh'
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2025-06-09',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxtjs/sitemap', '@nuxt/icon'],

  runtimeConfig: {
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    spotifyRefreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
    appleMusicToken: process.env.APPLE_MUSIC_TOKEN,
    appleMusicUserToken: process.env.APPLE_MUSIC_USER_TOKEN
  },

  sourcemap: { client: true, server: false },

  css: ['~/assets/main.css'],

  vite: {
    plugins: [tailwindcss()]
  },

  fonts: {
    families: [{ name: 'Maple Mono', provider: 'fontsource' }]
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
          content: "sky's site"
        },
        { name: 'author', content: 'Skylar' },
        {
          name: 'keywords',
          content: 'star, sky, sky castro, software developer, meeows'
        },

        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: "sky's site" },
        { property: 'og:title', content: "sky's site" },
        {
          property: 'og:description',
          content: "sky's site"
        },
        { property: 'og:url', content: 'https://skylar.sh' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: "sky's site" },
        { property: 'og:locale', content: 'en_US' },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@skywhoami' },
        { name: 'twitter:creator', content: '@skywhoami' },
        { name: 'twitter:title', content: "sky's site" },
        {
          name: 'twitter:description',
          content: "sky's site"
        },
        { name: 'twitter:image:alt', content: "sky's site" }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://skylar.sh/' },
        { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' }
      ]
    },

    rootAttrs: {
      id: 'star' // <3
    }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/projects', '/uses', '/privacy', '/domains']
    },
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
      wrangler: {
        name: 'website',
        observability: {
          logs: { enabled: true }
        },
        keep_vars: true
      }
    }
  }
})

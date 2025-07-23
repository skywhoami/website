import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { asOgImageCollection } from 'nuxt-og-image/content'

export default defineContentConfig({
  collections: {
    legal: defineCollection(
      asOgImageCollection({
        type: 'page',
        source: '**/*.md',
        schema: z.object({
          title: z.string(),
          lastUpdated: z.string()
        })
      })
    )
  }
})

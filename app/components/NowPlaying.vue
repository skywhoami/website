<script lang="ts" setup>
import type { NowPlayingTrack } from '~~/server/api/now-playing'

const {
  data: currentTrack,
  pending,
  error,
  refresh
} = await useFetch<NowPlayingTrack | null>('/api/now-playing', {
  default: () => null,
  server: false
})

let refreshInterval: NodeJS.Timeout | null = null

onMounted(() => {
  refreshInterval = setInterval(() => {
    if (!pending.value) {
      refresh()
    }
  }, 30000)
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
})

const getServiceInfo = (service: 'spotify' | 'apple-music') => {
  switch (service) {
    case 'spotify':
      return {
        name: 'Spotify',
        color: 'bg-[#1DB954]',
        icon: 'mdi:spotify'
      }
    case 'apple-music':
      return {
        name: 'Apple Music',
        color: 'bg-[#FA233B]',
        icon: 'cib:apple-music'
      }
  }
}
</script>

<template>
  <section v-if="currentTrack" aria-labelledby="now-playing" class="mb-8">
    <div
      id="now-playing"
      class="text-lithium-white/60 mb-4 text-xs tracking-wider uppercase"
    >
      {{
        currentTrack.isPlaying ? 'currently listening to' : 'recently played'
      }}
    </div>

    <div
      class="group hover:border-lithium-white/20 hover:bg-lithium-white/5 relative flex items-center space-x-4 rounded-xl border border-transparent px-4 py-3 transition-all duration-200 hover:scale-102"
    >
      <div class="flex-shrink-0">
        <img
          :alt="`${currentTrack.album} album cover`"
          :src="currentTrack.image"
          class="h-12 w-12 rounded-lg object-cover"
        />
      </div>

      <div class="min-w-0 flex-grow">
        <div class="mb-1 flex items-center space-x-2">
          <div
            v-if="currentTrack.isPlaying"
            :class="[
              getServiceInfo(currentTrack.service).color,
              'h-2 w-2 animate-pulse rounded-full'
            ]"
          />
          <div
            v-else
            :class="[
              getServiceInfo(currentTrack.service).color,
              'h-2 w-2 rounded-full'
            ]"
          />
          <span class="text-xs tracking-wider text-zinc-400">{{
            getServiceInfo(currentTrack.service).name
          }}</span>
        </div>

        <BaseLink :to="currentTrack.url" class="block">
          <div class="truncate text-sm font-medium md:text-base">
            {{ currentTrack.name }}
          </div>
          <div class="text-lithium-white/60 truncate text-xs md:text-sm">
            by {{ currentTrack.artist }}
          </div>
        </BaseLink>
      </div>

      <div
        class="group-hover:text-lithium-white flex-shrink-0 text-zinc-600 transition-colors duration-200"
      >
        <Icon
          :name="getServiceInfo(currentTrack.service).icon"
          class="h-5 w-5"
        />
      </div>
    </div>
  </section>
</template>

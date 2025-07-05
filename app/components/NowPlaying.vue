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
let progressInterval: NodeJS.Timeout | null = null
const localProgress = ref<number | null>(null)
const lastUpdatedAt = ref<number | null>(null)

watch(
  () => currentTrack.value?.progress_ms,
  (newProgress: number | undefined) => {
    if (newProgress !== undefined) {
      localProgress.value = newProgress
      lastUpdatedAt.value = Date.now()
    }
  },
  { immediate: true }
)

onMounted(() => {
  refreshInterval = setInterval(() => {
    if (!pending.value) {
      refresh()
    }
  }, 5000)

  progressInterval = setInterval(() => {
    if (
      currentTrack.value?.isPlaying &&
      localProgress.value !== null &&
      lastUpdatedAt.value !== null &&
      currentTrack.value?.duration_ms
    ) {
      const now = Date.now()
      const elapsed = now - lastUpdatedAt.value

      localProgress.value = Math.min(
        currentTrack.value.progress_ms! + elapsed,
        currentTrack.value.duration_ms
      )
    }
  }, 100)
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
  if (progressInterval) {
    clearInterval(progressInterval)
  }
})

const formatTime = (ms: number | null) => {
  if (ms === null) return '0:00'
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const progressPercentage = computed(() => {
  if (!currentTrack.value?.duration_ms || !localProgress.value) return 0
  return Math.min(
    (localProgress.value / currentTrack.value.duration_ms) * 100,
    100
  )
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
      v-if="currentTrack.isPlaying"
      id="now-playing"
      class="mb-4 text-xs tracking-wider text-zinc-400 uppercase"
    >
      currently listening to
    </div>
    <div
      v-else
      id="now-playing"
      class="mb-4 text-xs tracking-wider text-zinc-400 uppercase"
    >
      recently played
    </div>

    <div
      class="group relative flex items-center hover:scale-102 space-x-4 rounded-xl border border-transparent px-4 py-3 transition-all duration-200 hover:border-white/20 hover:bg-white/5"
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

        <BaseLink
          :to="currentTrack.url"
          class="block transition-colors duration-200 group-hover:text-white"
        >
          <div class="truncate text-sm font-medium md:text-base">
            {{ currentTrack.name }}
          </div>
          <div class="truncate text-xs text-zinc-400 md:text-sm">
            by {{ currentTrack.artist }}
          </div>
        </BaseLink>
      </div>

      <div
        class="flex-shrink-0 text-zinc-600 transition-colors duration-200 group-hover:text-white"
      >
        <Icon
          :name="getServiceInfo(currentTrack.service).icon"
          class="h-5 w-5"
        />
      </div>

      <div
        v-if="
          currentTrack.isPlaying &&
          currentTrack.service === 'spotify' &&
          currentTrack.duration_ms
        "
        class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/50 to-transparent px-4 pt-1 pb-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        <div
          class="mb-1.5 flex items-center justify-between text-xs text-white"
        >
          <span>{{ formatTime(localProgress) }}</span>
          <span>{{ formatTime(currentTrack.duration_ms) }}</span>
        </div>
        <div class="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
          <div
            :class="getServiceInfo(currentTrack.service).color"
            :style="`width: ${progressPercentage}%`"
            class="h-full rounded-full transition-all ease-linear"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

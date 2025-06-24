<script lang="ts" setup>
import type { NowPlayingTrack } from '~~/server/api/now-playing';

const { data: currentTrack, pending, error, refresh } = await useFetch<NowPlayingTrack | null>('/api/now-playing', {
  default: () => null,
  server: false
});

let refreshInterval: NodeJS.Timeout | null = null;
let progressInterval: NodeJS.Timeout | null = null;
const localProgress = ref<number | null>(null);
const lastUpdatedAt = ref<number | null>(null);

watch(() => currentTrack.value?.progress_ms, (newProgress: number | undefined) => {
  if(newProgress !== undefined) {
    localProgress.value = newProgress;
    lastUpdatedAt.value = Date.now();
  }
}, { immediate: true });

onMounted(() => {
  refreshInterval = setInterval(() => {
    if(!pending.value) {
      refresh();
    }
  }, 5000);

  progressInterval = setInterval(() => {
    if(currentTrack.value?.isPlaying && localProgress.value !== null && lastUpdatedAt.value !== null && currentTrack.value?.duration_ms) {
      const now = Date.now();
      const elapsed = now - lastUpdatedAt.value;

      localProgress.value = Math.min(
        currentTrack.value.progress_ms! + elapsed,
        currentTrack.value.duration_ms
      );
    }
  }, 100);
});

onUnmounted(() => {
  if(refreshInterval) {
    clearInterval(refreshInterval);
  }
  if(progressInterval) {
    clearInterval(progressInterval);
  }
});

const formatTime = (ms: number | null) => {
  if(ms === null) return '0:00';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${ minutes }:${ seconds.toString().padStart(2, '0') }`;
};

const progressPercentage = computed(() => {
  if(!currentTrack.value?.duration_ms || !localProgress.value) return 0;
  return Math.min((localProgress.value / currentTrack.value.duration_ms) * 100, 100);
});

const getServiceInfo = (service: 'spotify' | 'apple-music') => {
  switch(service) {
    case 'spotify':
      return {
        name: 'Spotify',
        color: 'bg-[#1DB954]',
        icon: 'mdi:spotify'
      };
    case 'apple-music':
      return {
        name: 'Apple Music',
        color: 'bg-[#FA233B]',
        icon: 'cib:apple-music'
      };
  }
};
</script>

<template>
<section v-if="currentTrack" aria-labelledby="now-playing" class="mb-12">
  <div
    v-if="currentTrack.isPlaying"
    id="now-playing"
    class="text-xs text-zinc-400 mb-4 uppercase tracking-wider"
  >
    currently listening to
  </div>
  <div
    v-else
    id="now-playing"
    class="text-xs text-zinc-400 mb-4 uppercase tracking-wider"
  >
    recently played
  </div>

  <div
    class="group relative rounded-xl flex items-center space-x-4 py-3 px-4 border border-transparent hover:border-white/20 hover:bg-white/5 transition-all duration-200">
    <div class="flex-shrink-0">
      <img
        :alt="`${currentTrack.album} album cover`"
        :src="currentTrack.image"
        class="w-12 h-12 rounded-lg object-cover"
      />
    </div>

    <div class="flex-grow min-w-0">
      <div class="flex items-center space-x-2 mb-1">
        <div v-if="currentTrack.isPlaying"
             :class="[getServiceInfo(currentTrack.service).color, 'w-2 h-2 rounded-full animate-pulse']"/>
        <div v-else :class="[getServiceInfo(currentTrack.service).color, 'w-2 h-2 rounded-full']"/>
        <span class="text-xs text-zinc-400 tracking-wider">{{ getServiceInfo(currentTrack.service).name }}</span>
      </div>

      <BaseLink
        :to="currentTrack.url"
        class="block group-hover:text-white transition-colors duration-200"
      >
        <div class="font-medium text-sm md:text-base truncate">
          {{ currentTrack.name }}
        </div>
        <div class="text-xs md:text-sm text-zinc-400 truncate">
          by {{ currentTrack.artist }}
        </div>
      </BaseLink>
    </div>

    <div class="flex-shrink-0 text-zinc-600 group-hover:text-white transition-colors duration-200">
      <Icon :name="getServiceInfo(currentTrack.service).icon" class="w-5 h-5"/>
    </div>

    <div
      v-if="currentTrack.isPlaying && currentTrack.service === 'spotify' && currentTrack.duration_ms"
      class="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-4 pb-2 pt-1 bg-gradient-to-t from-black/50 to-transparent"
    >
      <div class="flex items-center justify-between text-xs text-white mb-1.5">
        <span>{{ formatTime(localProgress) }}</span>
        <span>{{ formatTime(currentTrack.duration_ms) }}</span>
      </div>
      <div class="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
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

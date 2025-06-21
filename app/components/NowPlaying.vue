<script lang="ts" setup>
const {data: currentTrack, pending, error, refresh} = await useFetch<{
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  isPlaying: boolean;
  service: 'spotify' | 'apple-music';
} | null>('/api/now-playing', {
  default: () => null,
  server: false,
});

let refreshInterval: NodeJS.Timeout | null = null;

onMounted(() => {
  refreshInterval = setInterval(() => {
    if (!pending.value) {
      refresh();
    }
  }, 30000);
});

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
});

const getServiceInfo = (service: 'spotify' | 'apple-music') => {
  switch (service) {
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
        icon: 'cib:apple-music',
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
        class="group rounded-xl flex items-center space-x-4 py-3 px-4 border border-transparent hover:border-white/20 hover:bg-white/5 transition-all duration-200">
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
    </div>
  </section>
</template>

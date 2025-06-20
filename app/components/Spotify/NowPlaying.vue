<script lang="ts" setup>
interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  isPlaying: boolean;
}

const {data: currentTrack, pending, error, refresh} = await useFetch<SpotifyTrack | null>('/api/spotify/now-playing', {
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
</script>

<template>
  <section v-if="currentTrack && currentTrack.isPlaying" aria-labelledby="spotify" class="mb-12">
    <div
        id="spotify"
        class="text-xs text-zinc-400 mb-4 uppercase tracking-wider"
    >
      currently listening to
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
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span class="text-xs text-zinc-400 tracking-wider">Spotify</span>
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
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-2 15V7l6 5-6 5z"/>
        </svg>
      </div>
    </div>
  </section>
</template>

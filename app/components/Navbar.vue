<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'

interface NavigationLink {
  to: string
  label: string
}

const isMenuOpen = ref(false)
const scrolled = ref(false)

const navigationLinks: NavigationLink[] = [
  { to: '/uses', label: 'uses' },
  { to: '/domains', label: 'domains' }
]

function handleScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="fixed top-0 right-0 left-0 z-50 flex justify-center px-6 pt-6">
    <nav
      :class="{ 'bg-black/70 shadow-lg': scrolled }"
      aria-label="Main navigation"
      class="w-full rounded-xl border border-white/10 bg-black/40 px-6 py-3 backdrop-blur-md transition-all duration-300 ease-in-out md:w-[calc(100%-1rem)] md:px-8 lg:w-[calc(100%-4rem)] xl:max-w-3xl"
      role="navigation"
    >
      <div class="flex items-center justify-between">
        <BaseLink
          aria-label="Home"
          class="font-bold text-white transition-opacity duration-200 hover:opacity-80"
          to="/"
        >
          diogo.wtf
        </BaseLink>

        <ul class="hidden items-center space-x-1 md:flex">
          <li v-for="link in navigationLinks" :key="link.to">
            <BaseLink
              :aria-label="`Go to ${link.label} page`"
              :to="link.to"
              class="group relative rounded-xl px-3 py-1 text-sm hover:bg-white/10"
            >
              <span>{{ link.label }}</span>
              <span
                class="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 transform bg-white transition-all duration-300 ease-in-out group-hover:w-4/5"
              ></span>
            </BaseLink>
          </li>
        </ul>

        <button
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          class="rounded-xl p-1 transition-colors duration-200 hover:bg-white/10 md:hidden"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span class="sr-only">Menu</span>
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              v-if="!isMenuOpen"
              d="M4 6h16M4 12h16M4 18h16"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
            <path
              v-else
              d="M6 18L18 6M6 6l12 12"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </button>
      </div>

      <div
        v-show="isMenuOpen"
        id="mobile-menu"
        class="mt-3 border-t border-white/10 pt-3 md:hidden"
      >
        <ul class="flex flex-col space-y-2">
          <li v-for="link in navigationLinks" :key="link.to">
            <BaseLink
              :aria-label="`Go to ${link.label} page`"
              :to="link.to"
              class="group relative block rounded-md px-3 py-2 text-sm hover:bg-white/10"
              @click="isMenuOpen = false"
            >
              <span>{{ link.label }}</span>
              <span
                class="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 transform bg-white transition-all duration-300 ease-in-out group-hover:w-4/5"
              ></span>
            </BaseLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

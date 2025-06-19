<script lang="ts" setup>
interface NavigationLink {
  to: string;
  label: string;
}

const isMenuOpen = ref(false);
const scrolled = ref(false);

const navigationLinks: NavigationLink[] = [
  {to: "/about", label: "about"},
  {to: "/philosophy", label: "philosophy"},
  {to: "/uses", label: "uses"},
  {to: "/projects", label: "projects"},
  {to: "/domains", label: "domains"},
];

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

function handleScroll() {
  scrolled.value = window.scrollY > 20;
}
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-50 px-6 pt-6 flex justify-center">
    <nav
        :class="{ 'bg-black/70 shadow-lg': scrolled }"
        aria-label="Main navigation"
        class="backdrop-blur-md bg-black/40 border border-white/10 rounded-xl py-3 px-6 md:px-8 w-full md:w-[calc(100%-2rem)] lg:w-[calc(100%-8rem)] xl:max-w-4xl transition-all duration-300 ease-in-out"
        role="navigation"
    >
      <div class="flex items-center justify-between">
        <BaseLink
            aria-label="Home"
            class="font-bold text-white hover:opacity-80 transition-opacity duration-200"
            to="/"
        >
          skylar.sh
        </BaseLink>

        <ul class="hidden md:flex items-center space-x-1">
          <li v-for="link in navigationLinks" :key="link.to">
            <BaseLink
                :aria-label="`Go to ${link.label} page`"
                :to="link.to"
                class="py-1 px-3 rounded-xl hover:bg-white/10 text-sm relative group"
            >
              <span>{{ link.label }}</span>
              <span
                  class="absolute bottom-0 left-1/2 w-0 h-px bg-white transform -translate-x-1/2 transition-all duration-300 ease-in-out group-hover:w-4/5"
              ></span>
            </BaseLink>
          </li>
        </ul>

        <button
            :aria-expanded="isMenuOpen"
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            class="md:hidden p-1 rounded-xl hover:bg-white/10 transition-colors duration-200"
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
          class="md:hidden mt-3 pt-3 border-t border-white/10"
      >
        <ul class="flex flex-col space-y-2">
          <li v-for="link in navigationLinks" :key="link.to">
            <BaseLink
                :aria-label="`Go to ${link.label} page`"
                :to="link.to"
                class="block py-2 px-3 rounded-md hover:bg-white/10 text-sm relative group"
                @click="isMenuOpen = false"
            >
              <span>{{ link.label }}</span>
              <span
                  class="absolute bottom-0 left-1/2 w-0 h-px bg-white transform -translate-x-1/2 transition-all duration-300 ease-in-out group-hover:w-4/5"
              ></span>
            </BaseLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
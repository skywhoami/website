<script lang="ts" setup>
interface NavigationLink {
  to: string
  label: string
}

interface Props {
  showNavigation?: boolean
}

const { showNavigation = false } = defineProps<Props>()

const navigationLinks: NavigationLink[] = [
  { to: '/legal/privacy', label: 'privacy' }
]
</script>

<template>
  <footer class="mt-auto border-t border-white/10 pt-8">
    <div
      class="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0"
    >
      <div class="text-xs text-zinc-500">
        <BaseLink
          underline
          to="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          >CC BY-NC-SA 4.0</BaseLink
        >
        {{ new Date().getFullYear() }}
        &copy; Diogo Castro
      </div>

      <nav v-if="showNavigation" aria-label="Footer navigation">
        <div class="flex flex-wrap items-center gap-1 text-xs">
          <template v-for="(link, index) in navigationLinks" :key="link.to">
            <BaseLink
              :aria-label="`Go to ${link.label} page`"
              :to="link.to"
              class="text-zinc-500 transition-colors duration-200"
            >
              {{ link.label }}
            </BaseLink>

            <span
              v-if="index < navigationLinks.length - 1"
              aria-hidden="true"
              class="mx-2 text-zinc-500"
            >
              /
            </span>
          </template>
        </div>
      </nav>

      <div v-else class="text-xs">
        <BaseLink aria-label="Go back to homepage" class="text-zinc-500" to="/">
          cd ..
        </BaseLink>
      </div>
    </div>
  </footer>
</template>

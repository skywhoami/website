<script lang="ts" setup>
interface NavigationLink {
  to: string
  label: string
}

interface Props {
  note?: string
  showNavigation?: boolean
}

const {showNavigation = false} = defineProps<Props>()

const navigationLinks: NavigationLink[] = [
  {to: "/privacy", label: "privacy"},
  {to: "/terms", label: "terms"},
]
</script>

<template>
  <footer class="mt-auto pt-8 border-t border-white/10">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
      <div class="text-xs text-zinc-500">
        {{ note }}
      </div>

      <nav v-if="showNavigation" aria-label="Footer navigation">
        <div class="text-xs flex flex-wrap items-center gap-1">
          <template v-for="(link, index) in navigationLinks" :key="link.to">
            <BaseLink :aria-label="`Go to ${link.label} page`" :to="link.to"
                      class="text-zinc-500 hover:text-white transition-colors duration-200">
              {{ link.label }}
            </BaseLink>

            <span v-if="index < navigationLinks.length - 1" aria-hidden="true" class="text-zinc-500 mx-2">
              /
            </span>
          </template>
        </div>
      </nav>

      <div v-else class="text-xs">
        <BaseLink aria-label="Go back to homepage" class="text-zinc-500 hover:text-white transition-colors duration-200"
                  to="/">
          cd ..
        </BaseLink>
      </div>
    </div>
  </footer>
</template>
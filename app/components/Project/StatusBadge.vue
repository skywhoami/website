<script lang="ts" setup>
import type { ProjectStatus } from './Grid.vue'

interface Props {
  status: ProjectStatus
}

const { status } = defineProps<Props>()

const statusColors: Record<ProjectStatus, string> = {
  active: 'text-green-400',
  wip: 'text-orange-400',
  maintained: 'text-blue-400',
  archived: 'text-zinc-500'
}

const statusSymbols: Record<ProjectStatus, string> = {
  active: '●',
  wip: '●',
  maintained: '●',
  archived: '○'
}

const statusLabels: Record<ProjectStatus, string> = {
  active: 'actively developed',
  wip: 'work in progress',
  maintained: 'maintained',
  archived: 'archived'
}
</script>

<template>
  <span
    :aria-label="statusLabels[status]"
    :class="statusColors[status]"
    class="text-xs"
  >
    {{ statusSymbols[status] }}
  </span>
</template>

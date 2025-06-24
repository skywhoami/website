<script lang="ts" setup>
import type { ProjectStatus } from './Grid.vue';

interface Props {
  title?: string;
}

const { title = 'labels' } = defineProps<Props>();

const sectionId = `legend-${ Math.random().toString(36).substr(2, 9) }`;

const statusLabels: Record<ProjectStatus, string> = {
  active: 'actively developed',
  wip: 'work in progress',
  maintained: 'maintained',
  archived: 'archived'
};
</script>

<template>
<section :aria-labelledby="sectionId" class="mb-16">
  <div
    :id="sectionId"
    class="text-xs text-zinc-400 mb-4 uppercase tracking-wider"
  >
    {{ title }}
  </div>

  <div class="grid grid-cols-2 gap-4 text-xs" role="list">
    <div
      v-for="(label, status) in statusLabels"
      :key="status"
      class="flex items-center space-x-2"
      role="listitem"
    >
      <ProjectStatusBadge :status="status as ProjectStatus"/>
      <span class="text-zinc-400">{{ label }}</span>
    </div>
  </div>
</section>
</template>

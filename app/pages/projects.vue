<script lang="ts" setup>
useHead({
  title: 'projects',
  link: [
    {
      rel: 'canonical',
      href: 'https://skylar.sh/projects'
    }
  ]
});

import type { ProjectSection } from '~/components/Project/Grid.vue';

const projects: ProjectSection[] = [
  {
    category: 'current focus',
    items: [
      {
        name: 'website',
        description: 'this website you\'re currently on',
        url: 'https://github.com/skywhoami/website',
        tech: [ 'Vue', 'Nuxt', 'Tailwind CSS' ],
        status: 'active'
      }
    ]
  },
  {
    category: 'experiments',
    items: [
      {
        name: 'latte',
        description: 'tiny programming language born from boredom',
        url: 'https://github.com/skywhoami/latte',
        tech: [ 'C++', 'LLVM' ],
        status: 'archived'
      }
    ]
  }
];
</script>

<template>
<Header show-back-link size="medium" title="projects"
>
  <template #subtitle
  >featured things I've built, maintain, or experiment with
  </template
  >
</Header
>

<ProjectGrid :sections="projects"/>

<div class="pt-8 border-t border-white/10 mb-16">
  <div class="text-center">
    <BaseLink
      class="inline-flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors duration-200 text-sm"
      to="https://github.com/skywhoami?tab=repositories"
    >
      <span>view all my repos on GitHub</span>
      <span aria-hidden="true">→</span>
    </BaseLink>
  </div>
</div>

<ProjectLegend/>

<Footer/>
</template>

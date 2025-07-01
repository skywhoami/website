<script lang="ts" setup>
export type ProjectStatus = 'active' | 'wip' | 'maintained' | 'archived'

export interface Project {
  name: string
  description?: string
  url?: string
  tech?: string[]
  status: ProjectStatus
}

export interface ProjectSection {
  category: string
  items: Project[]
}

interface Props {
  sections: ProjectSection[]
}

const { sections } = defineProps<Props>()

const getProjectId = (project: Project) =>
  `project-${project.name.toLowerCase().replace(/\s+/g, '-')}`

const getDescriptionId = (project: Project) =>
  `desc-${project.name.toLowerCase().replace(/\s+/g, '-')}`
</script>

<template>
  <section class="mb-16 space-y-12 text-sm md:text-base">
    <div v-for="section in sections" :key="section.category">
      <h2 class="mb-6 text-lg font-semibold text-zinc-300 md:text-xl">
        {{ section.category }}
      </h2>
      <div class="space-y-4">
        <template v-for="project in section.items" :key="project.name">
          <BaseLink
            v-if="project.url"
            :aria-labelledby="getProjectId(project)"
            :to="project.url"
            class="relative block border border-transparent p-4 transition-all duration-200 hover:border-white/20 hover:bg-white/5"
            role="article"
            variant="default"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="mb-2 flex items-center space-x-3">
                  <h3
                    :id="getProjectId(project)"
                    class="font-medium text-white"
                  >
                    {{ project.name }}
                  </h3>

                  <ProjectStatusBadge
                    :aria-label="`Project status: ${project.status}`"
                    :status="project.status"
                  />
                </div>

                <div
                  :id="getDescriptionId(project)"
                  class="mb-3 text-sm text-zinc-400"
                >
                  {{ project.description }}
                </div>

                <div
                  v-if="project.tech && project.tech.length"
                  :aria-label="`Technologies used in ${project.name}`"
                  class="flex flex-wrap gap-2"
                  role="list"
                >
                  <span
                    v-for="tech in project.tech"
                    :key="tech"
                    class="rounded bg-white/10 px-2 py-1 text-xs text-zinc-300"
                    role="listitem"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <div
                aria-hidden="true"
                class="ml-4 text-zinc-600 transition-colors duration-200 group-hover:text-white"
              >
                →
              </div>
            </div>
          </BaseLink>

          <div
            v-else
            :aria-labelledby="getProjectId(project)"
            class="group rounded-xl border border-transparent p-4 transition-all duration-200 hover:border-white/20 hover:bg-white/5"
            role="article"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="mb-2 flex items-center space-x-3">
                  <h3
                    :id="getProjectId(project)"
                    class="font-medium text-white"
                  >
                    {{ project.name }}
                  </h3>

                  <ProjectStatusBadge
                    :aria-label="`Project status: ${project.status}`"
                    :status="project.status"
                  />
                </div>

                <div
                  :id="getDescriptionId(project)"
                  class="mb-3 text-sm text-zinc-400"
                >
                  {{ project.description }}
                </div>

                <div
                  v-if="project.tech && project.tech.length"
                  :aria-label="`Technologies used in ${project.name}`"
                  class="flex flex-wrap gap-2"
                  role="list"
                >
                  <span
                    v-for="tech in project.tech"
                    :key="tech"
                    class="rounded bg-white/10 px-2 py-1 text-xs text-zinc-300"
                    role="listitem"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

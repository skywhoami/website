<template>
  <section class="space-y-12 text-sm md:text-base mb-16">
    <div v-for="section in sections" :key="section.category">
      <h2 class="text-lg md:text-xl font-semibold mb-6 text-zinc-300 capitalize">
        {{ section.category }}
      </h2>
      <div class="space-y-4">
        <template v-for="project in section.items" :key="project.name">
          <BaseLink
              v-if="project.url"
              :aria-labelledby="getProjectId(project)"
              :to="project.url"
              class="block border border-transparent hover:border-white/20 hover:bg-white/5 transition-all duration-200 p-4 relative"
              role="article"
              variant="default"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
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
                    class="text-zinc-400 text-sm mb-3 first-letter:capitalize"
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
                      class="text-xs px-2 py-1 bg-white/10 text-zinc-300 rounded"
                      role="listitem"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <div
                  aria-hidden="true"
                  class="text-zinc-600 group-hover:text-white transition-colors duration-200 ml-4"
              >
                →
              </div>
            </div>
          </BaseLink>

          <div
              v-else
              :aria-labelledby="getProjectId(project)"
              class="group border rounded-xl border-transparent hover:border-white/20 hover:bg-white/5 transition-all duration-200 p-4"
              role="article"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
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
                    class="text-zinc-400 text-sm mb-3"
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
                      class="text-xs px-2 py-1 bg-white/10 text-zinc-300 rounded"
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

<script lang="ts" setup>
export type ProjectStatus = "active" | "wip" | "maintained" | "archived";

export interface Project {
  name: string;
  description?: string;
  url?: string;
  tech?: string[];
  status: ProjectStatus;
}

export interface ProjectSection {
  category: string;
  items: Project[];
}

interface Props {
  sections: ProjectSection[];
}

const {sections} = defineProps<Props>();

const getProjectId = (project: Project) =>
    `project-${project.name.toLowerCase().replace(/\s+/g, "-")}`;

const getDescriptionId = (project: Project) =>
    `desc-${project.name.toLowerCase().replace(/\s+/g, "-")}`;
</script>

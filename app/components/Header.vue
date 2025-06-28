<script lang="ts" setup>
interface Props {
  title: string;
  showBackLink?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const {
  title, showBackLink = false, size = 'medium'
} = defineProps<Props>();

const titleClass = computed(() => {
  const sizes = {
    small: 'text-3xl md:text-5xl',
    medium: 'text-4xl md:text-6xl',
    large: 'text-4xl md:text-8xl'
  };
  return sizes[size];
});
</script>

<template>
  <header class="mb-8">
    <nav v-if="showBackLink" aria-label="Breadcrumb navigation" class="mb-8">
      <BaseLink
        aria-label="Go back to homepage"
        class="text-zinc-400 hover:text-white transition-colors duration-200 text-sm"
        to="/"
      >
        ← back
      </BaseLink>
    </nav>

    <h1 :class="titleClass" class="font-bold mb-4 tracking-tight">
      {{ title }}
    </h1>

    <div v-if="$slots.subtitle" class="text-zinc-400 text-sm md:text-base">
      <slot name="subtitle"/>
    </div>
  </header>
</template>

<template>
  <BaseLink :to="props.href" underline>
    <slot />
  </BaseLink>
</template>

<script setup lang="ts">
const props = defineProps({
  href: {
    type: String,
    default: ''
  }
})
</script>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div
    class="relative flex h-full w-full justify-between bg-[#fafaf9] p-[60px]"
  >
    <div
      class="absolute top-0 right-[-100%] flex"
      :style="{
        width: '200%',
        height: '200%',
        backgroundImage: `radial-gradient(circle, rgba(${'#f59'
          .replace('#', '')
          .match(/.{1,2}/g)
          ?.map(v => Number.parseInt(v, 16))
          .join(
            ', '
          )}, 0.5) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0) 70%)`
      }"
    />
    <div class="relative h-full w-full justify-between">
      <div class="flex flex-row items-start justify-between">
        <div class="flex w-full max-w-[65%] flex-col">
          <h1
            class="m-0 mb-[30px] line-clamp-2 block text-[75px] font-bold overflow-ellipsis text-[#a6f]"
          >
            {{ title }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

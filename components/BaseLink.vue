<script lang="ts" setup>
interface Props {
  to: string;
  variant?: "default" | "button" | "card" | "social";
  class?: string;
  underline?: boolean;
}

const {
  to,
  variant = "default",
  class: customClass = "",
  underline = false,
} = defineProps<Props>();

const isExternal = computed(
    () => to.startsWith("http") || to.startsWith("mailto:")
);

const linkClasses = computed(() => {
  const baseClasses =
      "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-true-black";

  const variants = {
    default: "hover:text-white rounded-xl",
    button: "hover:text-zinc-300",
    card: "group border border-transparent hover:border-white/20 hover:bg-white/5 transition-all duration-200",
    social:
        "group rounded-xl flex items-center justify-between py-3 px-4 border border-transparent hover:border-white/20 hover:bg-white/5 transition-all duration-200",
  };

  const classes = [baseClasses, variants[variant]];

  if (underline) {
    classes.push("underline");
  }

  if (customClass) {
    classes.push(customClass);
  }

  return classes.filter(Boolean).join(" ");
});

const playPopSound = () => {
  try {
    const audio = new Audio('/pop.mp3');
    audio.volume = 0.5;
    audio.play().catch(error => {
      console.warn('Could not play pop sound:', error);
    });
  } catch (error) {
    console.warn('Audio not supported:', error);
  }
};

defineExpose({
  isExternal,
});
</script>

<template>
  <NuxtLink
      :class="linkClasses"
      :external="isExternal"
      :rel="isExternal ? 'noopener noreferrer' : undefined"
      :target="isExternal ? '_blank' : undefined"
      :to="to"
      v-bind="$attrs"
      @click="playPopSound"
  >
    <slot/>
  </NuxtLink>
</template>

<script lang="ts" setup>
interface Props {
  to: string
  variant?: 'default' | 'button' | 'social'
  class?: string
  underline?: boolean
}

const {
  to,
  variant = 'default',
  class: customClass = '',
  underline = false
} = defineProps<Props>()

const isExternal = computed(
  () => to.startsWith('http') || to.startsWith('mailto:')
)

const linkClasses = computed(() => {
  const baseClasses =
    'transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lithium-white focus-visible:ring-offset-2 focus-visible:ring-offset-velvet-black'

  const variants = {
    default: 'hover:text-purple! rounded-xl',
    button: 'bg-bubblegum hover:bg-bubblegum/60 hover:underline rounded-xl',
    social:
      'group rounded-xl flex items-center justify-between py-3 px-4 border border-transparent hover:border-lithium-white/20 hover:bg-lithium-white/5 hover:scale-102 transition-all duration-200'
  }

  const classes = [baseClasses, variants[variant]]

  if (underline) {
    classes.push('underline underline-offset-4')
  }

  if (customClass) {
    classes.push(customClass)
  }

  return classes.filter(Boolean).join(' ')
})

const playPopSound = () => {
  try {
    const audio = new Audio('/pop.mp3')
    audio.volume = 0.5
    audio.play().catch(error => {
      console.warn('Could not play pop sound:', error)
    })
  } catch (error) {
    console.warn('Audio not supported:', error)
  }
}

defineExpose({ isExternal })
</script>

<template>
  <NuxtLink
    :to="to"
    :external="isExternal"
    :class="linkClasses"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    @click="playPopSound"
    v-bind="$attrs"
    active-class="text-bubblegum"
  >
    <slot />
  </NuxtLink>
</template>

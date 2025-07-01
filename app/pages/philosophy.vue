<script lang="ts" setup>
useHead({
  title: 'philosophy',
  link: [
    {
      rel: 'canonical',
      href: 'https://skylar.sh/philosophy'
    }
  ]
})
</script>

<template>
  <Header show-back-link size="medium" title="philosophy">
    <template #subtitle>
      <div class="space-y-1 text-sm text-zinc-400 md:text-base">
        <span>what drives me to build weird shit</span>
      </div>
    </template>
  </Header>

  <section class="mb-12 space-y-6 text-sm leading-relaxed md:text-base">
    <h2 class="text-lg font-semibold">why i build</h2>
    <p>
      because it's fun (or weird, or both). because i want to see what happens.
      i don't care if it scales or makes money.
    </p>

    <h2 class="text-lg font-semibold">how i work</h2>
    <ul class="ml-6 list-disc">
      <li>minimal setups</li>
      <li>max control</li>
      <li>break things on purpose</li>
      <li>learn by building</li>
    </ul>

    <h2 class="text-lg font-semibold">what i value</h2>
    <ul class="ml-6 list-disc">
      <li>privacy, security, and digital freedom</li>
      <li>open-source</li>
      <li>radical transparency</li>
      <li>community over competition</li>
      <li>people over profit, always</li>
      <li>supporting indie creators</li>
    </ul>

    <h2 class="text-lg font-semibold">what i reject</h2>
    <ul class="ml-6 list-disc">
      <li>nonsense and bullshit</li>
      <li>egos, elitism, gatekeeping</li>
      <li>unnecessary competition</li>
      <li>hype over impact</li>
    </ul>

    <blockquote class="flex items-center border-l-4 pl-4 text-zinc-400 italic">
      <span class="select-none">&ldquo;</span>the internet should feel personal
      again<span class="select-none">&rdquo;</span>
    </blockquote>
  </section>

  <Footer />
</template>

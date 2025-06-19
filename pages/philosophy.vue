<script lang="ts" setup>
useHead({
  link: [
    {
      rel: "canonical",
      href: "https://skylar.sh/philosophy",
    },
  ],
});
</script>

<template>
  <Header show-back-link size="medium" title="my philosophy">
    <template #subtitle>
      <div class="text-zinc-400 text-sm md:text-base space-y-1">
        <span>what drives me to build weird shit</span>
      </div>
    </template>
  </Header>

  <section class="mb-12 space-y-6 text-sm md:text-base leading-relaxed">
    <h2 class="font-semibold text-lg">why i build</h2>
    <p>
      because it's fun (or weird, or both). because i want to see what happens.
      i don't care if it scales or makes money, i care if it feels alive
    </p>

    <h2 class="font-semibold text-lg">how i work</h2>
    <ul class="list-disc ml-6">
      <li>minimal setups</li>
      <li>max control</li>
      <li>i break things on purpose</li>
      <li>i learn by building</li>
      <li>no plans, no pipelines</li>
    </ul>

    <h2 class="font-semibold text-lg">what i value</h2>
    <ul class="list-disc ml-6">
      <li>privacy, security, and digital freedom</li>
      <li>open-source</li>
      <li>radical transparency</li>
      <li>community over competition</li>
      <li>celebrating the weird</li>
      <li>people over profit, always</li>
      <li>supporting indie creators</li>
    </ul>

    <h2 class="font-semibold text-lg">what i reject</h2>
    <ul class="list-disc ml-6">
      <li>nonsense and bullshit</li>
      <li>egos, elitism, gatekeeping</li>
      <li>unnecessary competition</li>
      <li>hype over impact</li>
    </ul>

    <blockquote class="border-l-4 pl-4 text-zinc-400 italic flex items-center">
      <span class="select-none">&ldquo;</span>the internet should feel personal
      again<span class="select-none">&rdquo;</span>
    </blockquote>
  </section>

  <Footer note="philosophy, but make it indie"/>
</template>

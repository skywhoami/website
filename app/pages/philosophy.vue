<script lang="ts" setup>
useHead({
  link: [
    {
      rel: "canonical",
      href: "https://diogo.wtf/philosophy",
    },
  ],
});
</script>

<template>
  <Header show-back-link size="medium" title="philosophy">
    <template #subtitle>
      <div class="text-zinc-400 text-sm md:text-base space-y-1">
        <span>what drives me to build weird shit</span>
      </div>
    </template>
  </Header>

  <section class="mb-12 space-y-6 text-sm md:text-base leading-relaxed">
    <h2 class="font-semibold text-lg capitalize">why i build</h2>
    <p>
      Because it's fun (or weird, or both). Because I want to see what happens.
      I don't care if it scales or makes money, I care if it feels alive.
    </p>

    <h2 class="font-semibold text-lg capitalize">how i work</h2>
    <ul class="list-disc ml-6">
      <li>Minimal setups</li>
      <li>Max control</li>
      <li>I break things on purpose</li>
      <li>I learn by building</li>
      <li>No plans, no pipelines</li>
    </ul>

    <h2 class="font-semibold text-lg capitalize">what i value</h2>
    <ul class="list-disc ml-6">
      <li>Privacy, security, and digital freedom</li>
      <li>Open-source</li>
      <li>Radical transparency</li>
      <li>Community over competition</li>
      <li>Celebrating the weird</li>
      <li>People over profit, always</li>
      <li>Supporting indie creators</li>
    </ul>

    <h2 class="font-semibold text-lg capitalize">what i reject</h2>
    <ul class="list-disc ml-6">
      <li>Nonsense and bullshit</li>
      <li>Egos, elitism, gatekeeping</li>
      <li>Unnecessary competition</li>
      <li>Hype over impact</li>
    </ul>

    <blockquote class="border-l-4 pl-4 text-zinc-400 italic flex items-center">
      <span class="select-none">&ldquo;</span>the internet should feel personal
      again<span class="select-none">&rdquo;</span>
    </blockquote>
  </section>

  <Footer/>
</template>

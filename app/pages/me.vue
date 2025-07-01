<script lang="ts" setup>
useHead({
  title: 'me',
  link: [
    {
      rel: 'canonical',
      href: 'https://diogo.wtf/about'
    }
  ]
})
</script>

<template>
  <Header show-back-link size="medium" title="about me" />

  <section class="mb-12 space-y-4 text-sm leading-relaxed md:text-base">
    <p>
      i've been writing code since i was 9 (questionable parenting, if you ask
      me).
    </p>
    <p>
      i make tools, systems, and setups that help me do things better. stuff
      thats weird, overengineered, or just fun to mess with.
    </p>
    <p>i learn by doing, breaking things, and keeping it mine.</p>
    <p>
      outside of programming, you'll probably find me listening to music,
      playing games, tinkering with my setup, or just getting lost in some
      rabbit hole online.
    </p>
    <p>
      if you're wondering why i build the way i do,
      <BaseLink class="underline" to="/philosophy"
        >here's my philosophy</BaseLink
      >.
    </p>
  </section>
  <Footer />
</template>

<script lang="ts" setup>
useHead({
  title: 'me',
  link: [
    {
      rel: 'canonical',
      href: 'https://skylar.sh/about'
    }
  ]
})
</script>

<template>
  <Header show-back-link size="medium" title="about me" />

  <section class="mb-12 space-y-4 text-sm leading-relaxed md:text-base">
    <p>
      i started programming when I was 9 (questionable parenting, if you ask
      me).
    </p>
    <p>
      what began as making discord bots following tutorials turned into my
      biggest hobby with making stuff just because i could, whether it made
      sense or not.
    </p>
    <p>
      somewhere along the way, i landed in university. The major I picked sucked
      and my mental health sucked harder. so i dropped out after a few months.
    </p>
    <p>
      But i'm not done with it. i'm coming back, on my own terms, to something
      that actually fits me.
    </p>
    <p>nowadays, i'm deep into the apple ecosystem.</p>
    <p>
      since around 17, i've been loving Swift, especially SwiftUI for iOS and
      macOS.
    </p>
    <p>
      i like weird projects, unfinished ideas, overengineered code, and people
      who make things just because they feel like it.
    </p>
    <p>
      outside of programming, you'll probably find me listening to music,
      playing games, tinkering with my setup, or just getting lost in some
      rabbit hole online.
    </p>
    <p>
      if you're wondering why i build the way I do,
      <BaseLink class="underline" to="/philosophy"
        >here's my philosophy.</BaseLink
      >
    </p>
  </section>
  <Footer />
</template>

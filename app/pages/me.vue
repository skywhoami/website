<script lang="ts" setup>

useHead({
  link: [
    {
      rel: "canonical",
      href: "https://diogo.wtf/about",
    },
  ],
});
</script>

<template>
  <Header show-back-link size="medium" title="about me"/>

  <section class="mb-12 space-y-4 text-sm md:text-base leading-relaxed">
    <p>I started programming when I was 9 (questionable parenting, if you ask me).</p>
    <p>What began as making Discord bots following tutorials turned into my biggest hobby with making stuff just because
      I
      could, whether it made sense or not.</p>
    <p>Somewhere along the way, I landed in university. The major sucked. My mental health sucked harder. So I dropped
      out after a few months.</p>
    <p>But I'm not done. I'm coming back, on my own terms, to something that actually fits me.</p>
    <p>These days, I'm deep into the Apple ecosystem.</p>
    <p>Since around 17, I've been loving Swift, especially SwiftUI for iOS and macOS.</p>
    <p>I like weird projects, unfinished ideas, overengineered code, and people who make things just because they feel
      like it.
    </p>
    <p>Outside of programming, you'll probably find me listening to music, playing games, tinkering with my setup, or
      just getting lost in some rabbit hole online.</p>
    <p>If you're wondering why I build the way I do,
      <BaseLink class="underline" to="/philosophy">here's my philosophy.</BaseLink>
    </p>
  </section>
  <Footer/>
</template>

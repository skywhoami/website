<script lang="ts" setup>
useHead({
  link: [
    {
      rel: "canonical",
      href: "https://diogo.wtf/privacy",
    },
  ],
})
</script>

<template>
  <Header show-back-link size="medium" title="Privacy Policy"/>

  <section class="space-y-3 text-sm md:text-base leading-loose mb-16">
    <h1 class="text-xl font-bold">Introduction</h1>
    <p>This Privacy Policy explains how your personal information is (or, in this case, isn’t) handled when you use my
      website or any applications operated by me.</p>
    <h1 class="text-xl font-bold">Definitions</h1>
    <ul class="list-disc pl-6">
      <li><strong>Service</strong>: Refers to the website and/or any applications managed and maintained by Diogo
        Castro.
      </li>
      <li><strong>Personal Data</strong>: Refers to any information about an individual that can be used to identify
        them, directly or indirectly. This includes names, ID numbers, location data, online identifiers, or details
        specific to someone’s identity, physical, mental, economic, or otherwise, as defined by the
        <BaseLink
            class="underline" to="https://gdpr-info.eu/art-4-gdpr/" variant="button">General
          Data
          Protection Regulation (GDPR)
        </BaseLink>
        .
      </li>
    </ul>

    <h1 class="text-xl font-bold">What Data Is Collected</h1>
    <p>None. This Service does not collect, store, or process any personal data. No tracking. No analytics. No cookies.
      Just the content, straight-up.</p>

    <h1 class="text-xl font-bold">Contact</h1>
    <p>If you have any questions or concerns about privacy, you’re welcome to reach out directly.</p>
  </section>

  <Footer note="last updated: june 2025"/>
</template>

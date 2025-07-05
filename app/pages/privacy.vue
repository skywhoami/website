<script lang="ts" setup>
useHead({
  title: 'privacy',
  link: [
    {
      rel: 'canonical',
      href: 'https://skylar.sh/privacy'
    }
  ]
})

const lastUpdated = "2025-07-01 17:02:33 +0100"
</script>

<template>
  <Header show-back-link size="medium" title="Privacy Policy" />

  <section class="mb-16 space-y-5 text-sm leading-relaxed md:text-base">
    <h1 class="text-xl font-bold">Overview</h1>
    <p>
      As of this writing (5th July 2025), none of Skylar&apos;s public-facing sites or services store, upload, or process any personal data, identifying or otherwise. There&apos;s no tracking, no analytics, and no cookie banners. You just get the content, nothing else.
    </p>

    <h1 class="text-xl font-bold">What Counts as &quot;Personal Data&quot;</h1>
    <p>
      &quot;Personal data&quot; means anything that could be used to identify you, like your name, IP address, location, or anything else tied to your identity. If you want the full legal breakdown, check out the
      <BaseLink
          underline
        to="https://gdpr-info.eu/art-4-gdpr/"
        variant="button"
      >GDPR&apos;s definition here</BaseLink>.
    </p>

    <h1 class="text-xl font-bold">Cloudflare & Hosting</h1>
    <p>
      All of Skylar&apos;s web services run behind Cloudflare, for hosting (via Workers) and protection (firewalls, rate limiting, DDoS shielding, etc.). While no data is collected intentionally by Skylar, Cloudflare may still process some basic connection metadata as part of their infrastructure (like IPs and request logs).
    </p>
    <p>
      You can read more about what Cloudflare does with that info in their own
      <BaseLink
          underline
        to="https://www.cloudflare.com/en-gb/privacypolicy/"
        variant="button"
      >Privacy Policy</BaseLink>.
    </p>

    <h1 class="text-xl font-bold">Scope</h1>
    <p>
      These terms apply to any domains or apps listed on the
      <BaseLink underline to="/domains" variant="button">Domain list</BaseLink>.
      If there are exceptions (e.g., services that do log or store data), those will be clearly noted on the relevant domain or app itself.
    </p>

    <h1 class="text-xl font-bold">Contact</h1>
    <p>
      If anything&apos;s unclear, or if you have questions about how stuff works, feel free to reach out. I&apos;m always open to chat.
    </p>

    <span>Last updated: {{ lastUpdated }}</span>
  </section>

  <Footer />
</template>

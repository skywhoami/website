<script lang="ts" setup>
const age = Math.floor(
    (Date.now() - new Date("2006-11-28").getTime()) /
    (1000 * 60 * 60 * 24 * 365.25)
);

const socials: { name: string, url?: string, username?: string }[] = [
  {
    name: "GitHub",
    url: "https://github.com/skywhoami",
  },
  {
    name: "Discord",
    url: "https://discord.com/users/293020630608248832",
    username: "skywhoami",
  },
  {
    name: "Email",
    url: "mailto:hi@skylar.sh",
  },
  {
    name: "Bluesky",
    url: "https://bsky.app/profile/skylar.sh",
  },
  {
    name: "Signal",
    url: "https://signal.me/#eu/pFCjcZ8ENJmnG2Jf49vhI1MPE_eyU_T5rw4YZ1KWP3uJ8WKykx9Ma6xJHMdkm2Q5",
    username: "skywhoami.01",
  },
];

const getDescriptionId = (item: SocialItem) =>
    `desc-${item.name.toLowerCase().replace(/\s+/g, "-")}`;

const getDisplayText = (item: SocialItem) => {
  if (item.username || !item.url) {
    return `@${item.username}`;
  }
  if (item.url.includes("mailto:")) {
    return item.url.split(":")[1];
  }

  return `@${item.url.split("/").pop()}`;
};
</script>

<template>
  <Header size="large" title="star">
    <template #subtitle>
      <div class="text-zinc-400 text-sm md:text-base space-y-1">
        <div>portugal</div>
        <div>{{ age }}yo</div>
        <div>silly wannabe programmer</div>
      </div>
    </template>
  </Header>

  <section class="mb-12 space-y-4 text-sm md:text-base leading-relaxed">
    <p>I build weird little tools, break things for fun, and overengineer everything I can.</p>
    <p>Sometimes it works. Most times looks like spaghetti. Either way, I'm having fun.</p>
    <p>→
      <BaseLink class="underline" to="/about">Read more about me</BaseLink>
    </p>
  </section>

  <SpotifyNowPlaying/>

  <section aria-labelledby="connect" class="mb-16">
    <div
        id="connect"
        class="text-xs text-zinc-400 mb-6 uppercase tracking-wider"
    >
      where you can find me
    </div>

    <div class="space-y-2">
      <BaseLink
          v-for="social in socials"
          :key="social.name"
          :aria-describedby="getDescriptionId(social)"
          :to="social.url || ''"
          variant="social"
      >
        <div class="flex items-center space-x-4">
          <span class="text-base font-medium">{{ social.name }}</span>
          <span
              :id="getDescriptionId(social)"
              class="text-sm text-zinc-400 font-mono"
          >
            {{ getDisplayText(social) }}
          </span>
        </div>
        <div
            aria-hidden="true"
            class="text-zinc-600 group-hover:text-white transition-colors duration-200"
        >
          →
        </div>
      </BaseLink>
    </div>
  </section>

  <Footer note="💜" show-navigation/>
</template>

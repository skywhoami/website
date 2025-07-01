<template>
  <div class="bg-true-black text-true-white min-h-screen font-mono">
    <Navbar />

    <main
      id="main-content"
      class="mx-auto flex min-h-screen max-w-2xl flex-col px-6 pt-28 pb-12"
      tabindex="-1"
    >
      <slot />
    </main>
  </div>
</template>

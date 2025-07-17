<template>
  <div
    class="bg-velvet-black text-lithium-white max-h-screen min-h-screen font-mono"
  >
    <Navbar />
    <main
      id="main-content"
      class="mx-auto flex min-h-screen max-w-2xl flex-col px-6 pt-28 pb-12"
      tabindex="-1"
    >
      <slot />
      <Footer />
    </main>
  </div>
</template>

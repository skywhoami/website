<template>
  <div class="min-h-screen bg-true-black text-true-white font-mono">
    <Navbar/>

    <main
        id="main-content"
        class="flex flex-col max-w-2xl mx-auto px-6 pt-28 pb-12 min-h-screen"
        tabindex="-1"
    >
      <slot/>
    </main>
  </div>
</template>

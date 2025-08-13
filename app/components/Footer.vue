<template>
  <footer class="mt-auto border-t border-white/10 pt-2 pb-0!">
    <div
      class="flex flex-col items-center justify-center space-y-2 pt-4 md:flex-row md:items-center md:space-y-0"
    >
      <div class="text-xs text-zinc-500">
        Made with 💜 by Skylar.
        <BaseLink
          underline
          to="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          >CC BY-NC-SA 4.0</BaseLink
        >
        {{ new Date().getFullYear() }}
      </div>
    </div>
  </footer>
</template>

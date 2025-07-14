<script lang="ts" setup>
import { ref } from 'vue'

const name = ref('')
const message = ref('')
const token = ref('')
const submitting = ref(false)
const error = ref('')
const success = ref(false)

const submit = async () => {
  error.value = ''
  success.value = false

  if (!name.value.trim() || !message.value.trim() || !token.value) {
    error.value = token.value
      ? 'both fields are required'
      : 'please complete the captcha check'
    return
  }

  submitting.value = true

  try {
    await useFetch('/api/guestbook', {
      method: 'POST',
      body: { name: name.value, message: message.value, token: token.value }
    })
    success.value = true
    name.value = message.value = token.value = ''
  } catch (e: any) {
    error.value = e?.data?.error || 'something went wrong'
  }

  submitting.value = false
}
</script>

<template>
  <Header show-back-link size="medium" title="sign the guestbook 💌">
    <template #subtitle>
      <p class="text-zinc-400 italic">say something kind or silly :)</p>
    </template>
  </Header>

  <section class="mb-16 space-y-6 text-sm leading-relaxed md:text-base">
    <form @submit.prevent="submit" class="space-y-6">
      <div class="space-y-2">
        <label for="name" class="block text-sm font-medium text-zinc-400">
          name
        </label>
        <input
          id="name"
          v-model="name"
          placeholder="your name"
          class="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-white transition placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-800 focus:outline-none"
        />
      </div>

      <div class="space-y-2">
        <label for="message" class="block text-sm font-medium text-zinc-400">
          message
        </label>
        <textarea
          id="message"
          v-model="message"
          rows="4"
          placeholder="say something nice :)"
          class="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-white transition placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-800 focus:outline-none"
        ></textarea>
      </div>

      <NuxtTurnstile v-model="token" />

      <button
        type="submit"
        :disabled="submitting"
        class="w-full rounded-md border border-zinc-800 bg-zinc-950 px-4 py-2 font-medium text-white transition hover:bg-zinc-900 focus:ring-2 focus:ring-zinc-800 focus:outline-none disabled:opacity-50"
      >
        {{ submitting ? 'sending...' : 'submit' }}
      </button>

      <p v-if="error" class="text-sm text-red-400">{{ error }}</p>

      <p v-if="success" class="text-sm text-green-400">
        thank you 💜<br />
        <BaseLink to="/guestbook" class="underline">back to guestbook</BaseLink>
      </p>
    </form>
  </section>

  <Footer />
</template>

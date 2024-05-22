<script setup>
const novelsStore = useNovelsStore()
</script>

<template>
  <div class="flex items-center justify-center w-full flex-col space-y-4">
    <h1 class="font-bold text-4xl text-center">
      Welcome to NoveLLM
    </h1>
    <UButton
        v-if="novelsStore.hfToken === ''"
        label="Connect to HuggingFace"
        icon="i-heroicons-cog-6-tooth"
        @click="navigateTo('/settings')"
    />

  </div>
</template>

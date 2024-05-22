<script setup lang="ts">
const novelsStore = useNovelsStore()

let novelsLinks = novelsStore.novels.map(novel => ({
  label: novel.title,
  icon: 'i-heroicons-document',
  to: `/novel/${novel.id}`
})).reverse()

novelsStore.$subscribe(async (mutation, state) => {
  if (mutation.events.type == "add" || mutation.events.type == "set") {
    novelsLinks = state.novels.map(novel => ({
      label: novel.title,
      icon: 'i-heroicons-document',
      to: `/novel/${novel.id}`
    })).reverse()
    await refreshNuxtData()
  }
});


const navLinks = [
  {
    label: 'Add Novel',
    icon: 'i-heroicons-plus',
    to: '/novel/new',
  },
  {
    label: 'Settings',
    icon: 'i-heroicons-cog-6-tooth',
    to: '/settings',
  }
]
</script>

<template>
  <div class="flex min-h-screen">
    <div class="flex flex-col min-h-screen" style="border-right: 1px solid #DDD;">
      <div class="flex items-center justify-center h-16">
        <h1 class="font-bold"><UIcon name="i-heroicons-book-open-solid" /> NoveLLM</h1>
      </div>

      <div class="flex flex-col h-full p-2">
        <UVerticalNavigation :links="novelsLinks"/>
        <div class="flex-1"/>
        <UDivider class="stick bottom-0 my-2"/>
        <UVerticalNavigation :links="navLinks"/>
      </div>
    </div>

    <slot/>
  </div>

</template>


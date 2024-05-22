<script setup lang="ts">
const novelsStore = useNovelsStore()
const novelId = Number(useRoute().params.id)
const novel = novelsStore.novels.find(novel => novel.id === novelId)

const links = [{
  label: 'Content',
  icon: 'i-heroicons-pencil-square',
  to: `/novel/${novelId}/content`,
}, {
  label: 'Characters',
  icon: 'i-heroicons-user-group',
  to: `/novel/${novelId}/characters`,
}, {
  label: 'Settings',
  icon: 'i-heroicons-cog-6-tooth',
  to: `/novel/${novelId}/settings`,
}]
</script>

<template>
  <div class="w-full">
    <div class="h-screen">
      <h1 class="text-xl font-bold p-4">
        {{ novel.title }}
      </h1>

      <div class="py-0 px-1.5 overflow-x-auto" style="border-bottom: 1px solid #DDD;">
        <UHorizontalNavigation :links="links"/>
      </div>

      <NuxtPage/>
    </div>
  </div>
</template>
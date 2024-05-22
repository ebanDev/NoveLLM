<script setup lang="ts">
const novelsStore = useNovelsStore()
const novelId = Number(useRoute().params.id)
const novel = novelsStore.novels.find(novel => novel.id === novelId)

const deleteNovel = () => {
  novelsStore.deleteNovel(novelId)
  navigateTo('/')
}

</script>

<template>
  <div class="pb-24 p-4">
    <div class="flex flex-col space-y-4">
      <UFormGroup label="Title">
        <UInput v-model="novel.title" />
      </UFormGroup>
      <UFormGroup label="Tags">
        <UInput v-model="novel.tags" />
      </UFormGroup>
      <UFormGroup label="Description">
        <UTextarea v-model="novel.description" resize />
      </UFormGroup>
      <UFormGroup label="Delete">
        <UButton label="Delete" icon="i-heroicons-trash" class="p-2" @click="deleteNovel" />
      </UFormGroup>
    </div>
  </div>
</template>

<style scoped>

</style>
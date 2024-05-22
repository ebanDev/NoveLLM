<script setup lang="ts">
const novelsStore = useNovelsStore()
const novelId = Number(useRoute().params.id)
const novel = novelsStore.novels.find(novel => novel.id === novelId)


const columns = [
  {key: 'name', label: 'Name'},
  {key: 'description', label: 'Description'},
  {key: 'pronouns', label: 'Pronouns'},
  {key: 'actions', label: 'Actions'},
]

const addCharacter = () => {
  novel!.characters.push({
    name: '',
    description: '',
    pronouns: '',
  })
}
</script>

<template>
  <div class="pb-24 p-4">
    <UTable :columns="columns" :rows="novel.characters">
      <template #name-data="{ row }">
        <UInput v-model="row.name" class="w-32"/>
      </template>
      <template #description-data="{ row }">
        <UTextarea v-model="row.description" class="w-2xl" resize/>
      </template>
      <template #pronouns-data="{ row }">
        <UInput v-model="row.pronouns" class="w-24"/>
      </template>
      <template #actions-data="{ row }">
        <UButton label="Delete" icon="i-heroicons-trash" class="p-2"
                 @click="novel.characters.splice(novel.characters.indexOf(row), 1)"/>
      </template>
    </UTable>
    <UButton label="Add Character" icon="i-heroicons-user-plus" class="mt-4 p-2 w-max" @click="addCharacter"/>
  </div>
</template>

<style scoped>

</style>
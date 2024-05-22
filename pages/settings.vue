<script setup lang="ts">
import {HfInference} from "@huggingface/inference";

const novelsStore = useNovelsStore()
const newModelInput = ref("")
const isPulling = ref(false)
const pullButtonValue = ref("Add")
const deleteModelInput = ref("")
const isOpen = ref(false)
const errorMessage = ref('')

const addModel = async () => {
  isPulling.value = true
  pullButtonValue.value = "Pulling";

  try {
    const hf = new HfInference(novelsStore.hfToken)
    await hf.textGeneration({
      model: newModelInput.value,
      inputs: "Hello",
      parameters: {
        max_new_tokens: 10,
      }
    })
    novelsStore.currentModel = newModelInput.value;
    novelsStore.models.push(newModelInput.value);
  } catch (e) {
    isOpen.value = true;
    errorMessage.value = e;
    console.error(e);
  }

  pullButtonValue.value = "Pull";
  isPulling.value = false
}

const deleteModel = async () => {
  const index = novelsStore.models.indexOf(deleteModelInput.value);
  if (index > -1) {
    novelsStore.models.splice(index, 1);
  }
}
</script>

<template>
  <UModal v-model="isOpen">
    <div class="p-4">
      <p>{{ errorMessage }}</p>
    </div>
  </UModal>

  <div class="pb-24 space-y-4 m-12 ml-auto mr-auto">
      <UFormGroup label="Model"
                  description="The model used to generate the novels."
                  class="grid grid-cols-2 gap-8 items-center">
        <USelect v-model="novelsStore.currentModel" :options="novelsStore.models" size="md"/>
      </UFormGroup>
      <UFormGroup label="Add a model from a HuggingFace"
                  description = "Model from HuggingFace available from the Inferencing API."
                  class="grid grid-cols-2 gap-8 items-center"
                  :ui="{ container: 'flex items-center gap-3', help: 'mt-0' }">
        <UInput v-model="newModelInput" placeholder="Model name" size="md" class="w-full" />
        <UButton :label="pullButtonValue" @click="addModel" size="md" :loading="isPulling"/>
      </UFormGroup>
      <UFormGroup label="Delete a model"
                  description = "Delete a model from the list of models."
                  class="grid grid-cols-2 gap-8 items-center"
                  :ui="{ container: 'flex items-center gap-3', help: 'mt-0' }">
        <USelect v-model="deleteModelInput" :options="novelsStore.models" size="md" class="w-full" />
        <UButton label="Delete" @click="deleteModel" size="md"/>
      </UFormGroup>
      <UFormGroup label="Prompt"
                  description="The prompt used to generate the novels."
                  class="grid grid-cols-2 gap-8 items-center">
        <UTextarea v-model="novelsStore.currentPrompt" size="md" resizable :rows="10" class="h-max" />
     </UFormGroup>
     <UFormGroup label="HuggingFace Token"
                 description="The HuggingFace token used to connect to the API."
                 class="grid grid-cols-2 gap-8 items-center">
       <UInput v-model="novelsStore.hfToken" size="md"/>
      </UFormGroup>
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
import { HfInference } from '@huggingface/inference'

const novelsStore = useNovelsStore()
const novelId = Number(useRoute().params.id)
const novel = novelsStore.novels.find(novel => novel.id === novelId)
const isGenerating = ref(false)
const hf = new HfInference(novelsStore.hfToken)

const generateStory = async () => {
  isGenerating.value = true

  const prompt = `${novelsStore.currentPrompt}
        # Novel metadata :

        Characters :

        ${novel.characters.map(character => `${character.name} : ${character.description}`).join('\n')}

        Tags : [${novel.tags}]

        Description : ${novel.description}

        # ${novel.title}

        ${novel.content}
        `

  for await (const output of hf.textGenerationStream({
    model: novelsStore.currentModel,
    inputs: prompt,
    parameters: {
      max_new_tokens: novelsStore.maxNewTokens,
    }
  })) {
    novel.content += output.token.text
  }

  isGenerating.value = false
}
</script>

<template>
  <textarea v-model="novel.content" class="w-full max-w-4xl p-8 ml-auto" style="height: calc(100% - 160px); resize: none; margin-left: calc(50% - 28rem);"/>
  <div class="flex justify-end p-2 space-x-4 items-center">
    <span>Tokens to be generated : </span>
    <UInput v-model="novelsStore.maxNewTokens" type="number" class="w-24"/>

    <UButton
        type="submit"
        :label="isGenerating ? 'Generating...' : 'Generate'"
        icon="i-heroicons-sparkles"
        class=""
        :loading="isGenerating"
        @click="generateStory"
    />
  </div>
</template>

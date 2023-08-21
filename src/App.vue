<script setup lang="ts">
import ToolBox from './components/organism/ToolBox.vue'
import PinMap from './components/organism/PinMap.vue'
import { onMounted } from 'vue'
import { useBoardStore } from './stores/board.store'
import { storeToRefs } from 'pinia'
const boardStore = useBoardStore()
const { image, tags } = storeToRefs(boardStore)

onMounted(() => {
  const saveImage = localStorage.getItem('tag-me-up-image')
  const saveTags = localStorage.getItem('tag-me-up-tags')
  if (saveImage && saveTags) {
    image.value = JSON.parse(saveImage)
    tags.value = JSON.parse(saveTags)
  }
})

</script>

<template> 
  <main>
    <ToolBox />
    <PinMap /> 
  </main>
</template>

<style scoped></style>

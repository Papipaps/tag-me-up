<template>
  <div class="tag-modal-wrapper">
    <p>
      Titre : <span>{{ preview.title }}</span>
    </p>
    <p>
      Coord : <span>[ {{ preview.x }} ; {{ preview.y }} ]</span>
    </p>
    <div id="tag-modal-description"></div>
    <ColorPicker :default-color="preview.color"></ColorPicker>
    <!-- TODO : AJOUTER UNE DIV ACTION AVEC DES BOUTONS SUPPRIMER/MODIFIER/AUTRES -->
    <div class="tag-actions">
      <Button @click="handleUpdate" label="Modifier"></Button>
      <Button @click="handleDelete" label="Supprimer"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from '@/stores/board.store'
import type { Tag } from './PinMap.vue'
import Button from 'primevue/button'
import ColorPicker from 'primevue/colorpicker'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
interface Props {
  preview: Tag
}
const { preview } = defineProps<Props>()
function handleUpdate() {
  
}
function handleDelete() {
  tags.value = tags.value.filter((tag) => tag.id !== preview.id)
}
const boardStore = useBoardStore()
const { tags } = storeToRefs(boardStore)
onMounted(() => {
  const parent = document.getElementById('tag-modal-description')
  parent?.insertAdjacentHTML('afterend', preview.description)
})
</script>

<style scoped></style>

<template>
  <div class="tag-modal-wrapper">
    <div
      id="tag-modal-description"
      class="tag-modal-description"
    />
    <!-- TODO : AJOUTER UNE DIV ACTION AVEC DES BOUTONS SUPPRIMER/MODIFIER/AUTRES -->
    <div class="tag-actions">
      <Button
        label="Modifier"
        @click="handleUpdate"
      />
      <Button
        label="Supprimer"
        @click="handleDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board.store'
import Button from 'primevue/button'
import type { Tag } from './PinMap.vue'

interface Props {
  preview: Tag
}

const boardStore = useBoardStore()
const { tags } = storeToRefs(boardStore)
const { preview } = defineProps<Props>()

function handleUpdate() {}

function handleDelete() {
  tags.value = tags.value.filter((tag) => tag.id !== preview.id)
}

onMounted(() => {
  const parent = document.getElementById('tag-modal-description')
  parent?.insertAdjacentHTML('afterend', preview.description)
})
</script>

<style scoped>
.tag-modal-wrapper {
}

.tag-modal-description {
  border: 1px solid rgba(125, 125, 125, 0.3);
  padding: 10px;
  margin: 20px 0;
  border-radius: 5px;
}
</style>

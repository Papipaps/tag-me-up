<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useBoardStore } from './stores/board.store'
import { storeToRefs } from 'pinia'
import { PrimeIcons } from 'primevue/api'

import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

import PinMap, { type Tag } from './components/organism/PinMap.vue'
import ToolBox from './components/organism/ToolBox.vue'
import PinList from './components/organism/PinList.vue'
import TagModal from './components/organism/TagModal.vue'

const boardStore = useBoardStore()
const { image, tags } = storeToRefs(boardStore)
const isDialogVisible = ref<boolean>(false)
const preview = ref<Tag | null>()

function handleTagSelection(id: string) {
  const previewTag = tags.value.find((tag) => tag.id === id)
  if (previewTag) {
    preview.value = previewTag
    isDialogVisible.value = true
  }
}

function toggleDialog() {
  isDialogVisible.value = !isDialogVisible.value
}
function handleDialogClose() {
  preview.value = null
}
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
    <div
      v-show="!isDialogVisible"
      class="toggle-pin-list"
      @click="toggleDialog"
    >
      <Button
        :icon="PrimeIcons.CHEVRON_LEFT"
        rounded
        aria-label="Filter"
        style="border: 1px solid black;"
      />
    </div>
    <ToolBox />
    <PinMap @click-tag="handleTagSelection" />
    <section>
      <Dialog    
        v-if="preview"
        v-model:visible="isDialogVisible"
        :dismissable-mask="true"
        :header="preview.title"
        maximizable
        close-on-escape
        modal
        @after-hide="handleDialogClose"
      >
        <TagModal :preview="preview" />
      </Dialog>
      <Dialog
        v-else
        v-model:visible="isDialogVisible"
        maximizable
        position="right"
        close-on-escape
        modal
        :dismissable-mask="true"
      >
        <template #header>
          <h3>
            Retrouvez ici toutes vos épingles
            <br>
            <small style="font-weight: lighter;">plus pratique que de chercher sur l'image 😎✌️</small>
          </h3>
        </template>
        <PinList
          :tags="tags"
          @click-tag="handleTagSelection"
        />
        <template #footer>
          <Button
            label="Tout Supprimer"
            icon="pi pi-times"
            severity="danger"
            raised
          />
        </template>
      </Dialog>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.toggle-pin-list {
  position: absolute;
  z-index: 10;
  right: 2vw;
  top: 50vh;
  transition: ease-in-out 100ms;

  &:hover {
    scale: 1.1;
  }
}
</style>

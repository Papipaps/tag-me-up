<script setup lang="ts">
import ToolBox from './components/organism/ToolBox.vue'
import PinMap, { type Tag } from './components/organism/PinMap.vue'
import { computed, onMounted, ref } from 'vue'
import { useBoardStore } from './stores/board.store'
import { storeToRefs } from 'pinia'
import PinList from './components/organism/PinList.vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import TagModal from './components/organism/TagModal.vue'
const boardStore = useBoardStore()
const { image, tags } = storeToRefs(boardStore)
const isDialogVisible = ref<boolean>(false)
const preview = ref<Tag | null>()

function handleTagSelection(id: string) {
  const previewTag = tags.value.find((tag) => tag.id === id)
  if (previewTag) {
    console.log(previewTag)
    preview.value = previewTag
    isDialogVisible.value=true
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
    <div v-show="!isDialogVisible" class="toggle-pin-list" @click="toggleDialog">
      <Button icon="pi pi-check" rounded outlined aria-label="Filter"></Button>
    </div>
    <ToolBox />
    <PinMap @click-tag="handleTagSelection" />
    <section>
      <Dialog
        maximizable
        v-model:visible="isDialogVisible"
        close-on-escape
        modal
        :dismissableMask="true"
        @after-hide="handleDialogClose"
        v-if="preview"
      >
        <TagModal :preview="preview" />
      </Dialog>
      <Dialog
        v-else
        maximizable
        position="right"
        v-model:visible="isDialogVisible"
        close-on-escape
        modal
        :dismissableMask="true"
      >
        <template #header>
          <h3>
            Retrouvez ici toutes vos épingles <br />
            (plus pratique que de chercher sur l'image 😎✌️)
          </h3>
        </template>
        <PinList @click-tag="handleTagSelection" :tags="tags" />
        <template #footer>
          <Button label="Tout Supprimer" icon="pi pi-times" severity="danger" raised></Button>
        </template>
      </Dialog>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.p-dialog {
  // width: 50vw;
}
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

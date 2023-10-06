<template>
  <Toast
    position="top-right"
    group="br"
  />
  <div class="actions">
    <FileUpload
      name="demo[]"
      mode="basic"
      accept="image/*"
      choose-label="Importer une image"
      :max-file-size="10000000"
      @select="handleSelect($event, 'select')"
    >
      <template #empty>
        <img src="/not_found.jpg">
      </template>
    </FileUpload>
    <FileUpload
      choose-label="Importer JSON"
      name="demo[]"
      mode="basic"
      accept="application/json"
      :max-file-size="10000000"
      @select="handleSelect($event, 'import')"
    />
    <Button
      label="Save"
      severity="success"
      @click="exportBoard"
    />
    <Button
      label="Clear"
      severity="danger"
      @click="clearBoard"
    />
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useBoardStore } from '@/stores/board.store'
import { storeToRefs } from 'pinia'
import { downloadJSONFromLocalStorage, saveDataToLocalStorage } from '@/utils/save'
import Button from 'primevue/button'
import Toast from 'primevue/toast'

const backgroundStore = useBoardStore()

const { image, tags: tags } = storeToRefs(backgroundStore)
const toast = useToast()

function handleSelect(e: any, mode: 'import' | 'select') {
  const file = e.originalEvent.target.files[0]
  const reader = new FileReader()
  if (mode === 'select') reader.readAsDataURL(file)
  if (mode === 'import') reader.readAsText(file)

  reader.onloadend = () => {
    const data = reader.result as string
    if (data) {
      if (mode === 'select') {
        image.value = data
      } else if (mode === 'import') {
        const fileContent = JSON.parse(data as string)
        image.value = JSON.parse(fileContent.image)
        tags.value = JSON.parse(fileContent.tags)
        saveDataToLocalStorage('tag-me-up-image', image.value)
        saveDataToLocalStorage('tag-me-up-tags', tags.value)
      }
    }
  }
}

function clearBoard() {
  localStorage.removeItem('tag-me-up-image')
  localStorage.removeItem('tag-me-up-tags')
  const pinList = document.getElementById('board')
  if (pinList) {
    const tagElements = pinList.querySelectorAll('.tag')
    tagElements.forEach(function (element) {
      element.remove()
    })
  }
  tags.value = []
  image.value = ''
}

function exportBoard() {
  if (image.value !== '') {
    downloadJSONFromLocalStorage().then(() => {
      toast.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Tableau enregistré avec succes !',
        group: 'br',
        life: 3000,
      })
    })
  } else {
    toast.add({
      severity: 'error',
      summary: 'Action impossible',
      detail: 'Aucun tableau à enregistrer',
      group: 'br',
      life: 3000,
    })
  }
}
</script>
<style lang="scss" scoped>
.actions {
  display: flex;
  margin: 5px;
  gap: 5px;
}
</style>

<template>
  <Toast position="top-right" group="br" />
  <div class="actions">
    <FileUpload
      @select="handleSelect($event, 'select')"
      name="demo[]"
      mode="basic"
      accept="image/*"
      chooseLabel="Importer une image"
      :maxFileSize="10000000"
    >
      <template #empty>
        <p>Drag and drop files to here to upload.</p>
        <img src="/not_found.jpg" />
      </template>
    </FileUpload>
    <FileUpload
      chooseLabel="Importer JSON"
      @select="handleSelect($event, 'import')"
      name="demo[]"
      mode="basic"
      accept="application/json"
      :maxFileSize="10000000"
    >
    </FileUpload>
    <Button label="Save" @click="exportBoard" severity="success"></Button>
    <Button label="Clear" @click="clearBoard" severity="danger"></Button>
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
    var tagElements = pinList.querySelectorAll('.tag')
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
        life: 3000
      })
    })
  } else {
    toast.add({
      severity: 'error',
      summary: 'Action impossible',
      detail: 'Aucun tableau à enregistrer',
      group: 'br',
      life: 3000
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

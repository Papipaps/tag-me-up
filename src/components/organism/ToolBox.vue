<template>
  <Toast position="top-right" group="br" />
  <div class="card">
    <FileUpload
      @select="handleSelect($event)"
      name="demo[]"
      mode="basic"
      accept="image/*"
      :maxFileSize="1000000"
    >
      <template #empty>
        <p>Drag and drop files to here to upload.</p>
        <img src="/not_found.jpg" />
      </template>
    </FileUpload>
    <Button label="Save" @click="exportBoard"></Button>
    <Button label="Load with JSON" @click="importBoard"></Button>
    <Button label="Clear" @click="clearBoard"></Button>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useBoardStore } from '@/stores/board.store'
import { storeToRefs } from 'pinia'
import { downloadJSONFromLocalStorage } from '@/utils/save'
import Button from 'primevue/button'
import Toast from 'primevue/toast'

const backgroundStore = useBoardStore()
const { image, tags } = storeToRefs(backgroundStore)
const toast = useToast()

function handleSelect(e: any) {  const files = e.originalEvent.target.files
  const reader = new FileReader()
  const file = files[0]
  reader.readAsDataURL(file)
  reader.onloadend = () => {
    if (reader.result) image.value = reader.result
  }
}
function importBoard() {
  
}

function clearBoard() {
  localStorage.removeItem('tag-me-up-image')
  localStorage.removeItem('tag-me-up-tags')
  tags.value = []
  image.value = ''
}

function exportBoard() {
  if (image.value && image.value !== '') {
    downloadJSONFromLocalStorage().then(() => {
      toast.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Message Content',
        group: 'br',
        life: 3000
      })
    })
  } else {
    toast.add({
      severity: 'error',
      summary: 'Success Message',
      detail: 'Message Content',
      group: 'br',
      life: 3000
    })
  }
}
</script>

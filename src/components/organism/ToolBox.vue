<script setup lang="ts">
import { PrimeIcons } from 'primevue/api'
import { useToast } from 'primevue/usetoast'
import { useBoardStore } from '@/stores/board.store'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { downloadJSONFromLocalStorage, saveDataToLocalStorage } from '@/utils/save'
import Button from 'primevue/button'
import Toast from 'primevue/toast'

const { t } = useI18n()
const backgroundStore = useBoardStore()

const { image, tags: tags } = storeToRefs(backgroundStore)
const toast = useToast()

function handleSelect(e: any, mode: 'json' | 'image') {
  const file = e.target.files[0]
  const reader = new FileReader()
  if(!file) return
  if (mode === 'image') reader.readAsDataURL(file)
  if (mode === 'json') reader.readAsText(file)

  reader.onloadend = () => {
    const data = reader.result as string
    if (data) {
      if (mode === 'image') {
        image.value = data
      } else if (mode === 'json') {
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
<template>
  <Toast
    position="top-right"
    group="br"
  />
  <div class="actions">
    <Button
      v-tooltip.top="$t('load')"
      class="upload-wrapper-btn"
    >
      <label
        for="imageUpload"
        :class="PrimeIcons.IMAGE "
        style="font-size: 1.5rem"
      >
        <input
          @change="handleSelect($event,'image')"
          type="file"
          id="imageUpload"
          accept="image/*"
          style="display: none"
        >
      </label>
    </Button>
    <Button
      v-tooltip.top="$t('import')"
      class="upload-wrapper-btn"
    >
      <label
        for="imageUpload"
      >
        <i
          :class="PrimeIcons.DOWNLOAD"
          style="font-size: 1.5rem"
        />
      </label>
      <input
        @change="handleSelect($event,'json')"
        type="file"
        id="imageUpload"
        accept="application/json"
        style="display: none"
      >
    </Button>
    <Button
      :icon="PrimeIcons.SAVE"
      v-tooltip.top="$t('save')"
      severity="success"
      @click="exportBoard"
    />
    <Button
      :icon="PrimeIcons.REFRESH"
      v-tooltip.top="$t('clear')"
      severity="danger"
      @click="clearBoard"
    />
  </div>
</template>

<style lang="scss" scoped>
.actions {
  button {
    cursor: pointer;
  }
  &:hover{
    opacity: 1;
  }
  transition: ease-in 200ms;
  opacity: 0.7;
  position: absolute;
  bottom: 2vh;
  background-color: white;
  padding: 20px;
  display: flex;
  left: 50%;
  transform: translateX(-50%);
  gap: 5px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.3);
}
</style>

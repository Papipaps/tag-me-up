<template>
  <section>
    <div>
      <Dialog
        @after-hide="handleDialogClose"
        :dismissableMask="true"
        v-model:visible="visible"
        modal
        header="Header"
        :style="{ width: '50vw' }"
      >
        <div class="card flex justify-content-center">
          <template v-if="!preview">
            <div class="flex flex-column gap-2">
              <label for="title">Title :{{ title }}, Coord [{{ x }};{{ y }}]</label>
              <InputText id="title" v-model="title" aria-describedby="title-help" />
              <small id="title-help">Donner un nom à l'épingle.</small>
            </div>
            <Button label="Confirmer" :disabled="isError" @click="handlePin"></Button>
            <p v-show="isError">Le titre ne peut pas être vide.</p>
          </template>
          <template v-else>
            <div>
              {{ preview }}
              <!-- TODO : AJOUTER UNE DIV ACTION AVEC DES BOUTONS SUPPRIMER/MODIFIER/AUTRES -->
            </div>
          </template>
        </div>
      </Dialog>
      <div id="pin-list" class="pin-list">
        <!-- Liste des épingles -->
        <!-- <canvas @click="toggleDialog" ref="canvas"></canvas> -->
        <img @click="toggleDialog" :src="handleEmptyImage" ref="boardImg" />
      </div>
    </div>
    <div>
      <PinList @highlight-point="handleHighlightPoint" :tags="board?.tags" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useBoardStore } from '@/stores/board.store'
import { storeToRefs } from 'pinia'
import { saveDataToLocalStorage } from '@/utils/save'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import PinList from './PinList.vue'
import { v4 as uuidv4 } from 'uuid'

export interface Settings {
  image: string
  tags: Tag[]
}
export interface Tag {
  id: string
  title: string
  x: number
  y: number
}
const boardStore = useBoardStore()
const { image, tags } = storeToRefs(boardStore)
const board = ref<Settings>()
const x = ref<number>()
const y = ref<number>()
const title = ref<string>('')
const preview = ref<Tag | null>(null)
const visible = ref<boolean>(false)

function toggleDialog(event: MouseEvent) {
  if (image.value) {
    x.value = event.clientX
    y.value = event.clientY
    visible.value = !visible.value
  }
}
function handleDialogClose() {
  preview.value = null
}

function handleHighlightPoint(id: string) {
  const preview = document.getElementById(id)
  if (preview) {
    const mouseEnterEvent = new MouseEvent('mouseover', {
      bubbles: true,
      cancelable: true
    })

    preview.dispatchEvent(mouseEnterEvent)

    setTimeout(() => {
      const mouseLeaveEvent = new MouseEvent('mouseleave', {
        bubbles: true,
        cancelable: true
      })

      preview.dispatchEvent(mouseLeaveEvent)
    }, 500)
  }
}

function handlePin() {
  if (board.value && x.value && y.value) {
    visible.value = true
    const pinTittle = title.value
    const id = uuidv4()
    const newPoint = { id: id, title: pinTittle, x: x.value, y: y.value }
    createPoint(newPoint)
    board.value?.tags.push(newPoint)
    saveDataToLocalStorage('tag-me-up-image', board.value.image)
    saveDataToLocalStorage('tag-me-up-tags', board.value.tags)
    handleHighlightPoint(id)
    x.value = 0
    y.value = 0
    title.value = ''
    visible.value = false
  }
}

function createPoint(point: Tag) {
  const wrapper = document.getElementById('pin-list')
  const span = document.createElement('span')
  span.title = point.title
  span.className = 'tag'
  span.id = point.id
  span.onclick = () => handleClick(point.id)

  span.style.position = 'absolute'
  span.style.left = `${point.x}px`
  span.style.top = `${point.y}px`
  span.style.transition = 'ease-in-out 100ms'

  span.onmouseover = () => {
    span.style.outlineOffset = '.6rem'
    span.style.outline = '2px solid lightsalmon'

    span.style.cursor = 'pointer'
    span.style.scale = '1.3'
    span.style.backgroundColor = 'lightsalmon'
  }
  span.onmouseleave = () => {
    span.style.outline = 'none'
    span.style.scale = '1'
    span.style.backgroundColor = 'red'
  }

  span.style.zIndex = '10'
  span.style.width = '20px'
  span.style.height = '20px'
  span.style.borderRadius = '50%'
  span.style.backgroundColor = 'red'

  wrapper?.appendChild(span)
}
function handleClick(id: string) {
  const previewTag = board.value?.tags.find((tag) => tag.id === id)
  if (previewTag) {
    preview.value = previewTag
    visible.value = true
  }
}

watch(
  [image],
  () => {
    board.value = { image: image.value.toString(), tags: tags.value }
    tags.value.map((tag) => {
      createPoint(tag)
    })
  },
  { immediate: true }
)

const isError = computed(() => title.value.length === 0)
const handleEmptyImage = computed(() => {
  if (!image.value || image.value === '') {
    return '/not_found.jpg'
  }
  return board.value?.image
})
</script>

<style scoped lang="scss">
.pin-list {
  img {
    border: 1px solid red;
    width: 800px;
    height: 800px;
    object-fit: contain;
  }
}
section {
  display: flex;
}
</style>

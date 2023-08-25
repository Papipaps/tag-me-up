<template>
  <section>
    <div>
      <Dialog
        @after-hide="handleDialogClose"
        :dismissableMask="true"
        v-model:visible="visible"
        header="Ajoutez une nouvelle épingle"
        modal
      >
        <form @submit.prevent="">
          <label for="title">Titre</label>
          <InputText
            id="title"
            v-model="newTag.title"
            aria-describedby="title-help"
            placeholder="..."
          />
          <br />
          <label for="title">Ajoutez une description</label>
          <Editor editor-style="height: 350px" id="description" v-model="newTag.description" />
          <div class="pen-tool">
            <label for="color">Couleur</label>
            <ColorPicker v-model="settings.color" for="color"></ColorPicker>
            <label for="size">Taille</label>
            <div class="pen-tool-size">
              <span
                v-for="(size, index) in tagSizes"
                :key="index"
                :style="{ width: size, height: size }"
                @click="changePinSize(size)"
              ></span>
            </div>
          </div>
        </form>
        <Button label="Confirmer" :disabled="isError" @click="handleCreateTag"></Button>
        <p v-show="isError" class="error-msg">Le titre ne peut pas être vide.</p>
      </Dialog>
      <div id="board" class="board">
        <!-- Liste des épingles -->
        <img @click="handleClick" :src="getBackgroundImg" ref="boardImg" />
      </div>
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
import { v4 as uuidv4 } from 'uuid'
import { useSettingsStore } from '@/stores/settings.store'
import Editor from 'primevue/editor'

export interface Board {
  image: string
  tags: Tag[]
}

export interface Tag {
  id: string
  title: string
  description: string
  x: number
  y: number
  size: string
  color: string
}
const initialState: Tag = {
  color: '',
  description: '',
  id: '',
  size: '',
  title: '',
  x: 0,
  y: 0
}
const settingsStore = useSettingsStore()
const boardStore = useBoardStore()
const { image, tags } = storeToRefs(boardStore)
const { settings } = storeToRefs(settingsStore)
const board = ref<Board>()
const newTag = ref<Tag>(initialState)
const visible = ref<boolean>(false)
const tagSizes = {
  small: '15px',
  medium: '20px',
  large: '25px'
}
const emit = defineEmits(['click-tag'])

function handleClick(event: MouseEvent) {
  if (image.value) {
    newTag.value.x = event.clientX
    newTag.value.y = event.clientY
    visible.value = !visible.value
  }
}

// TODO : REFAIRE CA AU PROPRE
// ( UTILISER LA REACTIVITÉ AVEC L'OBJECT NEWTAG -> INITIALSTATE)
function handleDialogClose() {
  newTag.value.title = ''
  newTag.value.description = ''
}

function changePinSize(size: string) {
  settings.value.size = size
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

function handleCreateTag() {
  if (board.value && newTag.value) {
    visible.value = true
    const tagTitle = newTag.value.title
    const id = uuidv4()
    newTag.value = {
      ...newTag.value,
      id: id,
      title: tagTitle,
      size: settings.value.size,
      color: '#' + settings.value.color
    }
    createPoint(newTag.value)
    board.value?.tags.push(newTag.value)
    saveDataToLocalStorage('tag-me-up-image', board.value.image)
    saveDataToLocalStorage('tag-me-up-tags', board.value.tags)
    handleHighlightPoint(id)
    newTag.value = initialState
    visible.value = false
  }
}

function createPoint(point: Tag) {
  const wrapper = document.getElementById('board')
  const span = document.createElement('span')
  span.title = point.title
  span.className = 'tag'
  span.id = point.id
  span.onclick = () => emit('click-tag', point.id)

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
    span.style.backgroundColor = point.color || 'white'
  }

  span.style.zIndex = '10'
  span.style.width = point.size
  span.style.height = point.size
  span.style.borderRadius = '50%'
  span.style.backgroundColor = point.color || 'white'

  wrapper?.appendChild(span)
}

watch(
  [image],
  () => {
    // saveDataToLocalStorage('tag-me-up-image', image)
    board.value = { image: image.value.toString(), tags: tags.value }
    tags.value.map((tag) => {
      createPoint(tag)
    })
  },
  { immediate: true }
)

const isError = computed(() => newTag.value.title.length === 0)
const getBackgroundImg = computed(() => {
  if (!image.value || image.value === '') {
    return '/not_found.jpg'
  }
  return board.value?.image
})
</script>

<style scoped lang="scss">
.board {
  img {
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    width: 800px;
    height: 800px;
    object-fit: contain;
  }
}
section {
  display: flex;
}
.error-msg {
  color: red;
}

.pen-tool {
  display: flex;
}
.pen-tool-size {
  display: flex;
  align-items: center;
  gap: 5px;
  span {
    margin: 0 5px;
    &:hover {
      cursor: pointer;
    }
    border-radius: 50%;
    background-color: black;
    border: '1px solid red';
  }
}
</style>

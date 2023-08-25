<template>
  <ul class="pin-list" v-if="tags">
    <li v-for="tag in tags" :key="tag.id">
      <PinCard :tag="tag" @click="openTag(tag.id)" @mouseover="highlightPoint(tag.id)" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Tag } from './PinMap.vue'
import PinCard from './PinCard.vue'

interface Props {
  tags?: Tag[]
}
const { tags } = defineProps<Props>()
const emit = defineEmits(['click-tag'])

function highlightPoint(id: string) {
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

function openTag(id: string) {
  emit('click-tag', id)
}
</script>

<style scoped lang="scss">
.pin-list {
  border: 1px solid blue;
  background: white;
  border-radius: 5px;
  list-style: none;
  padding: 0 10px;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(200px, 1fr)
  ); /* Changez les valeurs selon vos besoins */
  li {
    margin-bottom: 5px;
    background: white;
    &:hover {
      cursor: pointer;
      filter: brightness(0.9);
    }
  }
}
</style>

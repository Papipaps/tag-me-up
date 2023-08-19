<template>
  <div>PinList</div>
  <ul v-if="tags">
    <li v-for="tag in tags" :key="tag.id">
      <p @mouseover="highlightPoint(tag.id)">{{ tag.title }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Tag } from './PinMap.vue'

interface Props {
  tags?: Tag[]
}
const { tags } = defineProps<Props>()
const emit = defineEmits(['highlight-point'])
function highlightPoint(id: string) {
  emit('highlight-point', id)
}
</script>

<style scoped lang="scss">
ul {
  background: white;
  border: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  list-style: none;
  min-width: 100px;
  padding: 0 10px;
}
li {
  margin-bottom: 5px;
  height: 100%;
  background: white;
  &:hover {
    cursor: pointer;
    filter: brightness(0.9);
  }
}
</style>

<template>
  <div class="card flex align-items-center justify-content-center">
    <Card>
      <template #header>
        <div class="card-wrapper" :style="{ backgroundColor: tag.color }"></div>
      </template>
      <template #title> {{ tag.title }} </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card' 
import type { Tag } from './PinMap.vue' 

interface Props {
  tag: Tag
}
const { tag } = defineProps<Props>()
</script>

<style scoped lang="scss">
.card-wrapper{
  height: 25px;
}
.p-card {
  width: 200px;
  height: 100px;
  background: white;
  img {
    width: 100%;
    object-fit: cover;
  }
}
</style>

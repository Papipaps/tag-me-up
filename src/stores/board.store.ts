import type { Settings, Tag } from '@/components/organism/PinMap.vue'
import { defineStore } from 'pinia'

export const useBoardStore = defineStore('boardStore', {
  state: () => ({ image: '', tags: [] }) as Settings,
  actions: {
    updateBoard(imageAsBase64: ArrayBuffer | String, tags:Tag[]) {
      this.image = imageAsBase64
      this.tags = [...tags]
    }
  }
})

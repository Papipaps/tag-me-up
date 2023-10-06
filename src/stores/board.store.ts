import type { Board, Tag } from '@/components/organism/PinMap.vue'
import { defineStore } from 'pinia'

export const useBoardStore = defineStore('boardStore', {
  state: () => ({ image: '', tags: [] }) as Board,
  actions: {
    updateBoard(imageAsBase64: string, tags: Tag[]) {
      this.image = imageAsBase64
      this.tags = [...tags]
    },
  },
})

import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const STORE_NAME = 'useSettings'

interface Settings {
  size: string
  color: string
}

export const useSettingsStore = defineStore(STORE_NAME, {
  state: () => ({
    settings: useStorage(STORE_NAME, {
      size: '15px',
      color: 'white',
    } as Settings),
  }),
  actions: {
    updateSettings(partialSettings: Record<string, any>) {
      this.settings = {
        ...this.settings,
        ...partialSettings,
      }
    },
  },
})

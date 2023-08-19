import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const STORE_NAME = 'tmuSettings'

interface Settings {
  background: string
}

export const useSettingsStore = defineStore(STORE_NAME, {
  state: () => ({
    settings: useStorage(STORE_NAME, {
      background: ''
    } as Settings)
  }),
  actions: {
    updateSettings(partialSettings: Record<string, any>) {
      this.settings = {
        ...this.settings,
        ...partialSettings
      }
    }
  }
})

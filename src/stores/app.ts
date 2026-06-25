import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getLanguage, setLanguage as saveLanguage } from '@/utils/storage'

export const useAppStore = defineStore('app', () => {
  const sidebarCollapsed = ref(false)
  const language = ref<string>(getLanguage() || 'zh-CN')

  function toggleSidebar(): void {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function setLanguage(lang: string): void {
    language.value = lang
    saveLanguage(lang)
  }

  return { sidebarCollapsed, language, toggleSidebar, setLanguage }
})

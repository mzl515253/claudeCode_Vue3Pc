import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'
import { getLanguage } from '@/utils/storage'

const i18n = createI18n({
  legacy: false,
  locale: getLanguage() || 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

export default i18n

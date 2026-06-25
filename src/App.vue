<template>
  <el-config-provider :locale="elLocale">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'
import zhCN from 'element-plus/es/locale/lang/zh-cn'
import enUS from 'element-plus/es/locale/lang/en'

const appStore = useAppStore()
const { locale } = useI18n()

const elLocale = computed(() => {
  return appStore.language === 'en-US' ? enUS : zhCN
})

// Sync i18n locale with app store on language change
watch(
  () => appStore.language,
  (lang) => {
    locale.value = lang
    document.documentElement.lang = lang
  },
  { immediate: true },
)
</script>

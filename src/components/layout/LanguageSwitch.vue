<template>
  <el-dropdown trigger="click" @command="handleSwitch">
    <span class="language-switch">
      <el-icon><SwitchFilled /></el-icon>
      <span class="lang-label">{{ currentLabel }}</span>
      <el-icon class="arrow"><ArrowDown /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh-CN">
          <span :class="{ 'is-active': appStore.language === 'zh-CN' }">🇨🇳 中文</span>
        </el-dropdown-item>
        <el-dropdown-item command="en-US">
          <span :class="{ 'is-active': appStore.language === 'en-US' }">🇺🇸 English</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { SwitchFilled, ArrowDown } from '@element-plus/icons-vue'

const appStore = useAppStore()

const currentLabel = computed(() => {
  return appStore.language === 'zh-CN' ? '中文' : 'EN'
})

function handleSwitch(lang: string) {
  appStore.setLanguage(lang)
}
</script>

<style scoped lang="scss">
.language-switch {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: #606266;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: #f0f2f5;
  }

  .lang-label {
    font-size: 13px;
  }

  .arrow {
    font-size: 12px;
    transition: transform 0.2s;
  }
}

.is-active {
  color: $primary-color;
  font-weight: 600;
}
</style>

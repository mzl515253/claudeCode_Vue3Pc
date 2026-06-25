<template>
  <div class="settings-page">
    <h2 class="page-title">{{ $t('settings.title') }}</h2>

    <el-row :gutter="20">
      <!-- System Info Card -->
      <el-col :xs="24" :lg="12">
        <el-card shadow="hover">
          <template #header>
            <span>{{ $t('settings.systemInfo') }}</span>
          </template>
          <el-descriptions :column="1" border>
            <el-descriptions-item :label="$t('settings.version')">
              <el-tag size="small">1.0.0</el-tag>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('settings.buildTime')">
              2026-06-25 10:00:00
            </el-descriptions-item>
            <el-descriptions-item label="Vue">
              <el-tag type="success" size="small">3.5</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="Element Plus">
              <el-tag type="primary" size="small">2.10</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="Vite">
              <el-tag type="warning" size="small">5.4</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="TypeScript">
              <el-tag type="info" size="small">5.8</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>

      <!-- Language Setting Card -->
      <el-col :xs="24" :lg="12">
        <el-card shadow="hover">
          <template #header>
            <span>{{ $t('settings.language') }}</span>
          </template>
          <div class="language-setting">
            <p class="setting-desc">{{ $t('layout.navbar.languageSwitch') }}</p>
            <el-radio-group
              :model-value="appStore.language"
              @change="handleLangChange"
            >
              <el-radio-button value="zh-CN">🇨🇳 中文</el-radio-button>
              <el-radio-button value="en-US">🇺🇸 English</el-radio-button>
            </el-radio-group>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

function handleLangChange(lang: string) {
  appStore.setLanguage(lang)
}
</script>

<style scoped lang="scss">
.settings-page {
  .page-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #303133;
  }

  .language-setting {
    .setting-desc {
      font-size: 14px;
      color: #606266;
      margin-bottom: 16px;
    }
  }
}
</style>

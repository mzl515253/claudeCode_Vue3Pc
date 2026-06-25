<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <h1 class="error-code">404</h1>
      <p class="error-title">{{ $t('error.notFound') }}</p>
      <p class="error-desc">{{ $t('error.notFoundDesc') }}</p>
      <el-button type="primary" size="large" @click="router.push('/dashboard')">
        {{ $t('error.backHome') }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped lang="scss">
.not-found-page {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;

  .not-found-content {
    text-align: center;

    .error-code {
      font-size: 120px;
      font-weight: 800;
      color: $primary-color;
      line-height: 1;
      margin-bottom: 16px;
      letter-spacing: 8px;
    }

    .error-title {
      font-size: 22px;
      font-weight: 600;
      color: #303133;
      margin-bottom: 12px;
    }

    .error-desc {
      font-size: 14px;
      color: #909399;
      margin-bottom: 32px;
    }
  }
}
</style>

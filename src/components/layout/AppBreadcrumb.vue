<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/dashboard' }">
      {{ $t('layout.breadcrumb.home') }}
    </el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in breadcrumbItems" :key="item.path">
      {{ $t(item.meta.title as string) }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbItems = computed(() => {
  return route.matched.filter((r) => r.meta?.title && r.path !== '/')
})
</script>

<template>
  <div class="app-layout">
    <div class="sidebar-container" :class="{ collapsed: appStore.sidebarCollapsed }">
      <AppSidebar />
    </div>
    <div class="right-container">
      <div class="navbar-container">
        <AppNavbar />
      </div>
      <div class="main-content">
        <router-view v-slot="{ Component }">
          <transition name="slide-left" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import AppSidebar from './AppSidebar.vue'
import AppNavbar from './AppNavbar.vue'

const appStore = useAppStore()
</script>

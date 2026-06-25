<template>
  <div class="app-sidebar">
    <!-- Logo -->
    <div class="sidebar-logo">
      <span v-show="!appStore.sidebarCollapsed" class="logo-text">
        {{ $t('login.subtitle') }}
      </span>
      <span v-show="appStore.sidebarCollapsed" class="logo-text-mini">V3</span>
    </div>

    <!-- Menu -->
    <el-menu
      :default-active="activeMenu"
      :collapse="appStore.sidebarCollapsed"
      :collapse-transition="false"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409eff"
      router
      class="sidebar-menu"
    >
      <template v-for="item in menuItems" :key="item.path">
        <el-menu-item :index="item.path">
          <el-icon>
            <component :is="iconMap[item.meta?.icon as string] || iconMap['Menu']" />
          </el-icon>
          <template #title>{{ $t(item.meta?.title as string) }}</template>
        </el-menu-item>
      </template>
    </el-menu>

    <!-- Collapse toggle -->
    <div class="sidebar-toggle" @click="appStore.toggleSidebar()">
      <el-icon :size="18">
        <Fold v-if="!appStore.sidebarCollapsed" />
        <Expand v-else />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, markRaw } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { routes } from '@/router/routes'
import {
  Odometer,
  User,
  Document,
  Setting,
  Menu,
  Fold,
  Expand,
} from '@element-plus/icons-vue'

const route = useRoute()
const appStore = useAppStore()

const iconMap: Record<string, any> = {
  Odometer: markRaw(Odometer),
  User: markRaw(User),
  Document: markRaw(Document),
  Setting: markRaw(Setting),
  Fold: markRaw(Fold),
  Expand: markRaw(Expand),
  Menu: markRaw(Menu),
}

// Extract menu items from Layout route's children (exclude hidden)
const menuItems = computed(() => {
  const layoutRoute = routes.find((r) => r.path === '/')
  if (!layoutRoute || !layoutRoute.children) return []
  return layoutRoute.children.filter((child) => !child.meta?.hidden)
})

const activeMenu = computed(() => {
  // Match the current path to the deepest menu item
  const path = route.path
  // For child routes like /user, match /user
  return path === '/' ? '/dashboard' : path
})
</script>

<style scoped lang="scss">
.app-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  user-select: none;

  .sidebar-logo {
    height: $navbar-height;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);

    .logo-text {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
      letter-spacing: 1px;
    }

    .logo-text-mini {
      font-size: 18px;
      font-weight: 700;
      color: $primary-color;
    }
  }

  .sidebar-menu {
    flex: 1;
    border-right: none;
    overflow-y: auto;
    @include scrollbar-thin;
  }

  .sidebar-toggle {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: $sidebar-text;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    transition: color 0.2s;

    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.05);
    }
  }
}
</style>

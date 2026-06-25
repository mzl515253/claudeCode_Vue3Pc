<template>
  <div class="app-navbar">
    <div class="navbar-left">
      <AppBreadcrumb />
    </div>
    <div class="navbar-right">
      <LanguageSwitch />
      <UserAvatarDropdown />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppBreadcrumb from './AppBreadcrumb.vue'
import LanguageSwitch from './LanguageSwitch.vue'
import UserAvatarDropdown from './UserAvatarDropdown.vue'
</script>

<style scoped lang="scss">
.app-navbar {
  display: flex;
  align-items: center;
  width: 100%;

  .navbar-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .navbar-right {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>

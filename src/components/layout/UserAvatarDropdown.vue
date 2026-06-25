<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <span class="user-avatar">
      <el-avatar :size="32" :src="userStore.avatar">
        <el-icon :size="18"><UserFilled /></el-icon>
      </el-avatar>
      <span class="username">{{ userStore.userInfo?.name || userStore.username }}</span>
      <el-icon class="arrow"><ArrowDown /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="userCenter">
          <el-icon><User /></el-icon>
          {{ $t('layout.navbar.userCenter') }}
        </el-dropdown-item>
        <el-dropdown-item command="logout" divided>
          <el-icon><SwitchButton /></el-icon>
          {{ $t('layout.navbar.logout') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import {
  UserFilled,
  ArrowDown,
  User,
  SwitchButton,
} from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

function handleCommand(command: string) {
  if (command === 'userCenter') {
    router.push('/user-center')
  } else if (command === 'logout') {
    userStore.logout()
  }
}
</script>

<style scoped lang="scss">
.user-avatar {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 2px 8px 2px 4px;
  border-radius: 20px;
  transition: background 0.2s;

  &:hover {
    background: #f0f2f5;
  }

  .username {
    font-size: 14px;
    color: #303133;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .arrow {
    font-size: 12px;
    color: #909399;
  }
}
</style>

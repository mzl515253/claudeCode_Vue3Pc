<template>
  <div class="user-center-page">
    <h2 class="page-title">{{ $t('userCenter.title') }}</h2>

    <el-row :gutter="20">
      <!-- Profile Card -->
      <el-col :xs="24" :lg="14">
        <el-card shadow="hover">
          <template #header>
            <span>{{ $t('userCenter.profile') }}</span>
          </template>
          <div class="profile-header">
            <el-avatar :size="72" :src="userStore.avatar">
              <el-icon :size="36"><UserFilled /></el-icon>
            </el-avatar>
            <div class="profile-name">
              <h3>{{ userStore.userInfo?.name }}</h3>
              <el-tag :type="userStore.roles.includes('admin') ? 'danger' : 'info'" size="small">
                {{ userStore.roles[0] || 'user' }}
              </el-tag>
            </div>
          </div>
          <el-divider />
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('userCenter.id')">
              {{ userStore.userInfo?.id }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('user.username')">
              {{ userStore.userInfo?.username }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('user.email')">
              {{ userStore.userInfo?.email }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('user.phone')">
              {{ userStore.userInfo?.phone }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('userCenter.role')">
              {{ userStore.roles.join(', ') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('userCenter.registerTime')">
              {{ userStore.userInfo?.createTime }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>

      <!-- Change Password Card (Stub) -->
      <el-col :xs="24" :lg="10">
        <el-card shadow="hover">
          <template #header>
            <span>{{ $t('userCenter.changePassword') }}</span>
          </template>
          <el-form label-width="100px">
            <el-form-item :label="$t('userCenter.oldPassword')">
              <el-input type="password" show-password />
            </el-form-item>
            <el-form-item :label="$t('userCenter.newPassword')">
              <el-input type="password" show-password />
            </el-form-item>
            <el-form-item :label="$t('userCenter.confirmPassword')">
              <el-input type="password" show-password />
            </el-form-item>
            <el-form-item>
              <el-button type="primary">{{ $t('common.submit') }}</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { UserFilled } from '@element-plus/icons-vue'

const userStore = useUserStore()
</script>

<style scoped lang="scss">
.user-center-page {
  .page-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #303133;
  }

  .profile-header {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 8px 0;

    .profile-name {
      h3 {
        font-size: 18px;
        margin-bottom: 8px;
      }
    }
  }
}
</style>

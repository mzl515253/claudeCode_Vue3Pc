<template>
  <div class="login-page">
    <div class="login-card-wrapper">
      <el-card class="login-card" shadow="always">
        <div class="login-header">
          <h2 class="login-title">{{ $t('login.title') }}</h2>
          <p class="login-subtitle">{{ $t('login.subtitle') }}</p>
        </div>

        <el-form
          ref="formRef"
          :model="loginForm"
          :rules="rules"
          label-position="top"
          @keyup.enter="handleLogin"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              :placeholder="$t('login.usernamePlaceholder')"
              size="large"
              clearable
            >
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              :placeholder="$t('login.passwordPlaceholder')"
              size="large"
              show-password
              clearable
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <div class="login-extra">
              <el-checkbox v-model="loginForm.remember">{{ $t('login.remember') }}</el-checkbox>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="large"
              :loading="loading"
              class="login-btn"
              @click="handleLogin"
            >
              {{ $t('login.loginBtn') }}
            </el-button>
          </el-form-item>
        </el-form>

        <div class="login-tip">
          <el-text type="info" size="small">
            Tips: username ≥ 3 chars, password ≥ 6 chars
          </el-text>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { useLoginFormRules } from '@/utils/validate'
import { setRememberCredentials, removeRememberCredentials, getRememberCredentials } from '@/utils/storage'
import { useI18n } from 'vue-i18n'
import type { FormInstance } from 'element-plus'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { t } = useI18n()
const rules = useLoginFormRules()

const savedCredentials = getRememberCredentials()
const loginForm = reactive({
  username: savedCredentials?.username || 'admin',
  password: savedCredentials?.password || 'admin123',
  remember: !!savedCredentials,
})

const formRef = ref<FormInstance>()
const loading = ref(false)

async function handleLogin() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  try {
    await userStore.login(loginForm.username, loginForm.password)

    // Handle remember me
    if (loginForm.remember) {
      setRememberCredentials(loginForm.username, loginForm.password)
    } else {
      removeRememberCredentials()
    }

    ElMessage.success(t('login.loginSuccess'))
    const redirect = (route.query.redirect as string) || '/dashboard'
    router.replace(redirect)
  } catch {
    ElMessage.error(t('login.loginFailed'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-page {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    top: -100px;
    right: -100px;
  }

  &::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
    bottom: -80px;
    left: -80px;
  }
}

.login-card-wrapper {
  position: relative;
  z-index: 1;
  width: 420px;
}

.login-card {
  border-radius: 12px;
  border: none;

  :deep(.el-card__body) {
    padding: 40px 36px 24px;
  }
}

.login-header {
  text-align: center;
  margin-bottom: 32px;

  .login-title {
    font-size: 26px;
    font-weight: 700;
    color: #303133;
    margin-bottom: 8px;
    letter-spacing: 2px;
  }

  .login-subtitle {
    font-size: 14px;
    color: #909399;
  }
}

.login-extra {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-btn {
  width: 100%;
  letter-spacing: 4px;
  font-size: 16px;
}

.login-tip {
  text-align: center;
  margin-top: 8px;
}
</style>

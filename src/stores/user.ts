import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginApi, logoutApi, getUserInfoApi } from '@/api/auth'
import { setToken, removeToken, getToken } from '@/utils/storage'
import router from '@/router'
import type { UserInfo } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(getToken() || '')
  const userInfo = ref<UserInfo | null>(null)

  const isAuthenticated = computed(() => !!token.value)
  const username = computed(() => userInfo.value?.username ?? '')
  const avatar = computed(() => userInfo.value?.avatar ?? '')
  const roles = computed(() => userInfo.value?.roles ?? [])

  async function login(username: string, password: string): Promise<void> {
    const res = await loginApi({ username, password })
    token.value = res.data.token
    setToken(res.data.token)
    await fetchUserInfo()
  }

  async function fetchUserInfo(): Promise<void> {
    const res = await getUserInfoApi()
    userInfo.value = res.data
  }

  async function logout(): Promise<void> {
    try {
      await logoutApi()
    } finally {
      resetState()
      router.push('/login')
    }
  }

  function resetState(): void {
    token.value = ''
    userInfo.value = null
    removeToken()
  }

  return {
    token,
    userInfo,
    isAuthenticated,
    username,
    avatar,
    roles,
    login,
    fetchUserInfo,
    logout,
    resetState,
  }
})

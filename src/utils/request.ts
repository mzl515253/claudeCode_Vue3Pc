import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken, removeToken } from './storage'
import router from '@/router'

const request = axios.create({
  baseURL: '/api',
  timeout: 15000,
})

// Request interceptor — inject token
request.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor — unwrap and handle errors
request.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code === 401) {
      removeToken()
      router.push('/login')
      return Promise.reject(new Error(res.message || 'Unauthorized'))
    }
    if (res.code !== 200) {
      ElMessage.error(res.message || 'Request failed')
      return Promise.reject(new Error(res.message || 'Request failed'))
    }
    return res
  },
  (error) => {
    ElMessage.error(error.message || 'Network error')
    return Promise.reject(error)
  },
)

export default request

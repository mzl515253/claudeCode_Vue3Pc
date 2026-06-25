import request from '@/utils/request'
import type { ApiResponse } from '@/types/api'
import type { UserInfo, UserQueryParams, UserFormData } from '@/types/user'
import type { PaginatedData } from '@/types/api'

// Login
export function loginApi(data: { username: string; password: string }) {
  return request.post<any, ApiResponse<{ token: string }>>('/auth/login', data)
}

// Logout
export function logoutApi() {
  return request.post<any, ApiResponse<null>>('/auth/logout')
}

// Get current user info
export function getUserInfoApi() {
  return request.get<any, ApiResponse<UserInfo>>('/auth/userinfo')
}

// User CRUD
export function getUserListApi(params: UserQueryParams) {
  return request.get<any, ApiResponse<PaginatedData<UserInfo>>>('/users', { params })
}

export function createUserApi(data: UserFormData) {
  return request.post<any, ApiResponse<{ id: number }>>('/users', data)
}

export function updateUserApi(id: number, data: Partial<UserFormData>) {
  return request.put<any, ApiResponse<null>>(`/users/${id}`, data)
}

export function deleteUserApi(id: number) {
  return request.delete<any, ApiResponse<null>>(`/users/${id}`)
}

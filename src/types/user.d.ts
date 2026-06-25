// User info returned from server
export interface UserInfo {
  id: number
  username: string
  name: string
  avatar: string
  email: string
  phone: string
  roles: string[]
  status: number
  createTime: string
}

// User form data for create/edit
export interface UserFormData {
  username: string
  name: string
  email: string
  phone: string
  status: number
  role: string
  password?: string
}

// User list query params
export interface UserQueryParams {
  page: number
  pageSize: number
  keyword?: string
  status?: number | string
}

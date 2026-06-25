// Generic API response wrapper
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// Paginated list response
export interface PaginatedData<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// Pagination query params
export interface PaginationParams {
  page: number
  pageSize: number
}

// Login request params
export interface LoginParams {
  username: string
  password: string
}

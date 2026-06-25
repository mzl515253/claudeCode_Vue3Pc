import request from '@/utils/request'
import type { ApiResponse, PaginatedData } from '@/types/api'
import type { DataItem, DataQueryParams, DataFormData } from '@/types/data'

export function getDataListApi(params: DataQueryParams) {
  return request.get<any, ApiResponse<PaginatedData<DataItem>>>('/data', { params })
}

export function createDataApi(data: DataFormData) {
  return request.post<any, ApiResponse<{ id: number }>>('/data', data)
}

export function updateDataApi(id: number, data: Partial<DataFormData>) {
  return request.put<any, ApiResponse<null>>(`/data/${id}`, data)
}

export function deleteDataApi(id: number) {
  return request.delete<any, ApiResponse<null>>(`/data/${id}`)
}

// Data item
export interface DataItem {
  id: number
  name: string
  type: string
  status: number
  createTime: string
}

// Data form data for create/edit
export interface DataFormData {
  name: string
  type: string
  status: number
}

// Data list query params
export interface DataQueryParams {
  page: number
  pageSize: number
  keyword?: string
  type?: string
}

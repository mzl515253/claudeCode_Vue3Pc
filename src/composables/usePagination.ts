import { ref, reactive } from 'vue'

interface PaginationState {
  page: number
  pageSize: number
  total: number
}

interface UsePaginationOptions {
  defaultPage?: number
  defaultPageSize?: number
}

export function usePagination(fetchFn: () => Promise<void>, options?: UsePaginationOptions) {
  const pagination = reactive<PaginationState>({
    page: options?.defaultPage ?? 1,
    pageSize: options?.defaultPageSize ?? 10,
    total: 0,
  })

  const loading = ref(false)

  function resetPage() {
    pagination.page = 1
  }

  async function onPageChange(page: number) {
    pagination.page = page
    loading.value = true
    await fetchFn()
    loading.value = false
  }

  async function onPageSizeChange(pageSize: number) {
    pagination.pageSize = pageSize
    pagination.page = 1
    loading.value = true
    await fetchFn()
    loading.value = false
  }

  function setTotal(total: number) {
    pagination.total = total
  }

  return {
    pagination,
    loading,
    resetPage,
    onPageChange,
    onPageSizeChange,
    setTotal,
  }
}

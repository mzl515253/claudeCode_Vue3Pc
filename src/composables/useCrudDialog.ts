import { ref } from 'vue'

type DialogMode = 'add' | 'edit'

interface UseCrudDialogOptions<T> {
  defaultRow?: T | null
}

export function useCrudDialog<T = any>(options?: UseCrudDialogOptions<T>) {
  const visible = ref(false)
  const mode = ref<DialogMode>('add')
  const row = ref<T | null>(options?.defaultRow ?? null)

  function openAdd() {
    mode.value = 'add'
    row.value = null
    visible.value = true
  }

  function openEdit(data: T) {
    mode.value = 'edit'
    row.value = { ...data } as T
    visible.value = true
  }

  function close() {
    visible.value = false
  }

  return {
    visible,
    mode,
    row,
    openAdd,
    openEdit,
    close,
  }
}

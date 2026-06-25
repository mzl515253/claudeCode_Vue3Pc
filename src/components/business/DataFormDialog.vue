<template>
  <el-dialog
    :model-value="modelValue"
    :title="isEdit ? $t('data.editData') : $t('data.addData')"
    :close-on-click-modal="false"
    width="480px"
    @update:model-value="$emit('update:modelValue', $event)"
    @open="handleOpen"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item :label="$t('data.name')" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item :label="$t('data.type')" prop="type">
        <el-select v-model="form.type" style="width: 100%">
          <el-option :label="$t('data.typeA')" value="typeA" />
          <el-option :label="$t('data.typeB')" value="typeB" />
          <el-option :label="$t('data.typeC')" value="typeC" />
          <el-option :label="$t('data.typeD')" value="typeD" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('common.status')" prop="status">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="0"
          :active-text="$t('common.enabled')"
          :inactive-text="$t('common.disabled')"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="$emit('update:modelValue', false)">{{ $t('common.cancel') }}</el-button>
      <el-button type="primary" :loading="submitting" @click="handleSubmit">
        {{ $t('common.submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useDataFormRules } from '@/utils/validate'
import { createDataApi, updateDataApi } from '@/api/data'
import type { DataItem } from '@/types/data'
import type { FormInstance } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const rules = useDataFormRules()

const props = defineProps<{
  modelValue: boolean
  mode: 'add' | 'edit'
  row: DataItem | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'success'): void
}>()

const isEdit = computed(() => props.mode === 'edit')
const formRef = ref<FormInstance>()
const submitting = ref(false)

const form = reactive({
  name: '',
  type: 'typeA',
  status: 1 as number,
})

function handleOpen() {
  if (isEdit.value && props.row) {
    form.name = props.row.name
    form.type = props.row.type
    form.status = props.row.status
  } else {
    form.name = ''
    form.type = 'typeA'
    form.status = 1
  }
}

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  submitting.value = true
  try {
    if (isEdit.value && props.row) {
      await updateDataApi(props.row.id, {
        name: form.name,
        type: form.type,
        status: form.status,
      })
    } else {
      await createDataApi({
        name: form.name,
        type: form.type,
        status: form.status,
      })
    }
    ElMessage.success(t('common.success'))
    emit('success')
  } catch { /* handled */ }
  finally {
    submitting.value = false
  }
}
</script>

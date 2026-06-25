<template>
  <el-dialog
    :model-value="modelValue"
    :title="isEdit ? $t('user.editUser') : $t('user.addUser')"
    :close-on-click-modal="false"
    width="520px"
    @update:model-value="$emit('update:modelValue', $event)"
    @open="handleOpen"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item :label="$t('user.username')" prop="username">
        <el-input v-model="form.username" :disabled="isEdit" />
      </el-form-item>
      <el-form-item :label="$t('user.name')" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item :label="$t('user.email')" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item :label="$t('user.phone')" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item v-if="!isEdit" :label="$t('user.password')" prop="password">
        <el-input v-model="form.password" type="password" show-password />
      </el-form-item>
      <el-form-item :label="$t('user.role')" prop="role">
        <el-select v-model="form.role" style="width: 100%">
          <el-option :label="$t('user.roleAdmin')" value="admin" />
          <el-option :label="$t('user.roleUser')" value="user" />
          <el-option :label="$t('user.roleEditor')" value="editor" />
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
import { useUserFormRules } from '@/utils/validate'
import { createUserApi, updateUserApi } from '@/api/auth'
import type { UserInfo } from '@/types/user'
import type { FormInstance } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const rules = useUserFormRules()

const props = defineProps<{
  modelValue: boolean
  mode: 'add' | 'edit'
  row: UserInfo | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'success'): void
}>()

const isEdit = computed(() => props.mode === 'edit')
const formRef = ref<FormInstance>()
const submitting = ref(false)

const form = reactive({
  username: '',
  name: '',
  email: '',
  phone: '',
  password: '',
  role: 'user',
  status: 1 as number,
})

function handleOpen() {
  if (isEdit.value && props.row) {
    form.username = props.row.username
    form.name = props.row.name
    form.email = props.row.email
    form.phone = props.row.phone
    form.role = props.row.roles?.[0] || 'user'
    form.status = props.row.status
  } else {
    resetForm()
  }
}

function resetForm() {
  form.username = ''
  form.name = ''
  form.email = ''
  form.phone = ''
  form.password = ''
  form.role = 'user'
  form.status = 1
}

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  submitting.value = true
  try {
    if (isEdit.value && props.row) {
      await updateUserApi(props.row.id, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: form.role,
        status: form.status,
      })
    } else {
      await createUserApi({
        username: form.username,
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role,
        status: form.status,
      })
    }
    ElMessage.success(t('common.success'))
    emit('success')
  } catch {
    // Error handled by interceptor
  } finally {
    submitting.value = false
  }
}
</script>

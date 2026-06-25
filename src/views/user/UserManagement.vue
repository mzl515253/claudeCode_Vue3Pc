<template>
  <div class="user-management">
    <!-- Search bar -->
    <el-card shadow="never" class="search-card">
      <el-form :inline="true" :model="query" class="search-form">
        <el-form-item>
          <el-input
            v-model="query.keyword"
            :placeholder="$t('user.searchPlaceholder')"
            clearable
            @keyup.enter="handleSearch"
          />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="query.status"
            :placeholder="$t('common.statusFilter')"
            clearable
            style="width: 140px"
          >
            <el-option :label="$t('common.all')" :value="''" />
            <el-option :label="$t('user.statusEnabled')" :value="1" />
            <el-option :label="$t('user.statusDisabled')" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">
            {{ $t('common.search') }}
          </el-button>
          <el-button :icon="Refresh" @click="handleReset">
            {{ $t('common.reset') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- Action bar + Table -->
    <el-card shadow="never" class="table-card">
      <div class="toolbar">
        <el-button type="primary" :icon="Plus" @click="handleAdd">
          {{ $t('user.addUser') }}
        </el-button>
      </div>

      <el-table :data="tableData" v-loading="loading" stripe border style="width: 100%">
        <el-table-column prop="id" label="ID" width="70" align="center" />
        <el-table-column prop="username" :label="$t('user.username')" min-width="120" />
        <el-table-column prop="name" :label="$t('user.name')" min-width="100" />
        <el-table-column prop="email" :label="$t('user.email')" min-width="180" />
        <el-table-column prop="phone" :label="$t('user.phone')" width="140" />
        <el-table-column prop="role" :label="$t('user.role')" width="110" align="center">
          <template #default="{ row }">
            <el-tag :type="roleTagType(row.role)" size="small">
              {{ $t(`user.role${capitalize(row.role)}`) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="$t('common.status')" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'" size="small">
              {{ row.status === 1 ? $t('user.statusEnabled') : $t('user.statusDisabled') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" :label="$t('user.createTime')" width="170" />
        <el-table-column :label="$t('common.operation')" width="180" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleEdit(row)">
              {{ $t('common.edit') }}
            </el-button>
            <el-popconfirm
              :title="$t('user.deleteConfirm', { name: row.name })"
              @confirm="handleDelete(row.id)"
            >
              <template #reference>
                <el-button type="danger" link size="small">
                  {{ $t('common.delete') }}
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="query.page"
          v-model:page-size="query.pageSize"
          :total="total"
          :page-sizes="[5, 10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          background
          @change="fetchData"
        />
      </div>
    </el-card>

    <!-- Add/Edit Dialog -->
    <UserFormDialog
      v-model="dialogVisible"
      :mode="dialogMode"
      :row="currentRow"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import { getUserListApi, deleteUserApi } from '@/api/auth'
import UserFormDialog from '@/components/business/UserFormDialog.vue'
import type { UserInfo } from '@/types/user'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const tableData = ref<UserInfo[]>([])
const total = ref(0)
const loading = ref(false)

const query = reactive({
  page: 1,
  pageSize: 10,
  keyword: '',
  status: '' as number | string,
})

// Dialog state
const dialogVisible = ref(false)
const dialogMode = ref<'add' | 'edit'>('add')
const currentRow = ref<UserInfo | null>(null)

function roleTagType(role: string): string {
  const map: Record<string, string> = { admin: 'danger', user: 'info', editor: 'warning' }
  return map[role] || 'info'
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

async function fetchData() {
  loading.value = true
  try {
    const res = await getUserListApi({
      page: query.page,
      pageSize: query.pageSize,
      keyword: query.keyword || undefined,
      status: query.status !== '' ? Number(query.status) : undefined,
    })
    tableData.value = res.data.list
    total.value = res.data.total
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  query.page = 1
  fetchData()
}

function handleReset() {
  query.keyword = ''
  query.status = ''
  query.page = 1
  fetchData()
}

function handleAdd() {
  dialogMode.value = 'add'
  currentRow.value = null
  dialogVisible.value = true
}

function handleEdit(row: UserInfo) {
  dialogMode.value = 'edit'
  currentRow.value = { ...row }
  dialogVisible.value = true
}

async function handleDelete(id: number) {
  try {
    await deleteUserApi(id)
    ElMessage.success(t('common.success'))
    // Go to previous page if current page is empty
    if (tableData.value.length === 1 && query.page > 1) {
      query.page--
    }
    fetchData()
  } catch {
    // Error handled by interceptor
  }
}

function handleSuccess() {
  dialogVisible.value = false
  if (dialogMode.value === 'add') {
    query.page = 1
  }
  fetchData()
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped lang="scss">
.user-management {
  .search-card {
    margin-bottom: 16px;

    .search-form {
      margin-bottom: 0;
      :deep(.el-form-item) {
        margin-bottom: 0;
      }
    }
  }

  .table-card {
    .toolbar {
      margin-bottom: 16px;
    }
  }

  .pagination-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }
}
</style>

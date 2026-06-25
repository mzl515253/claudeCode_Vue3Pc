<template>
  <div class="data-management">
    <!-- Search bar -->
    <el-card shadow="never" class="search-card">
      <el-form :inline="true" :model="query" class="search-form">
        <el-form-item>
          <el-input
            v-model="query.keyword"
            :placeholder="$t('data.searchPlaceholder')"
            clearable
            @keyup.enter="handleSearch"
          />
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.type" :placeholder="$t('data.type')" clearable style="width: 140px">
            <el-option :label="$t('common.all')" value="" />
            <el-option :label="$t('data.typeA')" value="typeA" />
            <el-option :label="$t('data.typeB')" value="typeB" />
            <el-option :label="$t('data.typeC')" value="typeC" />
            <el-option :label="$t('data.typeD')" value="typeD" />
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
          {{ $t('data.addData') }}
        </el-button>
      </div>

      <el-table :data="tableData" v-loading="loading" stripe border style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="name" :label="$t('data.name')" min-width="180" />
        <el-table-column prop="type" :label="$t('data.type')" width="130" align="center">
          <template #default="{ row }">
            <el-tag :type="typeTagColor(row.type)">
              {{ $t(`data.${row.type}`) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="$t('common.status')" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'" size="small">
              {{ row.status === 1 ? $t('common.enabled') : $t('common.disabled') }}
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
              :title="$t('data.deleteConfirm')"
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
    <DataFormDialog
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
import { getDataListApi, deleteDataApi } from '@/api/data'
import DataFormDialog from '@/components/business/DataFormDialog.vue'
import type { DataItem } from '@/types/data'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const tableData = ref<DataItem[]>([])
const total = ref(0)
const loading = ref(false)

const query = reactive({
  page: 1,
  pageSize: 10,
  keyword: '',
  type: '',
})

const dialogVisible = ref(false)
const dialogMode = ref<'add' | 'edit'>('add')
const currentRow = ref<DataItem | null>(null)

function typeTagColor(type: string): string {
  const map: Record<string, string> = {
    typeA: 'primary',
    typeB: 'success',
    typeC: 'warning',
    typeD: 'danger',
  }
  return map[type] || 'info'
}

async function fetchData() {
  loading.value = true
  try {
    const res = await getDataListApi({
      page: query.page,
      pageSize: query.pageSize,
      keyword: query.keyword || undefined,
      type: query.type || undefined,
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
  query.type = ''
  query.page = 1
  fetchData()
}

function handleAdd() {
  dialogMode.value = 'add'
  currentRow.value = null
  dialogVisible.value = true
}

function handleEdit(row: DataItem) {
  dialogMode.value = 'edit'
  currentRow.value = { ...row }
  dialogVisible.value = true
}

async function handleDelete(id: number) {
  try {
    await deleteDataApi(id)
    ElMessage.success(t('common.success'))
    if (tableData.value.length === 1 && query.page > 1) {
      query.page--
    }
    fetchData()
  } catch { /* handled */ }
}

function handleSuccess() {
  dialogVisible.value = false
  if (dialogMode.value === 'add') query.page = 1
  fetchData()
}

onMounted(() => fetchData())
</script>

<style scoped lang="scss">
.data-management {
  .search-card {
    margin-bottom: 16px;
    .search-form {
      margin-bottom: 0;
      :deep(.el-form-item) { margin-bottom: 0; }
    }
  }
  .table-card .toolbar { margin-bottom: 16px; }
  .pagination-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }
}
</style>

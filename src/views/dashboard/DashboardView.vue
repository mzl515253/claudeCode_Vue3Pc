<template>
  <div class="dashboard-page">
    <h2 class="page-title">{{ $t('dashboard.welcome', { name: userStore.userInfo?.name }) }}</h2>

    <!-- Stats Cards -->
    <el-row :gutter="20" class="stats-row">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <p class="stat-label">{{ $t('dashboard.userCount') }}</p>
              <p class="stat-value">{{ stats.userCount }}</p>
            </div>
            <div class="stat-icon user-icon">
              <el-icon :size="36"><UserFilled /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <p class="stat-label">{{ $t('dashboard.orderCount') }}</p>
              <p class="stat-value">{{ stats.orderCount }}</p>
            </div>
            <div class="stat-icon order-icon">
              <el-icon :size="36"><Document /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <p class="stat-label">{{ $t('dashboard.revenue') }}</p>
              <p class="stat-value">¥{{ formatNumber(stats.revenue) }}</p>
            </div>
            <div class="stat-icon revenue-icon">
              <el-icon :size="36"><Money /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <p class="stat-label">{{ $t('dashboard.visitCount') }}</p>
              <p class="stat-value">{{ formatNumber(stats.visitCount) }}</p>
            </div>
            <div class="stat-icon visit-icon">
              <el-icon :size="36"><TrendCharts /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Charts -->
    <el-row :gutter="20" class="charts-row">
      <el-col :xs="24" :lg="14">
        <el-card shadow="hover">
          <template #header>
            <span class="card-header-title">{{ $t('dashboard.weeklyTrend') }}</span>
          </template>
          <div class="chart-container">
            <div class="bar-chart">
              <div
                v-for="item in stats.weeklyUsers"
                :key="item.date"
                class="bar-item"
              >
                <div
                  class="bar"
                  :style="{ height: `${(item.count / maxWeeklyCount) * 100}%` }"
                  :title="`${item.date}: ${item.count}`"
                ></div>
                <span class="bar-label">{{ item.date.slice(5) }}</span>
                <span class="bar-value">{{ item.count }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :lg="10">
        <el-card shadow="hover">
          <template #header>
            <span class="card-header-title">{{ $t('dashboard.categoryDistribution') }}</span>
          </template>
          <div class="category-list">
            <div
              v-for="cat in stats.categoryDistribution"
              :key="cat.name"
              class="category-item"
            >
              <span class="cat-name">{{ cat.name }}</span>
              <el-progress
                :percentage="cat.value"
                :stroke-width="12"
                :show-text="true"
                :color="catColors[cat.name] || '#409eff'"
              >
                <span class="cat-percent">{{ cat.value }}%</span>
              </el-progress>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { getDashboardStatsApi, type DashboardStats } from '@/api/dashboard'
import { UserFilled, Document, Money, TrendCharts } from '@element-plus/icons-vue'

const userStore = useUserStore()

const stats = ref<DashboardStats>({
  userCount: 0,
  orderCount: 0,
  revenue: 0,
  visitCount: 0,
  weeklyUsers: [],
  categoryDistribution: [],
})

const catColors: Record<string, string> = {
  '电子产品': '#409eff',
  '服装': '#67c23a',
  '食品': '#e6a23c',
  '家居': '#f56c6c',
  '其他': '#909399',
}

const maxWeeklyCount = computed(() => {
  if (!stats.value.weeklyUsers.length) return 1
  return Math.max(...stats.value.weeklyUsers.map((w) => w.count))
})

function formatNumber(num: number): string {
  return num.toLocaleString()
}

onMounted(async () => {
  const res = await getDashboardStatsApi()
  stats.value = res.data
})
</script>

<style scoped lang="scss">
.dashboard-page {
  .page-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #303133;
  }
}

.stats-row {
  margin-bottom: 20px;
}

.stat-card {
  border-radius: 8px;

  :deep(.el-card__body) {
    padding: 20px;
  }
}

.stat-content {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .stat-info {
    .stat-label {
      font-size: 13px;
      color: #909399;
      margin-bottom: 8px;
    }
    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: #303133;
    }
  }

  .stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;

    &.user-icon { background: linear-gradient(135deg, #409eff, #66b1ff); }
    &.order-icon { background: linear-gradient(135deg, #67c23a, #85ce61); }
    &.revenue-icon { background: linear-gradient(135deg, #e6a23c, #ebb563); }
    &.visit-icon { background: linear-gradient(135deg, #f56c6c, #f89898); }
  }
}

.charts-row {
  margin-bottom: 20px;
}

.card-header-title {
  font-weight: 600;
  font-size: 15px;
}

.chart-container {
  padding: 10px 0;
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 200px;
  padding-top: 20px;

  .bar-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;

    .bar {
      width: 32px;
      max-width: 50px;
      background: linear-gradient(to top, #409eff, #66b1ff);
      border-radius: 4px 4px 0 0;
      transition: height 0.6s ease;
      min-height: 4px;
    }

    .bar-label {
      font-size: 11px;
      color: #909399;
      margin-top: 8px;
    }

    .bar-value {
      font-size: 11px;
      color: #303133;
      font-weight: 600;
      margin-top: 2px;
    }
  }
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 10px 0;

  .category-item {
    .cat-name {
      display: block;
      font-size: 13px;
      color: #606266;
      margin-bottom: 6px;
    }
  }
}
</style>

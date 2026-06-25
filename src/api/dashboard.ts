import request from '@/utils/request'
import type { ApiResponse } from '@/types/api'

export interface DashboardStats {
  userCount: number
  orderCount: number
  revenue: number
  visitCount: number
  weeklyUsers: { date: string; count: number }[]
  categoryDistribution: { name: string; value: number }[]
}

export function getDashboardStatsApi() {
  return request.get<any, ApiResponse<DashboardStats>>('/dashboard/stats')
}

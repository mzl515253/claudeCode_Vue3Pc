import Mock from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/dashboard/stats',
    method: 'get',
    response: () => {
      const weeklyUsers = []
      const baseDate = new Date('2026-06-19')
      for (let i = 0; i < 7; i++) {
        const d = new Date(baseDate)
        d.setDate(d.getDate() + i)
        weeklyUsers.push({
          date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
          count: Mock.Random.integer(120, 220),
        })
      }

      return {
        code: 200,
        message: 'ok',
        data: {
          userCount: Mock.Random.integer(1200, 1350),
          orderCount: Mock.Random.integer(420, 500),
          revenue: Mock.Random.float(90000, 105000, 2, 2),
          visitCount: Mock.Random.integer(28000, 30000),
          weeklyUsers,
          categoryDistribution: [
            { name: '电子产品', value: 35 },
            { name: '服装', value: 25 },
            { name: '食品', value: 20 },
            { name: '家居', value: 12 },
            { name: '其他', value: 8 },
          ],
        },
      }
    },
  },
] as MockMethod[]

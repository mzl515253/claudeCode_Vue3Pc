import Mock from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'

// Generate 56 mock user records
const userPool = Mock.mock({
  'list|56': [
    {
      'id|+1': 1,
      username: '@word(5, 12)',
      name: '@cname',
      email: '@email',
      'phone': /^1[3-9]\d{9}$/,
      'status|1': [0, 1],
      'role|1': ['admin', 'user', 'editor'],
      createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    },
  ],
}).list

// Make the first user a known admin for testing
userPool[0] = {
  id: 1,
  username: 'admin',
  name: '系统管理员',
  email: 'admin@example.com',
  phone: '13800138000',
  status: 1,
  role: 'admin',
  createTime: '2026-01-15 10:30:00',
}

let nextId = 57

export default [
  // Get user list with pagination, search, filter
  {
    url: '/api/users',
    method: 'get',
    response: ({ query }: { query: Record<string, any> }) => {
      const page = parseInt(query.page) || 1
      const pageSize = parseInt(query.pageSize) || 10
      const keyword = query.keyword?.trim().toLowerCase() || ''
      const status = query.status !== undefined && query.status !== '' ? parseInt(query.status) : undefined

      let filtered = [...userPool]

      if (keyword) {
        filtered = filtered.filter(
          (u: any) =>
            u.username.toLowerCase().includes(keyword) ||
            u.name.toLowerCase().includes(keyword),
        )
      }

      if (status !== undefined) {
        filtered = filtered.filter((u: any) => u.status === status)
      }

      const total = filtered.length
      const start = (page - 1) * pageSize
      const list = filtered.slice(start, start + pageSize)

      return {
        code: 200,
        message: 'ok',
        data: { list, total, page, pageSize },
      }
    },
  },

  // Create user
  {
    url: '/api/users',
    method: 'post',
    response: ({ body }: { body: any }) => {
      const newUser = {
        id: nextId++,
        username: body.username,
        name: body.name,
        email: body.email || '',
        phone: body.phone || '',
        status: body.status ?? 1,
        role: body.role || 'user',
        createTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
      }
      userPool.unshift(newUser)
      return {
        code: 200,
        message: '创建成功',
        data: { id: newUser.id },
      }
    },
  },

  // Update user
  {
    url: '/api/users/:id',
    method: 'put',
    response: ({ url, body }: { url: string; body: any }) => {
      const id = parseInt(url.split('/').pop() || '0')
      const idx = userPool.findIndex((u: any) => u.id === id)
      if (idx === -1) {
        return { code: 404, message: '用户不存在', data: null }
      }
      userPool[idx] = { ...userPool[idx], ...body }
      return { code: 200, message: '更新成功', data: null }
    },
  },

  // Delete user
  {
    url: '/api/users/:id',
    method: 'delete',
    response: ({ url }: { url: string }) => {
      const id = parseInt(url.split('/').pop() || '0')
      const idx = userPool.findIndex((u: any) => u.id === id)
      if (idx === -1) {
        return { code: 404, message: '用户不存在', data: null }
      }
      userPool.splice(idx, 1)
      return { code: 200, message: '删除成功', data: null }
    },
  },
] as MockMethod[]

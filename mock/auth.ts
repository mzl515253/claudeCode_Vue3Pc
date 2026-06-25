import type { MockMethod } from 'vite-plugin-mock'

export default [
  // Login
  {
    url: '/api/auth/login',
    method: 'post',
    response: ({ body }: { body: { username?: string; password?: string } }) => {
      const { username, password } = body
      if (!username || username.length < 3) {
        return { code: 401, message: '用户名长度不能少于3位', data: null }
      }
      if (!password || password.length < 6) {
        return { code: 401, message: '密码长度不能少于6位', data: null }
      }
      const token = `mock-jwt-token-${username}-${Date.now()}`
      return {
        code: 200,
        message: '登录成功',
        data: { token },
      }
    },
  },

  // Get user info
  {
    url: '/api/auth/userinfo',
    method: 'get',
    response: ({ headers }: { headers: Record<string, string> }) => {
      const auth = headers.authorization || headers.Authorization || ''
      const token = auth.replace('Bearer ', '')
      const match = token.match(/mock-jwt-token-(.+?)-\d+/)
      const username = match ? match[1] : 'admin'

      return {
        code: 200,
        message: 'ok',
        data: {
          id: 1,
          username,
          name: username === 'admin' ? '系统管理员' : username,
          avatar: '',
          email: `${username}@example.com`,
          phone: '13800138000',
          roles: ['admin'],
          status: 1,
          createTime: '2026-01-15 10:30:00',
        },
      }
    },
  },

  // Logout
  {
    url: '/api/auth/logout',
    method: 'post',
    response: () => ({
      code: 200,
      message: '退出成功',
      data: null,
    }),
  },
] as MockMethod[]

import Mock from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'

const dataPool = Mock.mock({
  'list|100': [
    {
      'id|+1': 1,
      'name': '@ctitle(3, 8)',
      'type|1': ['typeA', 'typeB', 'typeC', 'typeD'],
      'status|1': [0, 1],
      createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    },
  ],
}).list

let nextId = 101

export default [
  {
    url: '/api/data',
    method: 'get',
    response: ({ query }: { query: Record<string, any> }) => {
      const page = parseInt(query.page) || 1
      const pageSize = parseInt(query.pageSize) || 10
      const keyword = query.keyword?.trim().toLowerCase() || ''
      const type = query.type || ''

      let filtered = [...dataPool]

      if (keyword) {
        filtered = filtered.filter((d: any) => d.name.toLowerCase().includes(keyword))
      }
      if (type) {
        filtered = filtered.filter((d: any) => d.type === type)
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

  {
    url: '/api/data',
    method: 'post',
    response: ({ body }: { body: any }) => {
      const newItem = {
        id: nextId++,
        name: body.name,
        type: body.type || 'typeA',
        status: body.status ?? 1,
        createTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
      }
      dataPool.unshift(newItem)
      return { code: 200, message: '创建成功', data: { id: newItem.id } }
    },
  },

  {
    url: '/api/data/:id',
    method: 'put',
    response: ({ url, body }: { url: string; body: any }) => {
      const id = parseInt(url.split('/').pop() || '0')
      const idx = dataPool.findIndex((d: any) => d.id === id)
      if (idx === -1) return { code: 404, message: '数据不存在', data: null }
      dataPool[idx] = { ...dataPool[idx], ...body }
      return { code: 200, message: '更新成功', data: null }
    },
  },

  {
    url: '/api/data/:id',
    method: 'delete',
    response: ({ url }: { url: string }) => {
      const id = parseInt(url.split('/').pop() || '0')
      const idx = dataPool.findIndex((d: any) => d.id === id)
      if (idx === -1) return { code: 404, message: '数据不存在', data: null }
      dataPool.splice(idx, 1)
      return { code: 200, message: '删除成功', data: null }
    },
  },
] as MockMethod[]

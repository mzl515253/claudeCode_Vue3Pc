/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vite-plugin-vue-setup-extend' {
  import type { Plugin } from 'vite'
  const plugin: () => Plugin
  export default plugin
}

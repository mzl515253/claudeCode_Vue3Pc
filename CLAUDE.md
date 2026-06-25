# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm run dev      # Start dev server (port 5173, auto-open browser)
pnpm run build    # Type-check then production build
pnpm run preview  # Preview production build
```

## Architecture

Vue 3 + TypeScript SPA with Element Plus UI, Pinia state management, Vue Router, and vue-i18n. Mock API via `vite-plugin-mock` (enabled only in dev mode).

### Stack & Config

| Area | Technology | Notes |
|---|---|---|
| Framework | Vue 3.5 (Composition API + `<script setup>`) | |
| Language | TypeScript 5.8, ESM (`"type": "module"`) | |
| Build | Vite 5.4 | Not Vite 6; stick to 5.x APIs |
| Package manager | pnpm 11 | `pnpm-workspace.yaml` has `allowBuilds` for native modules |
| UI | Element Plus 2 | Dark theme CSS vars imported in `main.ts` |
| Icons | @element-plus/icons-vue | Explicit imports, not auto-imported |
| CSS | SCSS (Dart Sass) | Variables/mixins in `src/assets/styles/variables.scss` |
| Mock | vite-plugin-mock | Mock files in `mock/` directory |

### Path Alias

`@` → `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`)

### Auto-Imports

**unplugin-auto-import** generates `src/auto-imports.d.ts`:
- `vue` (ref, reactive, computed, watch, onMounted, etc.)
- `vue-router` (useRouter, useRoute)
- `pinia` (defineStore, storeToRefs)
- Element Plus resolver (ElMessage, etc.)

**unplugin-vue-components** generates `src/components.d.ts`:
- Element Plus resolver auto-registers `el-*` components
- Project components in `src/components/` are auto-registered

### SCSS Architecture

`vite.config.ts` `additionalData` injects `@use "@/assets/styles/variables.scss" as *;` before every SCSS file compiled directly by Vite (Vue SFC `<style>` blocks and `index.scss`).

**Gotcha**: Files loaded via Sass `@use` from another file (like `layout.scss` loaded by `index.scss`) are sub-modules with isolated scope and do NOT receive `additionalData`. They must have their own `@use './variables.scss' as *;` at the top.

### Router

- History mode (`createWebHistory`)
- Navigation guard in `src/router/index.ts`: checks token for `requiresAuth` routes, redirects to `/login`
- Route tree: `/login` (public) → `/` Layout → children (`/dashboard`, `/user`, `/data`, `/settings`, `/user-center`)
- `meta.requiresAuth` defaults to `true`; set `false` for public routes
- `meta.hidden` excludes from sidebar menu
- Catch-all `/:pathMatch(.*)*` redirects to `/404`

### Stores (Pinia)

- **user store** (`src/stores/user.ts`): `token`, `userInfo`, `isAuthenticated`, `login()`, `fetchUserInfo()`, `logout()`
- **app store** (`src/stores/app.ts`): `sidebarCollapsed`, `language`, `toggleSidebar()`, `setLanguage()`

### API Layer

`src/utils/request.ts` creates an axios instance:
- Base URL: `/api`
- Request interceptor injects `Bearer <token>` header
- Response interceptor unwraps `ApiResponse<T>` (expects `{ code, message, data }`)
- `code !== 200` → ElMessage error + reject; `code === 401` → clear token + redirect login

Each API module (`src/api/*.ts`) imports `request` from `@/utils/request`. **Every new API module must import `request` explicitly.**

### Composables

- `usePagination(fetchFn)` — reactive `{ page, pageSize, total }` with page change handlers that auto-call `fetchFn`
- `useCrudDialog<T>()` — dialog state: `visible`, `mode` (`'add' | 'edit'`), `row`, `openAdd()`, `openEdit(data)`, `close()`

### i18n

Vue i18n v9 (legacy: false). Locale files in `src/i18n/locales/`. i18n key naming follows dot notation matching route/view structure. Element Plus locale is synced via `el-config-provider` in `App.vue`.

Note: vue-i18n v9 is deprecated; plan migration to v11.

### Types

Declaration files in `src/types/`:
- `api.d.ts` — `ApiResponse<T>`, `PaginatedData<T>`, `PaginationParams`, `LoginParams`
- `user.d.ts` — `UserInfo`, `UserFormData`, `UserQueryParams`
- `data.d.ts` — `DataItem`, `DataFormData`, `DataQueryParams`
- `router.d.ts` — augments `vue-router` `RouteMeta` with `title`, `icon`, `requiresAuth`, `hidden`

### pnpm v11 Build Approval

pnpm v11 blocks all native build scripts by default. `pnpm-workspace.yaml` lists approved packages under `allowBuilds`. If adding a dependency with native binaries (esbuild, sharp, etc.), add it to `allowBuilds` or the install will fail with `ERR_PNPM_IGNORED_BUILDS`.

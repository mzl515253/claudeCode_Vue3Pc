const TOKEN_KEY = 'admin_token'
const LANGUAGE_KEY = 'admin_language'
const REMEMBER_KEY = 'admin_remember_credentials'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function getLanguage(): string | null {
  return localStorage.getItem(LANGUAGE_KEY)
}

export function setLanguage(lang: string): void {
  localStorage.setItem(LANGUAGE_KEY, lang)
}

export function getRememberCredentials(): { username: string; password: string } | null {
  try {
    const raw = localStorage.getItem(REMEMBER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setRememberCredentials(username: string, password: string): void {
  localStorage.setItem(REMEMBER_KEY, JSON.stringify({ username, password }))
}

export function removeRememberCredentials(): void {
  localStorage.removeItem(REMEMBER_KEY)
}

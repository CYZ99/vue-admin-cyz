import { useCookies } from '@vueuse/integrations/useCookies'
const TokenKey = "admin-token"
const cookie = useCookies()


// 设置 token
export function setToken(token) {
  return cookie.set(TokenKey, token)
}
// 获取 token
export function getToken() {
  return cookie.get(TokenKey)
}

// 删除 token
export function removeToken() {
  return cookie.remove(TokenKey)
}
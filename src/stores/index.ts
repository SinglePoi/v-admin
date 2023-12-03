import { useAccount } from './account'
import { localCache } from '../hooks/index'

export function setupStore() {
  const token = localCache.getCache('token')
  if (token) {
    useAccount().setToken(token)
  }
  const userInfo = localCache.getCache('userInfo')
  if (userInfo) {
    useAccount().setUserInfo(userInfo)
  }
  const userMenus = localCache.getCache('userMenus')
  if (userMenus) {
    useAccount().setUserMenus(userMenus)
  }
}

setupStore()

export * from './account'

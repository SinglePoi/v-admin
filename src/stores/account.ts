import { loginRequest, requestUserInfoById, requestUserMenusByRoleId } from '@/service/login/login'
import { defineStore } from 'pinia'
import type { LoginResponseDate } from '@/service/login/types'
import { localCache } from '@/hooks/use-cache'
import type { UserModel } from './types'
import type { DataType } from '@/service/request/types'
import { USERSTATUS } from './constants'

export const useAccount = defineStore('user', () => {
  const currentStatus = reactive<UserModel.LoginStatus>({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  })

  function setToken(token: string) {
    currentStatus.token = token ?? currentStatus.token
    localCache.setCache(USERSTATUS.TOKEN, token)
  }

  function setUserInfo(userInfo: Record<string, any>) {
    currentStatus.userInfo = userInfo
    localCache.setCache(USERSTATUS.USERINFO, userInfo)
  }

  function setUserMenus(userMenus: any[]) {
    currentStatus.userMenus = userMenus
    localCache.setCache(USERSTATUS.USERMENUS, userMenus)
  }

  function getUserInfo(): Record<string, any> {
    if (!currentStatus.userInfo) {
      const userInfo = localCache.getCache(USERSTATUS.USERINFO)
      setUserInfo(userInfo)
    }
    return { ...currentStatus.userInfo }
  }

  function getUserMenus(): UserModel.UserMenus[] {
    if (!currentStatus.userInfo) {
      const userInfo = localCache.getCache(USERSTATUS.USERMENUS)
      setUserMenus(userInfo)
    }
    return { ...currentStatus.userMenus }
  }

  function getUser(): Record<string, any> {
    const { userInfo } = currentStatus
    return { ...userInfo }
  }

  async function login(user: UserModel.LoginData) {
    const result: DataType<LoginResponseDate> = await loginRequest(user)
    const data: LoginResponseDate = result?.data
    setToken(data.token)

    const userInfoResult = await requestUserInfoById(data.id)
    const userInfo = userInfoResult.data
    setUserInfo(userInfo)

    const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
    const userMenus = userMenusResult.data
    setUserMenus(userMenus)

    return result
  }

  return {
    currentStatus,
    setToken,
    setUserInfo,
    setUserMenus,
    login,
    getUser,
    getUserInfo,
    getUserMenus
  }
})

import { loginRequest, requestUserInfoById, requestUserMenusByRoleId } from '@/service/login/login'
import { defineStore } from 'pinia'
import type { LoginResponseDate } from '@/service/login/types'
import { localCache } from '@/hooks/use-cache'
import type { LoginModel } from './types'
import type { DataType } from '@/service/request/types'

type UserToken = LoginResponseDate<LoginModel.LoginData>

export const useAccount = defineStore('user', () => {
  const currentStatus = reactive<LoginModel.LoginStatus>({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  })

  function setToken(arg: UserToken) {
    const { id, name, token } = arg
    Object.assign(currentStatus.userInfo, { id, name })
    currentStatus.token = token ?? currentStatus.token
    localCache.setCache('token', token)
  }

  function setUserInfo(userInfo: Record<string, any>) {
    currentStatus.userInfo = userInfo
  }

  function setUserMenus(userMenus: any[]) {
    currentStatus.userMenus = userMenus
  }

  function getUserInfo(): Record<string, any> {
    return { ...currentStatus.userInfo }
  }

  function getUserMenus(): any[] {
    return { ...currentStatus.userMenus }
  }

  function getUser(): Record<string, any> {
    const { userInfo } = currentStatus
    return { ...userInfo }
  }

  async function login(user: LoginModel.LoginData) {
    const result: DataType<LoginResponseDate> = await loginRequest(user)
    const data: LoginResponseDate = result?.data

    setToken(data)
    const userInfoResult = await requestUserInfoById(data.id)
    const userInfo = userInfoResult.data
    setUserInfo(userInfo)

    const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
    const userMenus = userMenusResult.data

    setUserMenus(userMenus)

    return result
  }

  return { currentStatus, login, getUser, getUserInfo, getUserMenus }
})

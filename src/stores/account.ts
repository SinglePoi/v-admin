import { loginRequest } from '@/service/login/login'
import { defineStore } from 'pinia'
import type { LoginResponseDate, LoginResponseResult } from '@/service/login/types'
import { localCache } from '@/hooks/use-cache'
import type { LoginModel } from './types'

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

  function getUser(): any {
    const { userInfo } = currentStatus
    return { ...userInfo }
  }

  async function login(user: LoginModel.LoginData) {
    const result: LoginResponseResult = await loginRequest(user)
    const data: LoginResponseDate = result?.data?.data
    setToken(data)
    console.log(getUser())

    return result
  }

  return { login, getUser }
})

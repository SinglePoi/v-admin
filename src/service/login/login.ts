import iceRequest from '@/service/request'

import LoginAPI from './api'
import type { LoginParams } from '@/views/login/cpns/types'
import type { ResponseResult } from '../request/types'
import type { LoginResponseDate } from './types'

export function loginRequest(form: LoginParams): ResponseResult<LoginResponseDate> {
  return iceRequest.post<LoginResponseDate>({
    url: LoginAPI.LOGIN,
    showLoading: true,
    data: form
  })
}

export function requestUserInfoById(id: number): ResponseResult {
  return iceRequest.get<unknown>({
    url: LoginAPI.USERINFO + id,
    showLoading: false
  })
}

export function requestUserMenusByRoleId(id: number): ResponseResult {
  return iceRequest.get<unknown>({
    url: LoginAPI.USERROLE + id + LoginAPI.MENUS,
    showLoading: false
  })
}

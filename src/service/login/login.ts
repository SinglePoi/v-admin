import iceRequest from '@/service/request'
import type { IceRequestConfig } from '@/service/request'
import type { LoginResponse, LoginResponseDate } from './types'

import LoginAPI from './api'
import type { LoginParams } from '@/views/login/cpns/types'
import type { DataType } from '../request/types'

export function loginRequest(form: LoginParams): LoginResponse {
  return iceRequest.post<DataType<LoginResponseDate>>({
    url: LoginAPI.LOGIN,
    showLoading: true,
    data: form
  })
}

export function requestUserInfoById(config: IceRequestConfig) {
  return iceRequest.get({})
}

export default {
  loginRequest
}

import IceRequest from './ice-request'
import type { IceRequest as instance } from './ice-request'
import type { IceRequestConfig } from './types'
export type { IceRequestConfig } from './types'
import { BASE_URL, TIME_OUT } from './config'

const config: IceRequestConfig = {
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config) => {
      const token = ''
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorsCatch: (err) => {
      return err
    },
    responseInterceptors: (res) => {
      return res
    },
    responseInterceptorsCatch: (err) => {
      return err
    }
  }
}

const iceRequest: instance = new IceRequest(config)

export default iceRequest

import axios from 'axios'
import type { IceRequestInterceptors, IceAxiosInstance, IceRequestConfig } from './types'
export const DEFAULT_LOADING = true

export class IceRequest<T = any> {
  instance: IceAxiosInstance
  interceptors?: IceRequestInterceptors
  showLoading?: boolean
  loading?: any
  constructor(config: IceRequestConfig<T>) {
    this.instance = axios.create(config)

    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    this.interceptors = config.interceptors
    // 添加请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'loading',
            background: 'rgba(0, 0, 0, 0.2)',
            fullscreen: true
          })
        }
        this.interceptors?.requestInterceptors(config)
        return config
      },
      this.interceptors?.requestInterceptorsCatch
    )

    // 添加响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        this.interceptors?.responseInterceptors(res)
        return res
      },
      (err) => {
        this.loading?.close()
        this.interceptors?.responseInterceptorsCatch(err)
        return err
      }
    )
  }

  request<T>(config: IceRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<T, T>(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          return err
        })
        .finally(() => {
          this.showLoading = DEFAULT_LOADING
        })
    })
  }
  get<T = any>(config: IceRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: IceRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: IceRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: IceRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default IceRequest

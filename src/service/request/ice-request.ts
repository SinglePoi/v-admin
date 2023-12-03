import axios from 'axios'
import type { IceRequestInterceptors, IceAxiosInstance, IceRequestConfig, DataType } from './types'
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
        const result = this.interceptors?.requestInterceptors(config)
        return result || config
      },
      (err) => {
        const result = this.interceptors?.requestInterceptorsCatch(err)
        return result || err
      }
    )

    // 添加响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        const result = this.interceptors?.responseInterceptors(res)
        return result || res
      },
      (err) => {
        this.loading?.close()
        const result = this.interceptors?.responseInterceptorsCatch(err)
        return result || err
      }
    )
  }

  request<T = any, R = DataType<T>, D = any>(config: IceRequestConfig<D>): Promise<R> {
    return new Promise((resolve, reject) => {
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<T, R>(config)
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
  get<T = any, R = DataType<T>, D = any>(config: IceRequestConfig<D>): Promise<R> {
    return this.request<T, R>({ ...config, method: 'GET' })
  }
  post<T = any, R = DataType<T>, D = any>(config: IceRequestConfig<D>): Promise<R> {
    return this.request<T, R>({ ...config, method: 'POST' })
  }
  delete<T = any, R = DataType<T>, D = any>(config: IceRequestConfig<D>): Promise<R> {
    return this.request<T, R>({ ...config, method: 'DELETE' })
  }
  patch<T = any, R = DataType<T>, D = any>(config: IceRequestConfig<D>): Promise<R> {
    return this.request<T, R>({ ...config, method: 'PATCH' })
  }
}

export default IceRequest

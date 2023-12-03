import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

export interface IceAxiosInstance extends AxiosInstance {}

export interface IceRequestInterceptors<T = any> {
  requestInterceptors: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorsCatch: (err: any) => any
  responseInterceptors: (response: AxiosResponse<T>) => AxiosResponse<T> | Promise<AxiosResponse<T>>
  responseInterceptorsCatch: (err: any) => any
}

export interface DataType<T = any> {
  code: number
  data: T
}

export interface IceResponse<T = any> extends AxiosResponse<DataType<T>> {}

export interface IceRequestConfig<T = any> extends AxiosRequestConfig<T> {
  interceptors?: IceRequestInterceptors<T>
  showLoading?: boolean
}

export interface ResponseResult<T = any> extends Promise<DataType<T>> {}

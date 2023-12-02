import type { IceResponse, DataType } from '../request/types'
export type { IceResponse } from '../request/types'

export interface LoginResponseDate<T = any> {
  id: number
  name: string
  token: string
  data: T
}

export interface LoginResponseResult extends IceResponse<DataType<LoginResponseDate>> {}

export interface LoginResponse extends Promise<LoginResponseResult> {}

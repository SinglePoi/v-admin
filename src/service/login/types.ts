export type { IceResponse } from '../request/types'

export interface LoginResponseDate<T = any> {
  id: number
  name: string
  token: string
  data: T
}

export namespace UserModel {
  export interface LoginData {
    account: string
    password: string
    name?: string
  }

  export interface LoginStatus {
    token: string
    userInfo: Record<string, any>
    userMenus: Array<UserMenus>
    permissions: any[]
  }

  export interface UserMenus {
    children: UserMenus[]
    icon: string
    id: number
    name: string
    sort: number
    type: number
    url: string
  }
}

export namespace LoginModel {
  export interface LoginData {
    account: string
    password: string
    name?: string
  }

  export interface LoginStatus {
    token: string
    userInfo: Record<string, any>
    userMenus: any[]
    permissions: any[]
  }
}

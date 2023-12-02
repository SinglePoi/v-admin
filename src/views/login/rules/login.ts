import type { FormRules } from 'element-plus'
import type { LoginParams } from '../cpns/types'

export const loginRulesMap = reactive<FormRules<LoginParams>>({
  account: [
    {
      required: true,
      message: '用户名必填',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{5,10}$/,
      message: '用户名必须是 5 到 10 位字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码必填',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{3,}$/,
      message: '密码必须由 3 位以上的数字或字母组成',
      trigger: 'blur'
    }
  ]
})

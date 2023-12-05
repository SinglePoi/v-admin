import type { BaseProps } from '@/types'

type FormType = 'input' | 'password' | 'select' | 'datepicker'

export interface SearchFormItem {
  field: string
  type: FormType
  label: string
  rules?: any[]
  placeholder?: any
  options?: any[]
  otherOptions?: any
  isHidden?: boolean
}

export interface SearchForm {
  formItems?: SearchFormItem[]
  colLayout?: any
  itemStyle?: any
  size?: {
    header?: '' | 'large' | 'default' | 'small'
    content?: '' | 'large' | 'default' | 'small'
    footer?: '' | 'large' | 'default' | 'small'
  }
  label?: {
    width?: string | number
    position?: 'left' | 'right' | 'top'
    suffix?: string
  }
}

export interface CustomSearchProps extends SearchForm, BaseProps {}

export interface SearchFormProps {
  searchFormConfig: SearchForm
}

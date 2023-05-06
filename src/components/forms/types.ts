export type FromInputValue = {
  value: string
  label?: string
  toggleValue?: boolean
  placeholder?: string
  required?: boolean
  disabled: (value: number | string) => boolean
}

export type FormValues = {
  [key: string]: FromInputValue
}

export type FormErrorTemplate = {
  email: string
  password: string
}

export interface LoginFormData extends FormValues {
  email: FromInputValue
  password: FromInputValue
}

export interface RegisterFormData extends FormValues {
  name: FromInputValue
  email: FromInputValue
  password: FromInputValue
}

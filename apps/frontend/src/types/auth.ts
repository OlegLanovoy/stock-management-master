export interface LoginFormData {
  login: string
  password: string
}

export interface RegisterFormData {
  name: string
  login: string
  password: string
}

export interface AuthInputProps {
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
}


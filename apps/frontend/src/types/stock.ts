export interface Stock {
  symbol: string
  name: string
  price: string
  change: string
  changeValue?: string
  isPositive: boolean
  onAdd?: () => Promise<void>
  isInPortfolio?: any
}

export interface StockCardProps {
  stock: Stock
  
}

export interface StatsCardProps {
  title: string
  value: string
  subtitle?: string
}

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

export interface AuthModalProps {
  open: boolean
  onClose: () => void
  onLogin: (data: LoginFormData) => void
  onRegister: (data: RegisterFormData) => void
}

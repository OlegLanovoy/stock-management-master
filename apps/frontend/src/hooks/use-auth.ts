"use client"

import { useState } from "react"
import type { LoginFormData, RegisterFormData } from "../types/auth"

interface User {
  name: string
  login: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (data: LoginFormData): Promise<void> => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      setUser({
        name: data.login, // In real app, this would come from API
        login: data.login,
      })
    } catch (error) {
      throw new Error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: RegisterFormData): Promise<void> => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful registration
      setUser({
        name: data.name,
        login: data.login,
      })
    } catch (error) {
      throw new Error("Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  const isAuthenticated = !!user

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  }
}

"use client"

import { useState } from "react"
import { ILoginDto } from "../services/auth.service"

export function useLoginForm() {
  const [formData, setFormData] = useState<ILoginDto>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Partial<ILoginDto>>({})

  const updateField = (field: keyof ILoginDto, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<ILoginDto> = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setFormData({ email: "", password: "" })
    setErrors({})
  }

  return {
    formData,
    errors,
    updateField,
    validateForm,
    resetForm,
  }
}

import { useState } from "react";
import { IRegisterDto } from "../services/auth.service";

export function useRegisterForm() {
  const [formData, setFormData] = useState<IRegisterDto>({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<IRegisterDto>>({});

  const updateField = (field: keyof IRegisterDto, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<IRegisterDto> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 2) {
      newErrors.username = "Username must be at least 2 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({ email: "", username: "", password: "" });
    setErrors({});
  };

  return {
    formData,
    errors,
    updateField,
    validateForm,
    resetForm,
  };
}

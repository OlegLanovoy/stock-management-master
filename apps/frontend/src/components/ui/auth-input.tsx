"use client";

import { TextField } from "@mui/material";
import type { AuthInputProps } from "../../types/auth";

export function AuthInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}: AuthInputProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <TextField
        fullWidth
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        error={!!error}
        helperText={error}
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
            "& fieldset": {
              borderColor: "#e2e8f0",
            },
            "&:hover fieldset": {
              borderColor: "#cbd5e1",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#64748b",
            },
            "&.Mui-error fieldset": {
              borderColor: "#ef4444",
            },
          },
          "& .MuiFormHelperText-root": {
            marginLeft: 0,
            marginTop: "4px",
          },
        }}
      />
    </div>
  );
}

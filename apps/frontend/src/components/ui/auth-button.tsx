"use client";

import { Button } from "@mui/material";
import { Login } from "@mui/icons-material";

interface AuthButtonProps {
  onClick: () => void;
}

export function AuthButton({ onClick }: AuthButtonProps) {
  return (
    <Button
      variant="contained"
      startIcon={<Login />}
      onClick={onClick}
      fullWidth
      sx={{
        backgroundColor: "#475569",
        color: "white",
        textTransform: "none",
        borderRadius: "8px",
        padding: "12px 16px",
        fontSize: "14px",
        fontWeight: 500,
        boxShadow:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "&:hover": {
          backgroundColor: "#334155",
        },
      }}
    >
      Sign In
    </Button>
  );
}

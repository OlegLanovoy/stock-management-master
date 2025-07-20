import type React from 'react';

import { Button } from '@mui/material';

interface SubmitButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export function SubmitButton({
  children,
  isLoading = false,
  loadingText = 'Loading...',
  disabled = false,
  onClick,
  type = 'submit',
}: SubmitButtonProps) {
  return (
    <Button
      type={type}
      fullWidth
      variant="contained"
      disabled={isLoading || disabled}
      size="large"
      onClick={onClick}
      sx={{
        backgroundColor: '#475569',
        color: 'white',
        textTransform: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 500,
        boxShadow:
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        '&:hover': {
          backgroundColor: '#334155',
        },
        '&:disabled': {
          backgroundColor: '#94a3b8',
          color: 'white',
        },
      }}
    >
      {isLoading ? loadingText : children}
    </Button>
  );
}

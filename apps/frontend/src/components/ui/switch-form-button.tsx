import type React from 'react';

import { Button } from '@mui/material';

interface SwitchFormButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function SwitchFormButton({ children, onClick }: SwitchFormButtonProps) {
  return (
    <Button
      variant="text"
      onClick={onClick}
      sx={{
        color: '#475569',
        textTransform: 'none',
        fontWeight: 500,
        padding: 0,
        minWidth: 'auto',
        '&:hover': {
          backgroundColor: 'transparent',
          color: '#334155',
          textDecoration: 'underline',
        },
      }}
    >
      {children}
    </Button>
  );
}

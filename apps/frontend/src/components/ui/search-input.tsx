import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange?: (value: string) => void;
}

export function SearchInput({
  placeholder = 'Search for stocks...',
  onChange,
  value,
}: SearchInputProps) {
  return (
    <TextField
      fullWidth
      placeholder={placeholder}
      variant="outlined"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      sx={{
        marginBottom: '16px',
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          '& fieldset': {
            borderColor: '#e2e8f0',
          },
          '&:hover fieldset': {
            borderColor: '#cbd5e1',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#64748b',
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search sx={{ color: '#9ca3af' }} />
          </InputAdornment>
        ),
      }}
    />
  );
}

import { TextField } from '@mui/material';

interface FormFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
}: FormFieldProps) {
  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      '& fieldset': {
        borderColor: '#e2e8f0',
      },
      '&:hover fieldset': {
        borderColor: '#cbd5e1',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#64748b',
      },
      '&.Mui-error fieldset': {
        borderColor: '#ef4444',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#374151',
      '&.Mui-focused': {
        color: '#64748b',
      },
      '&.Mui-error': {
        color: '#ef4444',
      },
    },
    '& .MuiFormHelperText-root': {
      marginLeft: 0,
      marginTop: '4px',
    },
  };

  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      error={!!error}
      helperText={error}
      required={required}
      variant="outlined"
      sx={textFieldStyles}
    />
  );
}

import { TextField } from '@mui/material';
import React from 'react';

export type FullWidthTextFieldEvent = (
  // e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  value: string,
) => void;

interface FullWidthTextFieldProps {
  label: string;
  defaultValue: string;
  error: string;
  small?: boolean;
  onChange: FullWidthTextFieldEvent;
}

export function FullWidthTextField({
  label,
  defaultValue,
  error,
  small,
  onChange,
}: FullWidthTextFieldProps) {
  return (
    <TextField
      label={label}
      sx={{
        minHeight: small ? '4rem' : '5rem',
      }}
      fullWidth
      defaultValue={defaultValue}
      error={!!error}
      size={small ? 'small' : undefined}
      helperText={error}
      onChange={(e) => {
        onChange(e.currentTarget.value);
      }}
    />
  );
}

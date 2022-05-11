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
  onChange: FullWidthTextFieldEvent;
}

export function FullWidthTextField({
  label,
  defaultValue,
  error,
  onChange,
}: FullWidthTextFieldProps) {
  return (
    <TextField
      label={label}
      sx={{
        minHeight: '5rem',
      }}
      fullWidth
      defaultValue={defaultValue}
      error={!!error}
      helperText={error}
      onChange={(e) => {
        onChange(e.currentTarget.value);
      }}
    />
  );
}

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

export function FullWidthTextField(props: FullWidthTextFieldProps) {
  const { label, defaultValue, error, onChange } = props;
  return (
    <TextField
      label={label}
      sx={{
        width: '100%',
        minHeight: '5rem',
      }}
      defaultValue={defaultValue}
      error={!!error}
      helperText={error}
      onChange={(e) => {
        onChange(e.currentTarget.value);
      }}
    />
  );
}

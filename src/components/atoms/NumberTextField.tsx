import { TextField } from '@mui/material';
import React from 'react';

export type NumberTextFieldEvent = (value: number) => void;

interface Props {
  label: string;
  defaultValue: number | undefined;
  error: string;
  small?: boolean;
  onChange: NumberTextFieldEvent;
}

function NumberTextField({ label, defaultValue, error, small, onChange }: Props) {
  return (
    <TextField
      type="number"
      inputProps={{ min: '0', step: '1' }}
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
        onChange(parseInt(e.currentTarget.value));
      }}
    />
  );
}

export default NumberTextField;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

import { FullWidthTextField } from './atoms/FullWidthTextField';

interface Props {
  name: string;
  validate: (value: string) => string;
  onAccept: (value: string) => void;
}

function LayoutRenameButton({ name, validate, onAccept }: Props) {
  const [open, setOpen] = React.useState(false);
  const [newName, setNewName] = React.useState(name);
  const [error, setError] = React.useState('');

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Rename
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="rename-dialog-title"
        aria-describedby="rename-dialog-description"
      >
        <DialogTitle id="rename-dialog-title">{`Rename ${name}`}</DialogTitle>
        <DialogContent
          sx={{
            minWidth: '400px',
          }}
        >
          <DialogContentText
            sx={{ marginBottom: '1rem' }}
            id="rename-dialog-description"
          ></DialogContentText>
          <FullWidthTextField
            label="New Layout Name"
            error={error}
            defaultValue={name}
            onChange={(value) => {
              setNewName(value);
              setError(validate(value));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={!!error}
            onClick={() => {
              setOpen(false);
              onAccept(newName);
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LayoutRenameButton;

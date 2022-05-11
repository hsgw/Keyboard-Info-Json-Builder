import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

interface Props {
  name: string;
  onAccept: () => void;
}

function LayoutRemoveButton({ name, onAccept }: Props) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Remove
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="remove-dialog-title"
        aria-describedby="remove-dialog-description"
      >
        <DialogTitle id="remove-dialog-title">{'Remove layout'}</DialogTitle>
        <DialogContent
          sx={{
            minWidth: '400px',
          }}
        >
          <DialogContentText id="remove-dialog-description">{`${name}`}</DialogContentText>
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
            onClick={() => {
              setOpen(false);
              onAccept();
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LayoutRemoveButton;

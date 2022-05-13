import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextareaAutosize,
} from '@mui/material';
import React from 'react';
import { importKleLayout } from 'utils/kle';

import { KeyValue } from './models/keyboardInfo/layout';

interface Props {
  addLayout: (name: string, layout: KeyValue[]) => void;
}

function LayoutKlePopup({ addLayout }: Props) {
  const [open, setOpen] = React.useState(false);
  const inputElm = React.useRef<HTMLTextAreaElement>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoad = () => {
    if (!inputElm.current) return;
    const layout = importKleLayout(inputElm.current.value);
    addLayout('LAYOUT!!!', layout);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Add layout from KLE
      </Button>{' '}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Load from KLE json</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Paste layout data from KLE Raw tab.
            <br />
            <a href="http://www.keyboard-layout-editor.com/">Keyboard Layout Editor</a>
          </DialogContentText>
          <TextareaAutosize
            ref={inputElm}
            placeholder="Paste here!"
            minRows={5}
            maxRows={20}
            aria-label="kle layout data"
            style={{ width: 500, marginTop: '1rem' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLoad}>Load</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LayoutKlePopup;

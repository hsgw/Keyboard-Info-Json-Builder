import { Grid } from '@mui/material';
import React, { Dispatch } from 'react';

import EditorHeader from './atoms/EditorHeader';
import { FullWidthTextField } from './atoms/FullWidthTextField';
import { USBState, USBStateActions } from './models/keyboardInfo/usb';

interface Props {
  state: USBState;
  dispatch: Dispatch<USBStateActions>;
}

const EditorUSB = React.memo(function EditorUSB({ state, dispatch }: Props) {
  return (
    <Grid
      container
      rowSpacing={2}
      sx={{
        width: '900px',
      }}
    >
      <EditorHeader>USB</EditorHeader>
      <Grid item container columnSpacing={2}>
        <Grid item xs={6}>
          <FullWidthTextField
            label="VID"
            defaultValue={state.value.vid}
            error={state.error.vid}
            onChange={(value) => {
              dispatch({ type: 'vid', payload: value });
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FullWidthTextField
            label="PID"
            defaultValue={state.value.pid}
            error={state.error.pid}
            onChange={(value) => {
              dispatch({ type: 'pid', payload: value });
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
});

export default EditorUSB;

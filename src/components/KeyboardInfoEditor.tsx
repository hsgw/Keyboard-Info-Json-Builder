import { Grid } from '@mui/material';
import React from 'react';
import { initialLayout, kle_lain } from 'utils/testLayout';

import EditorDescription from './EditorDescription';
import EditorLayout from './EditorLayout';
import EditorUSB from './EditorUSB';
import {
  descriptionReducer,
  initialDescription,
  initialDescriptionError,
} from './models/keyboardInfo/description';
import { initialLayoutError, layoutReducer } from './models/keyboardInfo/layout';
import { initialUSB, initialUSBError, USBReducer } from './models/keyboardInfo/usb';

function KeyboardInfoEditor() {
  const [descriptionState, descriptionDispatch] = React.useReducer(descriptionReducer, {
    value: initialDescription,
    error: initialDescriptionError,
  });

  const [usbState, usbDispatch] = React.useReducer(USBReducer, {
    value: initialUSB,
    error: initialUSBError,
  });

  const layout = [...initialLayout];
  layout.unshift({
    name: 'LAYOUT_LAIN',
    layout: kle_lain,
  });
  const [layoutState, layoutDispatch] = React.useReducer(layoutReducer, {
    value: layout,
    error: initialLayoutError,
  });

  return (
    <Grid container direction="column">
      <EditorDescription state={descriptionState} dispatch={descriptionDispatch} />
      <EditorUSB state={usbState} dispatch={usbDispatch} />
      <EditorLayout state={layoutState} dispatch={layoutDispatch} />
    </Grid>
  );
}

export default KeyboardInfoEditor;

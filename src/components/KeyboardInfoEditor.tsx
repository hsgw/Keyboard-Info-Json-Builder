import { Grid } from '@mui/material';
import React from 'react';
import { kle_ansi, kle_ergodox, kle_lain } from 'utils/testLayout';

import EditorDescription from './EditorDescription';
import EditorLayout from './EditorLayout';
import EditorUSB from './EditorUSB';
import {
  descriptionReducer,
  initialDescription,
  initialDescriptionError,
} from './models/keyboardInfo/description';
import { layoutReducer, LayoutValue } from './models/keyboardInfo/layout';
import { initialUSB, initialUSBError, USBReducer } from './models/keyboardInfo/usb';

function KeyboardInfoEditor() {
  const [descriptionState, descriptionDispatch] = React.useReducer(descriptionReducer, {
    value: initialDescription,
    error: initialDescriptionError,
  });

  const layout: LayoutValue[] = [
    {
      name: 'LAYOUT_LAIN',
      layout: kle_lain,
    },
    { name: 'LAYOUT_ANSI', layout: kle_ansi },
  ];

  const [layoutState, layoutDispatch] = React.useReducer(layoutReducer, {
    value: layout,
    error: [],
  });

  const [usbState, usbDispatch] = React.useReducer(USBReducer, {
    value: initialUSB,
    error: initialUSBError,
  });

  return (
    <Grid container direction="column">
      <EditorDescription state={descriptionState} dispatch={descriptionDispatch} />
      <EditorLayout state={layoutState} dispatch={layoutDispatch} />
      <EditorUSB state={usbState} dispatch={usbDispatch} />
    </Grid>
  );
}

export default KeyboardInfoEditor;

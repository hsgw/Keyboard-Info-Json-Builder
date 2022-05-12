import { Grid } from '@mui/material';
import React, { Dispatch } from 'react';

import EditorHeader from './atoms/EditorHeader';
import { FullWidthTextField } from './atoms/FullWidthTextField';
import {
  DescriptionState,
  DescriptionStateActions,
} from './models/keyboardInfo/description';

interface Props {
  state: DescriptionState;
  dispatch: Dispatch<DescriptionStateActions>;
}

const EditorDescription = React.memo(function EditorDescription({
  state,
  dispatch,
}: Props) {
  return (
    <Grid
      container
      rowSpacing={2}
      sx={{
        width: '900px',
      }}
    >
      <EditorHeader>Description</EditorHeader>
      <Grid item container columnSpacing={2}>
        <Grid item xs={4}>
          <FullWidthTextField
            label="keyboard_name"
            defaultValue={state.value.keyboard_name}
            error={state.error.keyboard_name}
            onChange={(value) => {
              dispatch({ type: 'keyboard_name', payload: value });
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <FullWidthTextField
            label="manufacturer"
            defaultValue={state.value.manufacturer}
            error={state.error.manufacturer}
            onChange={(value) => {
              dispatch({ type: 'manufacturer', payload: value });
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <FullWidthTextField
            label="maintainer"
            defaultValue={state.value.maintainer}
            error={state.error.maintainer}
            onChange={(value) => {
              dispatch({ type: 'maintainer', payload: value });
            }}
          />
        </Grid>
      </Grid>
      <Grid item container columnSpacing={2}>
        <Grid item xs={12}>
          <FullWidthTextField
            label="url"
            defaultValue={state.value.url}
            error={state.error.url}
            onChange={(value) => {
              dispatch({ type: 'url', payload: value });
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
});

export default EditorDescription;

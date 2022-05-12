import { Grid } from '@mui/material';
import React, { Dispatch } from 'react';

import EditorHeader from './atoms/EditorHeader';
import LayoutKlePopup from './LayoutKlePopup';
import LayoutView from './LayoutView';
import { KeyValue, LayoutState, LayoutStateActions } from './models/keyboardInfo/layout';

interface Props {
  state: LayoutState;
  dispatch: Dispatch<LayoutStateActions>;
}

const EditorLayout = React.memo(function EditorLayout({ state, dispatch }: Props) {
  const addLayout = (name: string, layout: KeyValue[]) => {
    dispatch({ type: 'add', payload: { name, layout } });
  };

  return (
    <Grid item container direction="column">
      <EditorHeader>Layout & Matrix</EditorHeader>
      <Grid item style={{ marginTop: '1rem' }}>
        <LayoutKlePopup addLayout={addLayout} />
      </Grid>
      <Grid item container columnSpacing={2}>
        {state.value.map((layout, layoutIndex) => {
          return (
            <React.Fragment key={`layout-${layout.name}-${layoutIndex}`}>
              <LayoutView layout={layout} index={layoutIndex} dispatch={dispatch} />
            </React.Fragment>
          );
        })}
      </Grid>
    </Grid>
  );
});

export default EditorLayout;

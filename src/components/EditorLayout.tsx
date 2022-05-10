import { Grid } from '@mui/material';
import React, { Dispatch } from 'react';

import EditorHeader from './atoms/EditorHeader';
import LayoutView from './LayoutView';
import { LayoutState, LayoutStateActions } from './models/keyboardInfo/layout';

interface Props {
  state: LayoutState;
  dispatch: Dispatch<LayoutStateActions>;
}

function EditorLayout({ state, dispatch }: Props) {
  return (
    <Grid item rowSpacing={2}>
      <EditorHeader>Layout & Matrix</EditorHeader>
      <Grid item container columnSpacing={2}>
        {state.value.map((layout, layoutIndex) => {
          return (
            <LayoutView
              key={`layout-${layout.name}-${layoutIndex}`}
              layout={layout}
              index={layoutIndex}
              dispatch={dispatch}
            />
          );
        })}
      </Grid>
    </Grid>
  );
}

export default EditorLayout;

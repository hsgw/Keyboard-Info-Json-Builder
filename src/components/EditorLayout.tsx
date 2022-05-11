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
  const layoutNames = state.value.reduce((ret, v) => {
    ret.push(v.name);
    return ret;
  }, [] as string[]);
  return (
    <Grid item rowSpacing={2}>
      <EditorHeader>Layout & Matrix</EditorHeader>
      <Grid item container columnSpacing={2}>
        {state.value.map((layout, layoutIndex) => {
          return (
            <React.Fragment key={`layout-${layout.name}-${layoutIndex}`}>
              <LayoutView
                layout={layout}
                index={layoutIndex}
                layoutNames={layoutNames}
                dispatch={dispatch}
              />
            </React.Fragment>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default EditorLayout;

import { css } from '@emotion/react';
import { Grid, Typography } from '@mui/material';
import React, { Dispatch } from 'react';
import { calculateRotatedOuterBounds } from 'utils/calculateKeyPosition';
import { KeyConstants } from 'utils/constants';

import LayoutKey from './LayoutKey';
import LayoutRemoveButton from './LayoutRemoveButton';
import LayoutRenameButton from './LayoutRenameButton';
import { LayoutStateActions, LayoutValue } from './models/keyboardInfo/layout';

interface Props {
  layout: LayoutValue;
  index: number;
  layoutNames: string[];
  dispatch: Dispatch<LayoutStateActions>;
}

function LayoutView({ layout, index, layoutNames, dispatch }: Props) {
  const outerBounds = calculateRotatedOuterBounds(layout.layout);

  const layoutView = css({
    width: `${outerBounds.right - outerBounds.left + KeyConstants.outerPadding * 2}px`,
    height: `${outerBounds.bottom - outerBounds.top + KeyConstants.outerPadding * 2}px`,
    backgroundColor: 'grey',
    position: 'relative',
  });

  return (
    <Grid item container direction={'column'}>
      <Grid item>
        <Typography sx={{ marginTop: '1rem' }} variant="h6">
          {layout.name}
        </Typography>
      </Grid>
      <Grid item>
        <div css={layoutView}>
          {layout.layout.map((elm, keyIndex) => {
            return (
              <React.Fragment key={`${layout.name}-${keyIndex}`}>
                <LayoutKey index={keyIndex} keyValue={elm} />
              </React.Fragment>
            );
          })}
        </div>
      </Grid>
      <Grid>
        <LayoutRemoveButton
          name={layout.name}
          onAccept={() => {
            dispatch({ type: 'remove', payload: index });
          }}
        />
        <LayoutRenameButton
          name={layout.name}
          validate={(newName) => {
            if (!newName) return 'Required';
            if (!/^LAYOUT($|_[a-zA-Z0-9_]+$)/.test(newName))
              return 'Wrong format ( "LAYOUT" or start "LAYOUT_Foo_Bar" )';
            if (layoutNames.includes(newName)) return 'Already exists same name';
            return '';
          }}
          onAccept={(name) => {
            dispatch({ type: 'rename', payload: { index, name } });
          }}
        />
      </Grid>
    </Grid>
  );
}

export default LayoutView;

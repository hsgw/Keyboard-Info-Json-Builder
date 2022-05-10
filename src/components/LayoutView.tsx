import { Button, Grid, Typography } from '@mui/material';
import React, { Dispatch } from 'react';
import { calculateRotatedOuterBounds } from 'utils/calculateKeyPosition';
import { KeyConstants } from 'utils/constants';

import LayoutKey from './LayoutKey';
import { LayoutStateActions, LayoutValue } from './models/keyboardInfo/layout';

interface Props {
  key: string;
  layout: LayoutValue;
  index: number;
  dispatch: Dispatch<LayoutStateActions>;
}

function LayoutView({ layout, index, dispatch }: Props) {
  const outerBounds = calculateRotatedOuterBounds(layout.layout);
  return (
    <Grid item container direction={'column'}>
      <Grid item>
        <Typography sx={{ marginTop: '1rem' }} variant="h6">
          {layout.name}
        </Typography>
      </Grid>
      <Grid item>
        <div
          className="layoutView"
          style={{
            width: `${
              outerBounds.right - outerBounds.left + KeyConstants.outerPadding * 2
            }px`,
            height: `${
              outerBounds.bottom - outerBounds.top + KeyConstants.outerPadding * 2
            }px`,
          }}
        >
          {layout.layout.map((elm, keyIndex) => {
            return (
              <LayoutKey
                key={`${layout.name} - ${keyIndex}`}
                index={keyIndex}
                keyValue={elm}
              />
            );
          })}
        </div>
      </Grid>
      <Grid>
        <Button
          onClick={(e) => {
            dispatch({ type: 'remove', payload: index });
          }}
        >
          Remove
        </Button>
      </Grid>
    </Grid>
  );
}

export default LayoutView;

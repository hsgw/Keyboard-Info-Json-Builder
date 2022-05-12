import { css } from '@emotion/react';
import { Collapse, Grid, Popover, Typography } from '@mui/material';
import React, { Dispatch } from 'react';
import { KeyConstants } from 'utils/constants';

import { FullWidthTextField } from './atoms/FullWidthTextField';
import NumberTextField from './atoms/NumberTextField';
import { KeyValue, LayoutStateActions } from './models/keyboardInfo/layout';

interface Props {
  layoutIndex: number;
  keyValue: KeyValue;
  keyIndex: number;
  keyOffset: { top: number; left: number };
  dispatch: Dispatch<LayoutStateActions>;
}

const calcOuterSize = (size: number) => KeyConstants.outerSize * size;
const calcInnerSize = (size: number) => KeyConstants.innerSize * size;

function LayoutKey({ layoutIndex, keyValue, keyIndex, keyOffset, dispatch }: Props) {
  const [popupAnchorElm, setPopupAnchorElm] = React.useState<HTMLDivElement | null>(null);

  const handleOpen = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    setPopupAnchorElm(e.currentTarget);
  };

  const handleClose = () => {
    setPopupAnchorElm(null);
  };

  const outerKey = css({
    width: `${calcOuterSize(keyValue.w ?? 1)}px`,
    height: `${calcOuterSize(keyValue.h ?? 1)}px`,
    top: `${
      calcOuterSize(keyValue.y ?? 1) - keyOffset.top + KeyConstants.outerPadding
    }px`,
    left: `${
      calcOuterSize(keyValue.x ?? 1) - keyOffset.left + KeyConstants.outerPadding
    }px`,
    transformOrigin: `${calcOuterSize(
      (keyValue.rx ?? keyValue.x ?? 0) - (keyValue.x ?? 0),
    )}px
            ${calcOuterSize((keyValue.ry ?? keyValue.y ?? 0) - (keyValue.y ?? 0))}px`,
    transform: `rotate(${keyValue.r}deg)`,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'space-around',
    alignItems: 'center',
    margin: '0px',
    padding: '0px',
    userSelect: 'none',
  });

  const keyInner = css({
    width: `${calcInnerSize(keyValue.w ?? 1)}px`,
    height: `${calcInnerSize(keyValue.h ?? 1)}px`,
    border: '1px solid black',
    backgroundColor: 'white',
    fontSize: 'small',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  });

  const popup = css({
    padding: '1.5rem 1.5rem 0 1.5rem',
  });

  return (
    <>
      <div
        css={outerKey}
        role="button"
        tabIndex={0}
        onKeyDown={handleOpen}
        onClick={handleOpen}
      >
        <div css={keyInner}>
          {/* <div>{`${keyValue.matrix ? keyValue.matrix[0] : ''} / ${
            keyValue.matrix ? keyValue.matrix[1] : ''
          }`}</div> */}
          <div>{`${keyIndex}`}</div>
          <div>{keyValue.label}</div>
        </div>
      </div>
      <Popover
        open={!!popupAnchorElm}
        anchorEl={popupAnchorElm}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transitionDuration={0.1}
      >
        <div css={popup}>
          <Grid container spacing={2}>
            <Grid item>
              <NumberTextField
                small
                label="Row"
                defaultValue={keyValue.matrix ? keyValue.matrix[0] : undefined}
                error={''}
                onChange={(value) => {
                  dispatch({
                    type: 'key_matrix',
                    payload: {
                      index: layoutIndex,
                      key: {
                        index: keyIndex,
                        matrix: [value, keyValue.matrix ? keyValue.matrix[1] : undefined],
                      },
                    },
                  });
                }}
              />
            </Grid>
            <Grid item>
              <NumberTextField
                label="Col"
                small
                defaultValue={keyValue.matrix ? keyValue.matrix[1] : undefined}
                error={''}
                onChange={(value) => {
                  dispatch({
                    type: 'key_matrix',
                    payload: {
                      index: layoutIndex,
                      key: {
                        index: keyIndex,
                        matrix: [keyValue.matrix ? keyValue.matrix[0] : undefined, value],
                      },
                    },
                  });
                }}
              />
            </Grid>
          </Grid>
          <div>
            <FullWidthTextField
              small
              label="Label"
              defaultValue={keyValue.label ?? ''}
              error=""
              onChange={(value) => {
                dispatch({
                  type: 'key_label',
                  payload: { index: layoutIndex, key: { index: keyIndex, label: value } },
                });
              }}
            />
          </div>
        </div>
      </Popover>
    </>
  );
}

export default LayoutKey;

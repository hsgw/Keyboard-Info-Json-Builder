import { css } from '@emotion/react';
import React from 'react';
import { KeyConstants } from 'utils/constants';

import { KeyValue } from './models/keyboardInfo/layout';

interface Props {
  keyValue: KeyValue;
  index: number;
}

const calcOuterSize = (size: number) => KeyConstants.outerSize * size;
const calcInnerSize = (size: number) => KeyConstants.innerSize * size;

function LayoutKey({ keyValue, index }: Props) {
  const outerKey = css({
    width: `${calcOuterSize(keyValue.w ?? 1)}px`,
    height: `${calcOuterSize(keyValue.h ?? 1)}px`,
    top: `${calcOuterSize(keyValue.y ?? 1) + KeyConstants.outerPadding}px`,
    left: `${calcOuterSize(keyValue.x ?? 1) + KeyConstants.outerPadding}px`,
    transformOrigin: `${calcOuterSize(
      (keyValue.rx ?? keyValue.x ?? 0) - (keyValue.x ?? 0),
    )}px
            ${calcOuterSize((keyValue.ry ?? keyValue.y ?? 0) - (keyValue.y ?? 0))}px`,
    transform: `rotate(${keyValue.r}deg)`,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
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
  });

  return (
    <div css={outerKey}>
      <div css={keyInner}></div>
    </div>
  );
}

export default LayoutKey;

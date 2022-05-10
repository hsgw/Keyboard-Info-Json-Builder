import React from 'react';
import { KeyConstants } from 'utils/constants';

import { KeyValue } from './models/keyboardInfo/layout';

interface Props {
  key: string;
  keyValue: KeyValue;
  index: number;
}

const calcOuterSize = (size: number) => KeyConstants.outerSize * size;
const calcInnerSize = (size: number) => KeyConstants.innerSize * size;

function LayoutKey({ keyValue, index }: Props) {
  return (
    <div
      className="keyOuter"
      style={{
        width: `${calcOuterSize(keyValue.w ?? 1)}px`,
        height: `${calcOuterSize(keyValue.h ?? 1)}px`,
        top: `${calcOuterSize(keyValue.y ?? 1) + KeyConstants.outerPadding}px`,
        left: `${calcOuterSize(keyValue.x ?? 1) + KeyConstants.outerPadding}px`,
        transformOrigin: `${calcOuterSize(
          (keyValue.rx ?? keyValue.x ?? 0) - (keyValue.x ?? 0),
        )}px
          ${calcOuterSize((keyValue.ry ?? keyValue.y ?? 0) - (keyValue.y ?? 0))}px`,
        transform: `rotate(${keyValue.r}deg)`,
      }}
    >
      <div
        className="keyInner"
        style={{
          width: `${calcInnerSize(keyValue.w ?? 1)}px`,
          height: `${calcInnerSize(keyValue.h ?? 1)}px`,
        }}
      ></div>
    </div>
  );
}

export default LayoutKey;

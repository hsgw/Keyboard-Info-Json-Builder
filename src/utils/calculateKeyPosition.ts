import { KeyValue } from 'components/models/keyboardInfo/layout';

import { KeyConstants } from './constants';

interface Point {
  x: number;
  y: number;
}

interface RectPoint {
  topL: Point;
  topR: Point;
  bottomL: Point;
  bottomR: Point;
}

interface Outerbounds {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface KeyPosition {
  x: number;
  y: number;
  w: number;
  h: number;
  rx: number;
  ry: number;
  r: number;
}

function rotatePoint(x: number, y: number, rx: number, ry: number, r: number): Point {
  const rad = r * (Math.PI / 180);
  return {
    x: rx + (x - rx) * Math.cos(rad) - (y - ry) * Math.sin(rad),
    y: ry + (x - rx) * Math.sin(rad) + (y - ry) * Math.cos(rad),
  };
}

export function rotateRect({ x, y, w, h, rx, ry, r }: KeyPosition): RectPoint {
  return {
    topL: rotatePoint(x, y, rx, ry, r),
    topR: rotatePoint(x + w, y, rx, ry, r),
    bottomL: rotatePoint(x, y + h, rx, ry, r),
    bottomR: rotatePoint(x + w, y + h, rx, ry, r),
  };
}

export function calculateRotatedOuterBounds(pos: Array<KeyValue>): Outerbounds {
  return pos
    .map((elm) =>
      rotateRect({
        x: elm.x * KeyConstants.outerSize,
        y: elm.y * KeyConstants.outerSize,
        w: (elm.w ?? 1) * KeyConstants.outerSize,
        h: (elm.h ?? 1) * KeyConstants.outerSize,
        rx: (elm.rx ?? 0) * KeyConstants.outerSize,
        ry: (elm.ry ?? 0) * KeyConstants.outerSize,
        r: elm.r ?? 0,
      }),
    )
    .reduce(
      (ret, current) => ({
        top: Math.min(
          ret.top,
          current.topL.y,
          current.topR.y,
          current.bottomL.y,
          current.bottomR.y,
        ),
        bottom: Math.max(
          ret.bottom,
          current.topL.y,
          current.topR.y,
          current.bottomL.y,
          current.bottomR.y,
        ),
        left: Math.min(
          ret.left,
          current.topL.x,
          current.topR.x,
          current.bottomL.x,
          current.bottomR.x,
        ),
        right: Math.max(
          ret.left,
          current.topL.x,
          current.topR.x,
          current.bottomL.x,
          current.bottomR.x,
        ),
      }),
      {
        top: Infinity,
        bottom: -Infinity,
        left: Infinity,
        right: -Infinity,
      },
    );
}

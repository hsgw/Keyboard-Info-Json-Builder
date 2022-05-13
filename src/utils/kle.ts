import * as KLE from '@ijprest/kle-serial';
import { KeyValue } from 'components/models/keyboardInfo/layout';
import JSON5 from 'json5';

export const importKleLayout = (data: string): KeyValue[] => {
  return KLE.Serial.deserialize(JSON5.parse(`[${data}]`)).keys.reduce((ret, key) => {
    const temp = {
      x: key.x,
      y: key.y,
      w: key.width,
      h: key.height,
      r: key.rotation_angle,
      rx: key.rotation_x,
      ry: key.rotation_y,
      label: key.labels[0],
      matrix: [null, null] as Array<number | null>,
    };
    if (/^[0-9]+,[0-9]+$/.test(key.labels[0])) {
      const matrix = key.labels[0].split(',').reduce((ret, v) => {
        ret.push(parseInt(v));
        return ret;
      }, [] as number[]);
      if (matrix.length === 2) {
        temp.matrix = matrix;
        temp.label = '';
      }
    }
    ret.push(temp);
    return ret;
  }, [] as KeyValue[]);
};

import * as KLE from '@ijprest/kle-serial';
import { KeyValue, LayoutValue } from 'components/models/keyboardInfo/layout';
import JSON5 from 'json5';

export const importKleLayout = (data: string): KeyValue[] => {
  return KLE.Serial.deserialize(JSON5.parse(`[${data}]`)).keys.reduce((ret, key) => {
    ret.push({
      x: key.x,
      y: key.y,
      w: key.width,
      h: key.height,
      r: key.rotation_angle,
      rx: key.rotation_x,
      ry: key.rotation_y,
      label: key.labels[0],
    });
    return ret;
  }, [] as KeyValue[]);
};

import { cloneDeep } from 'lodash-es';

export interface KeyValue {
  x: number;
  y: number;
  label: string;
  matrix: Array<number | null>;
  w?: number;
  h?: number;
  r?: number;
  rx?: number;
  ry?: number;
}

export interface LayoutValue {
  name: string;
  c_macro?: boolean;
  filename?: string;
  layout: Array<KeyValue>;
}

export type Layout = Array<LayoutValue>;

export interface LayoutError {
  [key: number]: string;
}

export const initialLayoutError: LayoutError = [''];

export interface LayoutState {
  value: Layout;
  error: LayoutError;
}

export type LayoutStateActions =
  | {
      type: 'add';
      payload: { name: string; layout: KeyValue[] };
    }
  | {
      type: 'remove';
      payload: number;
    }
  | {
      type: 'rename';
      payload: {
        index: number;
        name: string;
      };
    }
  | {
      type: 'key_matrix';
      payload: {
        index: number;
        key: { index: number; matrix: Array<number | null> };
      };
    }
  | {
      type: 'key_label';
      payload: {
        index: number;
        key: { index: number; label: string };
      };
    };

export const layoutReducer = (
  state: LayoutState,
  action: LayoutStateActions,
): LayoutState => {
  const error = '';
  switch (action.type) {
    case 'add': {
      const newValue = [...state.value];
      newValue.push({
        name: action.payload.name,
        layout: action.payload.layout,
      });
      return {
        value: newValue,
        error: { ...state.error },
      };
    }
    case 'remove':
      return {
        value: [
          ...state.value.slice(0, action.payload),
          ...state.value.slice(action.payload + 1),
        ],
        error: { ...state.error },
      };
    case 'rename': {
      const newValue = [...state.value];
      newValue[action.payload.index].name = action.payload.name;
      return {
        value: newValue,
        error: { ...state.error },
      };
    }
    case 'key_label': {
      const layoutIndex = action.payload.index;
      const keyIndex = action.payload.key.index;
      const newValue = cloneDeep(state.value);
      // newValue[layoutIndex].layout = [...newValue[layoutIndex].layout];
      // newValue[layoutIndex].layout[keyIndex] = {
      //   ...newValue[layoutIndex].layout[keyIndex],
      // };
      newValue[layoutIndex].layout[keyIndex].label = action.payload.key.label;
      return {
        value: newValue,
        error: { ...state.error },
      };
    }
    case 'key_matrix': {
      const layoutIndex = action.payload.index;
      const keyIndex = action.payload.key.index;
      const newValue = cloneDeep(state.value);
      newValue[layoutIndex].layout[keyIndex].matrix = [...action.payload.key.matrix];
      return {
        value: newValue,
        error: { ...state.error },
      };
    }
    // default:
    //   console.error(`Layout: unknown event "${action.type}"`);
    //   return state;
  }
};

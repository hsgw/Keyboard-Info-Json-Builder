import { accordionActionsClasses } from '@mui/material';

export interface KeyValue {
  h?: number;
  label?: string;
  matrix?: number[];
  r?: number;
  rx?: number;
  ry?: number;
  w?: number;
  x: number;
  y: number;
}

export interface LayoutValue {
  name: string;
  c_macro?: boolean;
  filename?: string;
  layout: Array<KeyValue>;
}

export type Layout = Array<LayoutValue>;

export const initialLayout: Layout = [
  {
    name: 'LAYOUT',
    layout: [
      { w: 1, x: 0, y: 0 },
      { w: 1, x: 1, y: 0 },
      { w: 1, x: 2, y: 0 },
      { w: 1, x: 3, y: 0 },
      { w: 1, x: 0, y: 1 },
      { w: 1, x: 1, y: 1 },
      { w: 1, x: 2, y: 1 },
      { w: 1, x: 3, y: 1 },
    ],
  },
];

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
        matrix: { index: number; value: number[] };
      };
    }
  | {
      type: 'key_label';
      payload: {
        index: number;
        label: string;
      };
    };

export const layoutReducer = (
  state: LayoutState,
  action: LayoutStateActions,
): LayoutState => {
  const error = '';
  switch (action.type) {
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
    default:
      console.error(`Layout: unknown event "${action.type}"`);
      return state;
  }
};

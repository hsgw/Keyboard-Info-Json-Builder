import Validator from 'utils/validators';

export interface USB {
  vid: string;
  pid: string;
  device_version?: string;
  device_ver?: string;
  force_nkro?: boolean;
  max_power?: number;
  no_startup_check?: boolean;
  polling_interval?: number;
  shared_endpoint?: SharedEndpoint;
  suspend_wakeup_delay?: number;
  wait_for?: boolean;
}

export interface SharedEndpoint {
  keyboard?: boolean;
  mouse?: boolean;
}

export const initialUSB: USB = {
  vid: '0xFEED',
  pid: '0x0000',
};

export type USBError = {
  [key in keyof USB]: string;
};

export const initialUSBError: USBError = {
  vid: '',
  pid: '',
};

export interface USBState {
  value: USB;
  error: USBError;
}

export type USBStateActions =
  | {
      type: 'vid';
      payload: string;
    }
  | {
      type: 'pid';
      payload: string;
    };

export const USBReducer = (state: USBState, action: USBStateActions): USBState => {
  let error = '';
  switch (action.type) {
    case 'vid':
      if (!action.payload) error = 'Required!';
      else if (!Validator.hexNumber4d(action.payload))
        error = 'Require hex 4digits number (0xFEED, 0x1234)';
      return {
        value: { ...state.value, ...{ vid: action.payload } },
        error: { ...state.error, ...{ vid: error } },
      };
    case 'pid':
      if (!action.payload) error = 'Required!';
      else if (!Validator.hexNumber4d(action.payload))
        error = 'Require hex 4digits number (0xFEED, 0x1234)';
      return {
        value: { ...state.value, ...{ pid: action.payload } },
        error: { ...state.error, ...{ pid: error } },
      };
    default:
      console.error(`USB: unknown event "${action}"`);
      return state;
  }
};

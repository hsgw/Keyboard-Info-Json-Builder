import Validator from 'utils/validators';

export interface Description {
  keyboard_name: string;
  maintainer: string;
  manufacturer: string;
  keyboard_folder: string | null;
  url: string;
}

export const initialDescription: Description = {
  keyboard_name: '',
  maintainer: '',
  manufacturer: '',
  keyboard_folder: '',
  url: '',
};

export type DescriptionError = {
  [key in keyof Description]: string;
};

export const initialDescriptionError: DescriptionError = {
  keyboard_name: '',
  maintainer: '',
  manufacturer: '',
  keyboard_folder: '',
  url: '',
};

export interface DescriptionState {
  value: Description;
  error: DescriptionError;
}

export type DescriptionStateActions = {
  type: keyof Description;
  payload: string;
};

export const descriptionReducer = (
  state: DescriptionState,
  action: DescriptionStateActions,
): DescriptionState => {
  let error = '';
  switch (action.type) {
    case 'keyboard_name':
      if (!action.payload) error = 'Required!';
      else if (!Validator.textIdentifier(action.payload))
        error = 'Less than 250 characters';
      return {
        value: { ...state.value, ...{ keyboard_name: action.payload } },
        error: { ...state.error, ...{ keyboard_name: error } },
      };
    case 'maintainer':
      if (!action.payload) error = 'Required!';
      else if (!Validator.textIdentifier(action.payload))
        error = 'Less than 250 characters';
      return {
        value: { ...state.value, ...{ maintainer: action.payload } },
        error: { ...state.error, ...{ maintainer: error } },
      };
    case 'manufacturer':
      if (!action.payload) error = 'Required!';
      else if (!Validator.textIdentifier(action.payload))
        error = 'Less than 250 characters';
      return {
        value: { ...state.value, ...{ manufacturer: action.payload } },
        error: { ...state.error, ...{ manufacturer: error } },
      };
    case 'url':
      if (!!action.payload && !Validator.url(action.payload)) error = 'Not valid URL';
      return {
        value: { ...state.value, ...{ url: action.payload } },
        error: { ...state.error, ...{ url: error } },
      };
    default: {
      console.error(`Description: unknown event "${action}"`);
      return state;
    }
  }
};

import { LOAD_SETTINGS, UPDATE_SETTINGS } from '../constants';

const initialSettingsState = {
  receiveNotifications: false
};

const settings = (state = initialSettingsState, action) => {
  switch(action.type) {
    case LOAD_SETTINGS:
      return { ...state, ...action.settings };
    case UPDATE_SETTINGS:
      return {...state, ...action.settings };
    default:
      return state;
  }
};

export default settings;

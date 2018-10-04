import * as StorageUtil from '../lib/storageUtil';
import { LOAD_SETTINGS, UPDATE_SETTINGS } from '../constants';

export const loadSettings = () => dispatch => {
  return StorageUtil
    .loadSettings()
    .then(settings => dispatch({
      type: LOAD_SETTINGS,
      settings: JSON.parse(settings)
    }));
};

export const updateSettings = settings => dispatch => {
  return StorageUtil
    .updateSettings(settings)
    .then(() => dispatch({
      type: UPDATE_SETTINGS,
      settings
    }));
};

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as StorageUtil from '../../lib/storageUtil';
import * as actions from '../../actions';
import { LOAD_SETTINGS, UPDATE_SETTINGS } from '../../constants';

describe('settings actions', () => {
  const setup = () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({ settings: {} });

    return { store }
  }

  describe('loadSettings', () => {
    it('loads all the settings in the storage and dispatches LOAD_SETTINGS', async () => {
      const { store } = setup();
      jest.spyOn(StorageUtil, 'loadSettings');

      await store.dispatch(actions.loadSettings());

      expect(StorageUtil.loadSettings).toHaveBeenCalled();
      expect(store.getActions()[0]).toHaveProperty('type', LOAD_SETTINGS);
    });
  });

  describe('updateSettings', () => {
    it('updates the settings in the storage and dispatches UPDATE_SETTINGS', async () => {
      const { store } = setup();
      const settings = { receiveNotifications: false };
      jest.spyOn(StorageUtil, 'updateSettings');

      await store.dispatch(actions.updateSettings(settings));

      expect(StorageUtil.updateSettings).toHaveBeenCalledWith(settings);
      expect(store.getActions()[0]).toEqual({
        'type': UPDATE_SETTINGS,
        settings
      });
    });
  });
})

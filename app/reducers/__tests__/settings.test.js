import reducer from '../settings';
import { LOAD_SETTINGS, UPDATE_SETTINGS } from '../../constants';

describe('settings reducer', () => {
  it('handles LOAD_SETTINGS', () => {
    const settings = { receiveNotifications: false };

    expect(
      reducer({}, { type: LOAD_SETTINGS, settings })
    ).toEqual(settings)
  });

  it('handles UPDATE_SETTINGS', () => {
    const oldSettings = { receiveNotifications: false };
    const newSettings = { receiveNotifications: true };

    expect(
      reducer(oldSettings, { type: UPDATE_SETTINGS, settings: newSettings })
    ).toEqual(newSettings)
  });

  it('handles default state', () => {
    expect(
      reducer(undefined, { type: undefined })
    ).toEqual({ receiveNotifications: false })
  });
})

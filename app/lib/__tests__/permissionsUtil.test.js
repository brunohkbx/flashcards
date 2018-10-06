import { obtainNotificationPermission }  from '../permissionsUtil';
import { Permissions } from 'expo';

jest.mock('expo', () => ({
  Permissions: {
    getAsync: jest.fn(),
    askAsync: jest.fn(),
    NOTIFICATIONS: jest.fn()
  }
}));

describe('obtainNotificationPermission', () => {
  it('calls getAsync', async () => {
    Permissions.getAsync.mockReturnValueOnce({ status: 'granted' });

    await obtainNotificationPermission();

    expect(
      Permissions.getAsync
    ).toHaveBeenCalledWith(Permissions.NOTIFICATIONS);
  });

  describe('When getAsync status is different from granted', () => {
    it('calls askAsync', async () => {
      Permissions.getAsync.mockReturnValueOnce({ status: 'denied' });
      Permissions.askAsync.mockReturnValueOnce({ status: 'denied' });

      await obtainNotificationPermission();

      expect(
        Permissions.askAsync
      ).toHaveBeenCalledWith(Permissions.NOTIFICATIONS);
    });
  });
});

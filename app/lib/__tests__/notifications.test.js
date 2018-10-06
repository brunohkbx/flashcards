import * as notificationUtil from '../notifications';
import { Notifications } from 'expo';
import * as storageUtil from '../storageUtil';

jest.mock('expo', () => ({
  Notifications: {
    cancelAllScheduledNotificationsAsync: jest.fn(),
    scheduleLocalNotificationAsync: jest.fn()
  }
}));

describe('notifications', () => {
  describe('clearLocalNotification', () => {
    it('calls storageUtil.unscheduleNotification', () => {
      jest.spyOn(storageUtil, 'unscheduleNotification');

      notificationUtil.clearLocalNotification();

      expect(storageUtil.unscheduleNotification).toHaveBeenCalled();
    });

    it('calls cancelAllScheduledNotificationsAsync', async () => {
      await notificationUtil.clearLocalNotification();

      expect(
        Notifications.cancelAllScheduledNotificationsAsync
      ).toHaveBeenCalled();
    });
  });

  describe('scheduleLocalNotification', () => {
    it ('calls storageUtil.isScheduledNotification', () => {
      jest.spyOn(storageUtil, 'isScheduledNotification');

      notificationUtil.scheduleLocalNotification();

      expect(storageUtil.isScheduledNotification).toHaveBeenCalled();
    });

    describe('When there is a scheduled notification', () => {
      beforeAll(() => {
        jest.spyOn(storageUtil, 'isScheduledNotification').mockImplementation(() => {
          return Promise.resolve(JSON.stringify(true));
        });
      });

      it('cancells all notifications then schedule a new notification and then updates the storage', async () => {
        jest.spyOn(storageUtil, 'scheduleNotification');

        await notificationUtil.scheduleLocalNotification();

        expect(Notifications.cancelAllScheduledNotificationsAsync).toHaveBeenCalled();
        expect(Notifications.scheduleLocalNotificationAsync).toHaveBeenCalledWith(
          {
            title: 'Haven\'t seen you in a while',
            body: '👋 Don\'t forget to take your quiz today!',
            ios: {
              sound: true
            },
            android: {
              sound: true,
              priority: 'high',
              sticky: false,
              vibrate: true
            }
          },
          {
            time: expect.any(Date),
            repeat: 'day',
          }
        );

        expect(storageUtil.scheduleNotification).toHaveBeenCalled();
      });
    });
  });
});

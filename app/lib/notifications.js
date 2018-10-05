import { Notifications } from 'expo';
import * as storageUtil from '../lib/storageUtil';

export const clearLocalNotification = () => {
  return storageUtil.unscheduleNotification()
    .then(Notifications.cancelAllScheduledNotificationsAsync);
};

export const scheduleLocalNotification = () => {
  return storageUtil.isScheduledNotification()
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Notifications.cancelAllScheduledNotificationsAsync();

        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(18);
        tomorrow.setMinutes(30);

        Notifications.scheduleLocalNotificationAsync(
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
            time: tomorrow,
            repeat: 'day',
          }
        );

        storageUtil.scheduleNotification();
      }
    });
};

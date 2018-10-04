import { Permissions } from 'expo';

export const obtainNotificationPermission = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    finalStatus = status;
  }

  return finalStatus;
};

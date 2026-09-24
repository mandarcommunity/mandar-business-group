// @ts-nocheck
import { Expo } from 'expo-server-sdk';

const expo = new Expo();

export const sendPushNotification = async (pushToken: string, title: string, body: string, data: any = {}) => {
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
    return;
  }

  const messages = [{
    to: pushToken,
    sound: 'default' as const,
    title,
    body,
    data,
  }];

  try {
    let ticketChunk = await expo.sendPushNotificationsAsync(messages);
    console.log('Push ticket:', ticketChunk);
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};

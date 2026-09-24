import { useState, useEffect, useRef } from 'react';
import { Platform, DeviceEventEmitter } from 'react-native';
import * as Device from 'expo-device';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import API from '../services/api';
import { getAccessToken } from '../utils/storage';

const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

let Notifications: any = null;

if (!isExpoGo) {
  try {
    Notifications = require('expo-notifications');
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  } catch (e) {
    console.log("Could not load expo-notifications", e);
  }
}

export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  async function registerForPushNotificationsAsync() {
    if (isExpoGo) {
      console.log('Push notifications are not supported in Expo Go. Skipping...');
      return undefined;
    }
    
    if (!Notifications) return undefined;

    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
      
      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
      } catch (e) {
        console.log("Error getting push token:", e);
      }
    } else {
      console.log('Must use physical device for Push Notifications');
    }

    return token;
  }

  const uploadTokenToBackend = async (token: string) => {
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) return;
      await API.put('/auth/push-token', { pushToken: token }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      console.log("Push token uploaded to backend");
    } catch (e) {
      console.log("Failed to upload push token:", e);
    }
  };

  useEffect(() => {
    if (isExpoGo || !Notifications) return;

    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
      if (token) uploadTokenToBackend(token);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener((notification: any) => {
      setNotification(notification);
      if (notification.request.content.data?.chatId) {
        DeviceEventEmitter.emit('refresh_chats');
      }
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response: any) => {
      console.log("Notification Response:", response);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return { expoPushToken, notification };
}

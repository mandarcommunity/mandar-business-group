import axios from "axios";
import { getRefreshToken, saveAccessToken, saveRefreshToken, clearStorage } from "../utils/storage";
import { DeviceEventEmitter, Alert } from "react-native";

export const API = axios.create({
  baseURL: "https://mandar-community.onrender.com/api",
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 403 && error.response.data?.message?.includes('blocked')) {
      await clearStorage();
      Alert.alert("Account Blocked", error.response.data.message);
      DeviceEventEmitter.emit('force_logout');
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return API(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const res = await axios.post("https://mandar-community.onrender.com/api/auth/refresh-token", { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = res.data.data;

        await saveAccessToken(accessToken);
        await saveRefreshToken(newRefreshToken);

        API.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
        originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
        
        processQueue(null, accessToken);
        return API(originalRequest);
      } catch (err) {
        processQueue(err, null);
        console.log("Refresh token failed. Clearing storage.");
        await clearStorage();
        DeviceEventEmitter.emit('force_logout');
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

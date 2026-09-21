import { API } from "./api";

export const getNotifications = async (token: string) => {
  return await API.get("/notifications", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getUnreadCount = async (token: string) => {
  return await API.get("/notifications/unread-count", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const markAsRead = async (id: string, token: string) => {
  return await API.put(`/notifications/${id}/read`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const markAllAsRead = async (token: string) => {
  return await API.put("/notifications/read-all", {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

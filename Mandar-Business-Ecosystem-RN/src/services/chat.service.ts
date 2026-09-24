import { API } from "./api";

export const getMyChats = async (token: string) => {
  return await API.get("/chats", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getOrCreateChat = async (token: string, otherUserId: string) => {
  return await API.post("/chats", { otherUserId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getChatMessages = async (token: string, chatId: string) => {
  return await API.get(`/chats/${chatId}/messages`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const sendMessage = async (token: string, chatId: string, content: string) => {
  return await API.post(`/chats/${chatId}/messages`, { content }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const markChatAsRead = async (token: string, chatId: string) => {
  return await API.post(`/chats/${chatId}/read`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateChatState = async (token: string, chatId: string, action: string) => {
  return await API.post(`/chats/${chatId}/state`, { action }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const clearChat = async (token: string, chatId: string) => {
  return await API.post(`/chats/${chatId}/clear`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteMessages = async (token: string, chatId: string, messageIds: string[]) => {
  return await API.post(`/chats/${chatId}/messages/delete`, { messageIds }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const reportChat = async (token: string, chatId: string, reason: string) => {
  return await API.post(`/chats/${chatId}/report`, { reason }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

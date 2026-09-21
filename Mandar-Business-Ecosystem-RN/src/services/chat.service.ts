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

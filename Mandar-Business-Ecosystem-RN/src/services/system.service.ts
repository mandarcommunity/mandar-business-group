import { API } from "./api";

export const getPlatformStats = async () => {
  return await API.get("/system/stats");
};

export const submitFeedback = async (data: { subject: string; message: string }, token: string) => {
  return await API.post("/system/feedback", data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

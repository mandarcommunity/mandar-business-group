import { API } from './api';

export const createAdvertisement = async (token: string, data: any) => {
  return API.post('/advertisements', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getMyAdvertisements = async (token: string) => {
  return API.get('/advertisements/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getAllAdvertisements = async (token: string) => {
  return API.get('/advertisements', {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getAdvertisementById = async (token: string, id: string) => {
  return API.get(`/advertisements/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteAdvertisement = async (token: string, id: string) => {
  return API.delete(`/advertisements/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateAdvertisement = async (token: string, id: string, data: any) => {
  return API.put(`/advertisements/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const toggleLike = async (token: string, id: string) => {
  return API.post(`/advertisements/${id}/like`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getMyLikes = async (token: string) => {
  return API.get('/advertisements/me/likes', {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getComments = async (token: string, id: string) => {
  return API.get(`/advertisements/${id}/comments`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const addComment = async (token: string, id: string, comment: string, parentId?: string) => {
  return API.post(`/advertisements/${id}/comments`, { comment, parentId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

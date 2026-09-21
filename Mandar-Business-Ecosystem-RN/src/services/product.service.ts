import { API } from './api';

export const createProduct = async (token: string, data: any) => {
  return API.post('/products', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getMyProducts = async (token: string) => {
  return API.get('/products/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getBusinessProducts = async (token: string, businessId: string) => {
  return API.get(`/products/business/${businessId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateProduct = async (token: string, id: string, data: any) => {
  return API.put(`/products/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteProduct = async (token: string, id: string) => {
  return API.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

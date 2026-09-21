import { API } from "./api";

export const createBusiness = async (data: any, token: string) => {
  const response = await API.post("/business/create", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getMyBusiness = async (token: string) => {
  const response = await API.get("/business/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getBusinessById = async (id: string, token: string) => {
  const response = await API.get(`/business/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAllBusinesses = async (token: string) => {
  const response = await API.get("/business/all", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateBusiness = async (data: any, token: string) => {
  const response = await API.put("/business/update", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const submitVerificationRequest = async (token: string, documentUrl: string, documentType: string, base64Image?: string) => {
  const response = await API.post(
    "/business/verify",
    { documentUrl, base64Image, documentType },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

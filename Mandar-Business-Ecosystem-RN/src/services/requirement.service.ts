import { API } from "./api";

export const createRequirement = async (token: string, data: any) => {
  return API.post("/requirements", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateRequirement = async (token: string, id: string, data: any) => {
  return API.put(`/requirements/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getMyRequirements = async (token: string) => {
  return API.get("/requirements/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllRequirements = async (token: string) => {
  return API.get("/requirements", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateRequirementStatus = async (token: string, id: string, status: string) => {
  return API.put(`/requirements/${id}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteRequirement = async (token: string, id: string) => {
  return API.delete(`/requirements/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

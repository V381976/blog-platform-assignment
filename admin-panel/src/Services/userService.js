import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const getAllUsers = async () => {
  const response = await API.get("/users");
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await API.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await API.delete(`/users/${id}`);
  return response.data;
};
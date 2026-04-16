import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};
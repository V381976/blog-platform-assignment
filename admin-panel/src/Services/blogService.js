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

export const getAllBlogs = async () => {
  const response = await API.get("/blogs");
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await API.delete(`/blogs/${id}`);
  return response.data;
};

export const createBlog = async (blogData) => {
  const response = await API.post("/blogs", blogData);
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await API.get(`/blogs/edit/${id}`);
  return response.data;
};

export const updateBlog = async (id, blogData) => {
  const response = await API.put(`/blogs/${id}`, blogData);
  return response.data;
};
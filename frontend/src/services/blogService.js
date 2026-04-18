import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const getAllBlogs = async () => {
  const response = await API.get("/blogs");
  return response.data;
};

export const getBlogBySlug = async (slug) => {
  const response = await API.get(`/blogs/${slug}`);
  return response.data;
};



import { api } from "../../../shared/api/api";
import { Post } from "../model/types";

// URL 상수로 관리
const API_POST = "/api/posts";

export const getPosts = async (limit: number, skip: number) => {
  const response = await api.get(`${API_POST}?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const getPostsByTag = async (tag: string) => {
  const response = await api.get(`${API_POST}/tag/${tag}`);
  return response.data;
};

export const searchPost = async (searchQuery: string) => {
  const response = await api.get(`${API_POST}/search?q=${searchQuery}`);
  return response.data;
};

export const addNewPost = async (newPost: {
  title: string;
  body: string;
  userId: number;
}) => {
  const response = await api.post(`${API_POST}/add`, newPost);
  return response.data;
};

export const updatePost = async (postId: number, selectedPost: Post) => {
  const response = await api.put(`${API_POST}/${postId}`, selectedPost);
  return response.data;
};

export const deletePost = async (id: number) => {
  const response = await api.delete(`${API_POST}/${id}`);
  return response.data;
};

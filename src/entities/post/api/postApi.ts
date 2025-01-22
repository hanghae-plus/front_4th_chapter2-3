import { api } from "../../../shared/api/api";
import { Post } from "../model/types";

export const getPosts = async (limit: number, skip: number) => {
  const response = await api.get(`/api/posts?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const getPostsByTag = async (tag: string) => {
  const response = await api.get(`/api/posts/tag/${tag}`);
  return response.data;
};

export const searchPost = async (searchQuery: string) => {
  const response = await api.get(`/api/posts/search?q=${searchQuery}`);
  return response.data;
};

export const addNewPost = async (newPost: {
  title: string;
  body: string;
  userId: number;
}) => {
  const response = await api.post("/api/posts/add", newPost);
  return response.data;
};

export const updatePost = async (postId: number, selectedPost: Post) => {
  const response = await api.put(`/api/posts/${postId}`, selectedPost);
  return response.data;
};

export const deletePost = async (id: number) => {
  const response = await api.delete(`/api/posts/${id}`);
  return response.data;
};

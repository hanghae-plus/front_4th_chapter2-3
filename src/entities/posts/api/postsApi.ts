import type { Post } from '@/entities/posts/model';
import { get, post, put, remove } from '@/shared/api/fetch';

const fetchPosts = async (limit: number, skip: number) => {
  const url = `/api/posts?limit=${limit}&skip=${skip}`;
  return get(url);
};

const fetchPostById = async (id: number) => {
  const url = `/api/posts/${id}`;
  return get(url);
};

const createPost = async (data: Pick<Post, 'title' | 'body' | 'userId'>) => {
  const url = '/api/posts/add';
  return post(url, data);
};

const updatePost = async (post: Post) => {
  const url = `/api/posts/${post.id}`;
  return put(url, post);
};

const deletePost = async (id: number) => {
  const url = `/api/posts/${id}`;
  return remove(url);
};

export const postsApi = {
  fetchPosts,
  fetchPostById,
  createPost,
  updatePost,
  deletePost,
};

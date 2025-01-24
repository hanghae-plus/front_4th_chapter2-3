import { Post } from './types';

export const postsApi = {
  getPosts: async (limit: number, skip: number) => {
    const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`);
    return response.json();
  },

  getByTag: async (tag: string) => {
    const response = await fetch(`/api/posts/tag/${tag}`);
    return response.json();
  },

  create: async (post: Omit<Post, 'id'>) => {
    const response = await fetch('/api/posts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    return response.json();
  },

  update: async (id: number, post: Post) => {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    return response.json();
  },

  delete: async (id: number) => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
  },
};

import { Post } from '../../../shared/api/types';
import { postsApi } from '../../../shared/api/posts';

export const postActions = {
  fetchPosts: async (limit: number, skip: number) => {
    const response = await postsApi.getPosts(limit, skip);
    return response.posts;
  },

  createPost: async (post: Omit<Post, 'id'>) => {
    return await postsApi.create(post);
  },

  updatePost: async (id: number, post: Post) => {
    return await postsApi.update(id, post);
  },

  deletePost: async (id: number) => {
    await postsApi.delete(id);
  },
};

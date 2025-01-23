import type { Post } from '@/entities/posts/model';
import { get, post, put, remove } from '@/shared/api/fetch';
import type { PostsResponse } from './PostsResponse';

const fetchPosts = async (limit: number, skip: number): Promise<PostsResponse> => {
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

export const postsApi = new (class {
  fetchPosts = fetchPosts;
  fetchPostById = fetchPostById;
  createPost = createPost;
  updatePost = updatePost;
  deletePost = deletePost;
})();

import type { Post, PostWithUser, PostsUrlParams } from '@/entities/posts/model';
import type { UsersResponse } from '@/entities/users/api';
import { get, post, put, remove } from '@/shared/api/fetch';

import type { UserResponse } from '@/entities/users/api/UserResponse';
import type { PostsResponse } from './PostsResponse';

const fetchPosts = async (params: string): Promise<PostsResponse> => {
  const url = `/api/posts?${params}`;
  return get(url);
};

const fetchPostById = async (id: number) => {
  const url = `/api/posts/${id}`;
  return get(url);
};

const fetchPostsWithUsers = async (params: PostsUrlParams): Promise<PostWithUser[]> => {
  const stringifiedParams = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)]),
  ).toString();

  const [postsResponse, usersResponse] = await Promise.all([
    get(`/api/posts?${stringifiedParams}`),
    get('/api/users?limit=0&select=username,image'),
  ]);

  const { posts }: PostsResponse = await postsResponse;
  const { users }: UsersResponse = await usersResponse;

  return posts.map((post) => ({
    ...post,
    author: users.find((user) => user.id === post.userId) as UserResponse,
  }));
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
  fetchPostsWithUsers = fetchPostsWithUsers;
  createPost = createPost;
  updatePost = updatePost;
  deletePost = deletePost;
})();

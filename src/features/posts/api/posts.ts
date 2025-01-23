import { Post, Response, User } from '../../../shared/types';

interface PostWithAuthor extends Post {
  author: User | undefined;
}

export const fetchPosts = async (limit: number, skip: number) => {
  const postsResponse = await fetch(`/api/posts?limit=${limit}&skip=${skip}`);
  const postsData: Response = await postsResponse.json();

  const usersResponse = await fetch('/api/users?limit=0&select=username,image');
  const users = await usersResponse.json();
  const usersData = users.users;

  const postsWithUsers: PostWithAuthor[] = postsData.posts.map((post) => ({
    ...post,
    author: usersData.find((user: User) => user.id === post.userId),
  }));

  return {
    posts: postsWithUsers,
    total: postsData.total,
  };
};

export const fetchPostsByTag = async (tag: string) => {
  const response = await fetch(`/api/posts/tag/${tag}`);
  return response.json();
};

export const fetchTags = async () => {
  const response = await fetch('/api/posts/tags');
  const data = await response.json();
  return data;
};

export const searchPosts = async (query: string) => {
  const response = await fetch(`/api/posts/search?q=${query}`);
  return response.json();
};

export const deletePost = async (id: number) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

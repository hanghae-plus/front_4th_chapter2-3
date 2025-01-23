import { create } from 'zustand';

import { createStoreSelector } from '@/shared/lib/createStoreSelector';

import type { PostWithUser } from '@/entities/posts/model';

export interface PostsStore {
  posts: PostWithUser[];
  setPosts: (posts: PostWithUser[]) => void;
  addPost: (post: PostWithUser) => void;
  deletePost: (postId: number) => void;
  updatePost: (post: PostWithUser) => void;
}

export const usePostsStore = create<PostsStore>()((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  deletePost: (postId) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== postId) })),
  updatePost: (post) =>
    set((state) => ({
      posts: state.posts.map((p) => (p.id === post.id ? post : p)),
    })),
}));

export const usePostsStoreSelector = createStoreSelector(usePostsStore);

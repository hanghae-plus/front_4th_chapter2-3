import { create } from 'zustand';
import { Post, User } from '../../../shared/types';

// Post와 User를 합친 타입 정의
export interface PostWithAuthor extends Post {
  author: User | undefined;
}

interface PostStore {
  // 상태
  posts: PostWithAuthor[];
  loading: boolean;
  total: number;

  // 액션
  setPosts: (posts: PostWithAuthor[]) => void;
  setLoading: (loading: boolean) => void;
  setTotal: (total: number) => void;
  addPost: (post: PostWithAuthor) => void;
  updatePost: (updatedPost: PostWithAuthor) => void;
  deletePost: (postId: number) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  // 초기 상태
  posts: [],
  loading: false,
  total: 0,

  // 액션 구현
  setPosts: (posts) => set({ posts }),
  setLoading: (loading) => set({ loading }),
  setTotal: (total) => set({ total }),

  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
      total: state.total + 1,
    })),

  updatePost: (updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    })),

  deletePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
      total: state.total - 1,
    })),
}));

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
  selectedPost: Post | null;
  showAddDialog: boolean;
  showEditDialog: boolean;
  showPostDetailDialog: boolean;

  // 액션
  setPosts: (posts: PostWithAuthor[]) => void;
  setLoading: (loading: boolean) => void;
  setTotal: (total: number) => void;
  setSelectedPost: (post: Post | null) => void;
  openAddDialog: () => void;
  closeAddDialog: () => void;
  openEditDialog: (post: Post) => void;
  closeEditDialog: () => void;
  openPostDetailDialog: (post: Post) => void;
  closePostDetailDialog: () => void;
  addPost: (post: PostWithAuthor) => void;
  updatePost: (updatedPost: PostWithAuthor) => void;
  deletePost: (postId: number) => void;
  setShowEditDialog: (show: boolean) => void;
  setShowPostDetailDialog: (show: boolean) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  // 초기 상태
  posts: [],
  loading: false,
  total: 0,
  selectedPost: null,
  showAddDialog: false,
  showEditDialog: false,
  showPostDetailDialog: false,

  // 액션 구현
  setPosts: (posts) => set({ posts }),
  setLoading: (loading) => set({ loading }),
  setTotal: (total) => set({ total }),
  setSelectedPost: (post) => set({ selectedPost: post }),

  openAddDialog: () => set({ showAddDialog: true }),
  closeAddDialog: () => set({ showAddDialog: false }),

  openEditDialog: (post) =>
    set({
      selectedPost: post,
      showEditDialog: true,
    }),
  closeEditDialog: () =>
    set({
      showEditDialog: false,
      selectedPost: null,
    }),

  openPostDetailDialog: (post) =>
    set({
      selectedPost: post,
      showPostDetailDialog: true,
    }),
  closePostDetailDialog: () =>
    set({
      showPostDetailDialog: false,
      selectedPost: null,
    }),

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

  setShowEditDialog: (show) => set({ showEditDialog: show }),

  setShowPostDetailDialog: (show) => set({ showPostDetailDialog: show }),
}));

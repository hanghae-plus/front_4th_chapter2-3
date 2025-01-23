import { NewPost, PostWithUser } from "@entities/post";
import { create } from "zustand";

interface PostState {
  posts: PostWithUser[];
  total: number;
  selectedPost: PostWithUser | null;
  newPost: NewPost;
  showAddDialog: boolean;
  showEditDialog: boolean;
  showPostDetailDialog: boolean;
  setPosts: (posts: PostWithUser[]) => void;
  addPost: (post: PostWithUser) => void;
  updatePost: (updatedPost: PostWithUser) => void;
  deletePost: (postId: number) => void;
  setSelectedPost: (selectedPost: PostWithUser) => void;
  setNewPost: (newPost: NewPost) => void;
  setShowAddDialog: (value: boolean) => void;
  setShowEditDialog: (value: boolean) => void;
  setShowPostDetailDialog: (value: boolean) => void;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  total: 0,
  selectedPost: null,
  newPost: { title: "", body: "", userId: 1 },
  showAddDialog: false,
  showEditDialog: false,
  showPostDetailDialog: false,
  setPosts: (posts) => set({ posts, total: posts.length }),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  updatePost: (updatedPost) =>
    set((state) => ({ posts: state.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)) })),
  deletePost: (id) => set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  setSelectedPost: (selectedPost) => set({ selectedPost }),
  setNewPost: (newPost) => set({ newPost }),
  setShowAddDialog: (showAddDialog) => set({ showAddDialog }),
  setShowEditDialog: (showEditDialog) => set({ showEditDialog }),
  setShowPostDetailDialog: (showPostDetailDialog) => set({ showPostDetailDialog }),
}));

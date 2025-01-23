import { NewPost, PostWithUser } from "@entities/post";
import { create } from "zustand";

interface PostState {
  posts: PostWithUser[];
  total: number;
  selectedPost: PostWithUser | null;
  newPost: NewPost;
  setPosts: (posts: PostWithUser[]) => void;
  addPost: (post: PostWithUser) => void;
  updatePost: (updatedPost: PostWithUser) => void;
  deletePost: (postId: number) => void;
  setSelectedPost: (selectedPost: PostWithUser) => void;
  setNewPost: (newPost: NewPost) => void;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  total: 0,
  selectedPost: null,
  newPost: { title: "", body: "", userId: 1 },
  setPosts: (posts) => set({ posts, total: posts.length }),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  updatePost: (updatedPost) =>
    set((state) => ({ posts: state.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)) })),
  deletePost: (id) => set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  setSelectedPost: (selectedPost) => set({ selectedPost }),
  setNewPost: (newPost) => ({ newPost }),
}));

import { Post } from "@/types/post.ts";
import { create } from "zustand/react";

interface PostStore {
  posts: Post[];
  filteredPosts: Post[];
  setPosts: (posts: Post[]) => void;
  setFilteredPosts: (posts: Post[]) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  filteredPosts: [],
  setPosts: (posts: Post[]) => set({ posts, filteredPosts: posts }),
  setFilteredPosts: (posts: Post[]) => set({ filteredPosts: posts }),
}));

import { Post } from "@/types/post.ts";
import { create } from "zustand/react";

interface PostStore {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  setPosts: (posts: Post[]) => set({ posts }),
}));

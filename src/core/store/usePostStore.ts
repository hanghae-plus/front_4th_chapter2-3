import { create } from "zustand";
import { Post } from "@/types/post.ts";

export interface FilterState {
  searchQuery: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  selectedTag: string;
}

interface PostState {
  posts: Post[];
  filters: FilterState;
  setPosts: (posts: Post[]) => void;
  setFilters: (filters: FilterState) => void;
}

const initialFilters: FilterState = {
  searchQuery: "",
  sortBy: "",
  sortOrder: "asc",
  selectedTag: "",
};

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  filters: initialFilters,
  setPosts: (posts) => set({ posts }),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
}));

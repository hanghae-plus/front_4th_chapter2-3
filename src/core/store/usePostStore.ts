import { create } from "zustand";
import { Tag } from "@/types/tag.ts";
import { Post } from "@/types/post.ts";

export interface FilterState {
  skip: number;
  limit: number;
  searchQuery: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  selectedTag: string;
}

interface PostState {
  posts: Post[];
  tags: Tag[];
  filters: FilterState;
  setPosts: (posts: Post[]) => void;
  setTags: (tags: Tag[]) => void;
  setFilters: (filters: FilterState) => void;
}

const initialFilters: FilterState = {
  skip: 0,
  limit: 10,
  searchQuery: "",
  sortBy: "",
  sortOrder: "asc",
  selectedTag: "",
};

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  tags: [],
  filters: initialFilters,
  setPosts: (posts) => set({ posts }),
  setTags: (tags) => set({ tags }),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
}));

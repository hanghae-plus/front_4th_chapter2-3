import { create } from "zustand";
import { Post, PostFilters, PaginationParams } from "../../types";

interface PostStore {
  posts: Post[];
  total: number;
  loading: boolean;
  filters: PostFilters;
  pagination: PaginationParams;
  setFilters: (filters: Partial<PostFilters>) => void;
  setPagination: (pagination: Partial<PaginationParams>) => void;
  setPosts: (posts: Post[]) => void;
  setTotal: (total: number) => void;
  setLoading: (loading: boolean) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  total: 0,
  loading: false,
  filters: {
    search: "",
    tag: "",
    sortBy: "",
    sortOrder: "asc",
  },
  pagination: {
    skip: 0,
    limit: 10,
  },
  setFilters: (filters) => 
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  setPagination: (pagination) =>
    set((state) => ({ pagination: { ...state.pagination, ...pagination } })),
  setPosts: (posts) => set({ posts }),
  setTotal: (total) => set({ total }),
  setLoading: (loading) => set({ loading }),
}));
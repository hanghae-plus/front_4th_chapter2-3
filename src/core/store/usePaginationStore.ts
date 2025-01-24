import { create } from "zustand";

export interface PostPagination {
  total: number;
  skip: number;
  limit: number;
}

export interface PaginationState {
  pagination: PostPagination;
  setPagination: (value: Partial<PostPagination>) => void;
}

const initialPagination: PostPagination = {
  total: 0,
  skip: 0,
  limit: 10,
};

export const usePaginationStore = create<PaginationState>((set) => ({
  pagination: initialPagination,
  setPagination: (pagination) =>
    set((state) => ({
      pagination: { ...state.pagination, ...pagination },
    })),
}));

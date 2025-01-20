import { create } from "zustand";
import { Post } from "../../../entities/types";

interface PostManagementStore {
  selectedPost: Post | null;
  showAddDialog: boolean;
  showEditDialog: boolean;
  setSelectedPost: (post: Post | null) => void;
  setShowAddDialog: (show: boolean) => void;
  setShowEditDialog: (show: boolean) => void;
}

export const usePostManagementStore = create<PostManagementStore>((set) => ({
  selectedPost: null,
  showAddDialog: false,
  showEditDialog: false,
  setSelectedPost: (post) => set({ selectedPost: post }),
  setShowAddDialog: (show) => set({ showAddDialog: show }),
  setShowEditDialog: (show) => set({ showEditDialog: show }),
}));
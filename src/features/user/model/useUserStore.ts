import { User } from "@entities/user";
import { create } from "zustand";

interface UserState {
  selectedUser: User | null;
  showUserModal: boolean;
  setSelectedUser: (user: User) => void;
  setShowUserModal: (value: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  selectedUser: null,
  showUserModal: false,
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setShowUserModal: (showUserModal) => set({ showUserModal }),
}));

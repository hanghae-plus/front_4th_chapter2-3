import { create } from 'zustand';
import { UserDetailType } from '../../../entities/user/model/types';

interface UserStore {
  selectedUser: UserDetailType | null;
  isUserDetailOpen: boolean;
  setSelectedUser: (user: UserDetailType | null) => void;
  setIsUserDetailOpen: (isOpen: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  selectedUser: null,
  isUserDetailOpen: false,
  setSelectedUser: (user) => set({ selectedUser: user }),
  setIsUserDetailOpen: (isOpen) => set({ isUserDetailOpen: isOpen }),
}));

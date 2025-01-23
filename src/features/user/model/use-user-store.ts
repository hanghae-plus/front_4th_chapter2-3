import { StateCreator } from 'zustand/vanilla';
import { create } from 'zustand/react';
import { UserDetail } from '../../../entities/user/model';

interface State {
  showUserModal: boolean;
  selectedUser: UserDetail | null;
}

interface Action {
  setShowUserModal: (show: boolean) => void;
  setSelectedUser: (user: UserDetail | null) => void;
}

type UserStoreProps = State & Action;

const useUserStoreCreator: StateCreator<UserStoreProps> = (set) => ({
  showUserModal: false,
  selectedUser: null,
  setShowUserModal: (show) => set({ showUserModal: show }),
  setSelectedUser: (user) => set({ selectedUser: user }),
});

export const useUserStore = create(useUserStoreCreator);

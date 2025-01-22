import { StateCreator } from 'zustand/vanilla';
import { create } from 'zustand/react';
import { createStoreSelector } from '../../../shared/model';
import { User } from '../../../entities/user/model';

interface State {
  showUserModal: boolean;
  selectedUser: User | null;
}

interface Action {
  setShowUserModal: (show: boolean) => void;
  setSelectedUser: (user: User | null) => void;
}

type UserStoreProps = State & Action;

const useUserStoreCreator: StateCreator<UserStoreProps> = (set) => ({
  showUserModal: false,
  selectedUser: null,
  setShowUserModal: (show) => set({ showUserModal: show }),
  setSelectedUser: (user) => set({ selectedUser: user }),
});

const userStore = create(useUserStoreCreator);

export const useUserStore = createStoreSelector(userStore);

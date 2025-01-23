import { StateCreator } from 'zustand/vanilla';
import { create } from 'zustand/react';

interface State {
  showUserModal: boolean;
  selectedUserId?: number;
}

interface Action {
  setShowUserModal: (show: boolean) => void;
  setSelectedUserId: (user?: number) => void;
}

type UserStoreProps = State & Action;

const useUserStoreCreator: StateCreator<UserStoreProps> = (set) => ({
  showUserModal: false,
  selectedUserId: undefined,
  setShowUserModal: (show) => set({ showUserModal: show }),
  setSelectedUserId: (userId) => set({ selectedUserId: userId }),
});

export const useUserStore = create(useUserStoreCreator);

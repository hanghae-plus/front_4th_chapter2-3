import { create } from 'zustand';

import type { UsersResponse } from '@/entities/users/api';

export interface SelectedUserStore {
  selectedUser: UsersResponse['users'][0] | null;
  setSelectedUser: (post: UsersResponse['users'][0]) => void;
}

export const useSelectedUserStore = create<SelectedUserStore>()((set) => ({
  selectedUser: null,
  setSelectedUser: (post) => set({ selectedUser: post }),
}));

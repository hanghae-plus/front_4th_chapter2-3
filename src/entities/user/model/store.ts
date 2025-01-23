import { create } from 'zustand';
import { User } from '../../../shared/types';
import { getUserInfo } from '../api/user';

interface SelectedUserStore {
  // 상태
  selectedUser: User | null;
  showUserModal: boolean;

  // 액션
  setSelectedUser: (user: User | null) => void;
  setShowUserModal: (show: boolean) => void;
  openUserModal: (user: User) => Promise<void>;
  closeUserModal: () => void;
}

export const useSelectedUserStore = create<SelectedUserStore>((set) => ({
  // 초기 상태
  selectedUser: null,
  showUserModal: false,

  // 액션 구현
  setSelectedUser: (user) => set({ selectedUser: user }),
  setShowUserModal: (show) => set({ showUserModal: show }),

  openUserModal: async (user) => {
    try {
      const userData = await getUserInfo(user.id);
      set({
        selectedUser: userData,
        showUserModal: true,
      });
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error);
    }
  },

  closeUserModal: () =>
    set({
      showUserModal: false,
      selectedUser: null,
    }),
}));

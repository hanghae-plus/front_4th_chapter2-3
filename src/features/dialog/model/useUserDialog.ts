import type { User } from '@/entities/users/model';
import { useSelectedUserStore } from '@/features/users/model';
import { get } from '@/shared/api/fetch';

import { useDialog } from './useDialog';

export const useUserDialog = () => {
  const dialog = useDialog();
  const { selectedUser, setSelectedUser } = useSelectedUserStore();

  const onOpenUserDialog = async (user: User) => {
    try {
      const userData = await get(`/api/users/${user.id}`);
      setSelectedUser(userData);
      dialog.open();
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error);
      dialog.close();
    }
  };

  return { dialog, selectedUser, onOpenUserDialog };
};

import type { User } from '@/entities/users/model';

import { useSelectedUserMutation } from '@/features/users/api/useUsersMutations';
import { useDialog } from './useDialog';

export const useUserDialog = () => {
  const dialog = useDialog();
  const { selectedUser, selectUser } = useSelectedUserMutation();

  const onOpenUserDialog = async (user: User) => {
    try {
      selectUser(user.id);
      dialog.open();
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error);
      dialog.close();
    }
  };

  return { dialog, selectedUser, onOpenUserDialog };
};

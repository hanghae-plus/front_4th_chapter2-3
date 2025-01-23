import { useUserStore } from '@/features/user';
import { Profile, UserDetail } from '@/entities/user';
import { BaseDialog } from '@/shared/ui';
import { useQueryClient } from '@tanstack/react-query';
import { userQueries } from '@/entities/user/api/queries.ts';

const UserDialog = () => {
  const queryClient = useQueryClient();
  const { showUserModal, setShowUserModal, selectedUserId } = useUserStore();

  if (!selectedUserId) return null;

  const user = queryClient.getQueryData<UserDetail>(
    userQueries.userDetail(selectedUserId).queryKey,
  );

  console.log('UserDialog', user);

  return (
    <BaseDialog open={showUserModal && !!user} onOpenChange={setShowUserModal} title='사용자 정보'>
      {user && <Profile user={user} />}
    </BaseDialog>
  );
};

export default UserDialog;

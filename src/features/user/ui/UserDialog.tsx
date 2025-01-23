import { BaseDialog } from '../../../shared/ui';
import { useUserStore } from '../model/useUserStore.ts';
import Profile from '../../../entities/user/ui/Profile.tsx';

const UserDialog = () => {
  const { showUserModal, setShowUserModal, selectedUser } = useUserStore([
    'showUserModal',
    'selectedUser',
    'setShowUserModal',
  ]);

  return (
    <BaseDialog open={showUserModal} onOpenChange={setShowUserModal} title='사용자 정보'>
      <Profile user={selectedUser} />
    </BaseDialog>
  );
};

export default UserDialog;

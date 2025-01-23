import { useUserStore } from '@/features/user';
import { Profile } from '@/entities/user';
import { BaseDialog } from '@/shared/ui';

const UserDialog = () => {
  const { showUserModal, setShowUserModal, selectedUser } = useUserStore();

  return (
    <BaseDialog open={showUserModal} onOpenChange={setShowUserModal} title='사용자 정보'>
      <Profile user={selectedUser} />
    </BaseDialog>
  );
};

export default UserDialog;

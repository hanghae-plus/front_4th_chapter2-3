import { useSelectedUserStore } from '../../../entities/user/model/store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../shared/ui/dialog';
import { UserInfo } from '../../../entities/user/ui';

export const UserInfoModal = () => {
  const { showUserModal, setShowUserModal } = useSelectedUserStore();

  return (
    <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
      <DialogContent aria-describedby='dialog-description'>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <UserInfo />
      </DialogContent>
    </Dialog>
  );
};

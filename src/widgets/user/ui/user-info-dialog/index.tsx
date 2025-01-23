import { Dialog } from "@shared/ui"
import { UserProfile } from "@entities/user/ui"
import { useUserStore } from "@features/user/model/stores"

export const UserInfoDialog = () => {
  const showUserModal = useUserStore((state) => state.showUserModal)
  const setShowUserModal = useUserStore((state) => state.setShowUserModal)

  return (
    <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>사용자 정보</Dialog.Title>
        </Dialog.Header>
        <UserProfile />
      </Dialog.Content>
    </Dialog>
  )
}

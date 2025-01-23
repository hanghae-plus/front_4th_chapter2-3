import { UserInfo } from "@/entities/user/ui/UserInfo"
import { useUserStore } from "@/features/user/model/store"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"

export const UserDialog = () => {
  const { selectedUser, showUserModal, setShowUserModal } = useUserStore()
  return (
    selectedUser && (
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>사용자 정보</DialogTitle>
          </DialogHeader>
          <UserInfo selectedUser={selectedUser} />
        </DialogContent>
      </Dialog>
    )
  )
}

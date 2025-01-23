import { useDialog } from "../../../app/model/DialogProvider"
import UserProfile from "../../../entities/user/ui/UserProfile"
import { Dialog } from "../../../shared/ui"

import type { User } from "../../../entities/user/model/types/user"

interface UserDialogProps {
  open: boolean
  selectedUser: User | null
  dialogId: number
}

export const UserDialog = ({ selectedUser, dialogId, ...props }: UserDialogProps) => {
  const { closeDialog } = useDialog()

  return (
    <Dialog {...props} onOpenChange={() => closeDialog(dialogId)}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>사용자 정보</Dialog.Title>
        </Dialog.Header>
        {selectedUser && <UserProfile user={selectedUser} />}
      </Dialog.Content>
    </Dialog>
  )
}

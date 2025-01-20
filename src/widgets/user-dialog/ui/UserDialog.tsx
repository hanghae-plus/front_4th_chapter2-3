import UserProfile from "../../../entities/user/ui/UserProfile"
import { Dialog } from "../../../shared/ui"

import type { User } from "../../../entities/user/model/types/user"

interface UserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedUser: User | null
}

export const UserDialog = ({ selectedUser, ...props }: UserDialogProps) => {
  return (
    <Dialog {...props}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>사용자 정보</Dialog.Title>
        </Dialog.Header>
        <UserProfile user={selectedUser} />
      </Dialog.Content>
    </Dialog>
  )
}

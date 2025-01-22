import { Dialog } from "@shared/ui"
import { User } from "@entities/user/model"
import { UserProfile } from "@entities/user/ui"

interface UserInfoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
}

export const UserInfoDialog = ({ open, onOpenChange, user }: UserInfoDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>사용자 정보</Dialog.Title>
      </Dialog.Header>
      <UserProfile user={user} />
    </Dialog.Content>
  </Dialog>
)

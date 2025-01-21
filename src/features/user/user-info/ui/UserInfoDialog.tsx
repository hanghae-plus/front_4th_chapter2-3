import { Dialog } from "@shared/ui"
import { User } from "@entities/user/model"

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
      <div className="space-y-4">
        {user && (
          <>
            <div>이름: {user.username}</div>
            <div>이메일: {user.email}</div>
            <div>전화번호: {user.phone}</div>
          </>
        )}
      </div>
    </Dialog.Content>
  </Dialog>
)

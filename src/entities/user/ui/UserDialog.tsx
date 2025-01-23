import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { UserDetail } from "../model/types"
import UserProfile from "./UserProfile"

interface UserDialogProps {
  open: boolean
  onClose: () => void
  user: UserDetail | null
}

const UserDialog = ({ open, onClose, user }: UserDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <UserProfile user={user} />
      </DialogContent>
    </Dialog>
  )
}
export default UserDialog

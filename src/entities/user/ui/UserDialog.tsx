import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { UserDetail } from "../model/types"
import UserProfile from "./UserProfile"

interface UserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedUser: UserDetail | null
}

const UserDialog = ({ open, onOpenChange, selectedUser }: UserDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <UserProfile user={selectedUser} />
      </DialogContent>
    </Dialog>
  )
}
export default UserDialog

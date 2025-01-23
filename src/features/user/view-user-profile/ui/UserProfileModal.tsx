import { User } from "../../../../entities/user/model"
import { UserProfile } from "../../../../entities/user/ui"
import { Modal } from "../../../../shared/ui"

interface UserProfileModalProps {
  user?: User
  isOpen: boolean
  onClose: () => void
}

export const UserProfileModal = ({ user, isOpen, onClose }: UserProfileModalProps) => (
  <Modal open={isOpen} onClose={onClose} title="사용자 정보">
    {user && <UserProfile user={user} />}
  </Modal>
)

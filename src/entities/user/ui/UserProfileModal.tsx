import { User } from "../model/types"
import { UserProfile } from "./UserProfile"
import { Modal } from "../../../shared/ui/modal/Modal"

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

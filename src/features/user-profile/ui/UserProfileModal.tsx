import { User } from "../../../entities/user/model/types"
import { UserProfile } from "../../../entities/user/ui/UserProfile"
import { useModal } from "../../../shared/lib/hooks/modal/use-modal"
import { Modal } from "../../../shared/ui/modal/Modal"

interface UseUserProfileModalProps {
  user?: User
}

export const useUserProfileModal = ({ user }: UseUserProfileModalProps = {}) => {
  const { isOpen, open, close } = useModal()

  const UserProfileModal = () => (
    <Modal open={isOpen} onClose={close} title="사용자 정보">
      {user && <UserProfile user={user} />}
    </Modal>
  )

  return {
    UserProfileModal,
    openUserProfileModal: open,
    closeUserProfileModal: close,
    isUserProfileModalOpen: isOpen,
  }
}

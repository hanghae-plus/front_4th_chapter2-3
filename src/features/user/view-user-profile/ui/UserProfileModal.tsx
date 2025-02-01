import { User } from "../../../../entities/user/model"
import { UserProfile } from "../../../../entities/user/ui"
import { ToggleKey } from "../../../../pages/main/model"
import { useToggleState } from "../../../../shared/model/ToggleStateContext"
import { Modal } from "../../../../shared/ui"

interface UserProfileModalProps {
  user?: User
}

export const UserProfileModal = ({ user }: UserProfileModalProps) => {
  const { isOpen, onClose } = useToggleState<ToggleKey>()
  return (
    <Modal open={isOpen("viewProfile")} onClose={() => onClose("viewProfile")} title="사용자 정보">
      {user && <UserProfile user={user} />}
    </Modal>
  )
}

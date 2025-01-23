import { ReactNode } from "react"
import { useSetAtom } from "jotai"
import { selectedUserIdAtom } from "../model"
import { dialogAtomFamily } from "../../../shared/model"

interface Props {
  children: ReactNode
  userId: number | undefined
}

export const OpenUserDialogButton = ({ children, userId }: Props) => {
  const setSelectedUserId = useSetAtom(selectedUserIdAtom)
  const setUserModal = useSetAtom(dialogAtomFamily("user-detail"))

  const openUserModal = (userId: number) => {
    setSelectedUserId(userId)
    setUserModal(true)
  }

  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(userId || 0)}>
      {children}
    </div>
  )
}

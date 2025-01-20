import { useState } from "react"

export const useUserModal = () => {
  const [showUserModal, setShowUserModal] = useState(false)

  const openUserModal = () => setShowUserModal(true)
  const closeUserModal = () => setShowUserModal(false)

  return {
    showUserModal,
    setShowUserModal,
    openUserModal,
    closeUserModal,
  }
}

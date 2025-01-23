import { useState } from "react"
import { useDialog } from "../../../features/dialog/model/useDialog"
import { useGetUser } from "../api/useGetUser"

export const useUserDialog = () => {
  const { isOpen, open, close } = useDialog()
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const { data: user, isLoading } = useGetUser(selectedUserId)

  const handleUserDialog = (userId: number) => {
    setSelectedUserId(userId)
    open()
  }

  return {
    isOpen,
    user,
    isLoading,
    handleUserDialog,
    handleClose: close,
  }
}

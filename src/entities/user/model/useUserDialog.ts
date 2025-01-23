import { useState } from "react"
import { useDialog } from "../../../widgets/dialog/model/useDialog"
import { useGetUser } from "../api/useGetUser"

export const useUserDialog = () => {
  const { isOpen, open, close } = useDialog()
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const { data: user, isLoading } = useGetUser(selectedUserId)

  const handleDialog = (userId: number) => {
    setSelectedUserId(userId)
    open()
  }

  return {
    isOpen,
    user,
    isLoading,
    handleDialog,
    handleClose: close,
  }
}

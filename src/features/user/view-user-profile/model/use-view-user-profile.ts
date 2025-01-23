import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { userQueries } from "../../../../entities/user/api"
import { useModal } from "../../../../shared/lib"

export const useViewUserProfile = () => {
  const { isOpen, open, close } = useModal()
  const [selectedUserId, setSelectedUserId] = useState<number>()

  const { data: user, isLoading } = useQuery({
    ...userQueries.detailQuery(selectedUserId || 0),
    enabled: !!selectedUserId,
  })

  const handleViewProfile = (userId: number) => {
    setSelectedUserId(userId)
    open()
  }

  return {
    isOpen,
    user,
    isLoading,
    handleViewProfile,
    handleClose: close,
  }
}

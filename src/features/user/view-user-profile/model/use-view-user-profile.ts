import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { userQueries } from "../../../../entities/user/api"
import { ToggleKey } from "../../../../pages/main/model"
import { useToggleState } from "../../../../shared/model/ToggleStateContext"

export const useViewUserProfile = () => {
  const { onOpen } = useToggleState<ToggleKey>()
  const [selectedUserId, setSelectedUserId] = useState<number>()

  const { data: user, isLoading } = useQuery({
    ...userQueries.detailQuery(selectedUserId || 0),
    enabled: !!selectedUserId,
  })

  const handleViewProfile = (userId: number) => {
    setSelectedUserId(userId)
    onOpen("viewProfile")
  }

  return {
    user,
    isLoading,
    handleViewProfile,
    handleClose: close,
  }
}

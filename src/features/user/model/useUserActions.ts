import { useQuery } from "@tanstack/react-query"

import { useDialogStore } from "../../../shared/model/useDialogStore"

import { User } from "../../../entities/user/model/types"
import { userApi } from "../api/api"
import { useEffect, useState } from "react"
import { useUserStore } from "./store"

export const useUserActions = () => {
  const { setShowUserModal } = useDialogStore()
  const { selectedUser, setSelectedUser } = useUserStore()
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", selectedUserId],
    queryFn: () => userApi.getUser(selectedUserId || 0),
    enabled: !!selectedUserId,
    onError: (error) => {
      console.error("사용자 정보 가져오기 오류:", error)
    },
  })

  useEffect(() => {
    if (userData) {
      setSelectedUser(userData)
    }
  }, [userData, setSelectedUser])

  const openUserModal = (user: User) => {
    setSelectedUserId(user.id)
    setShowUserModal(true)
  }

  return {
    selectedUser,
    isLoading,
    openUserModal,
  }
}

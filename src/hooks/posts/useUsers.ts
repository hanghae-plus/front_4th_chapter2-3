import { useState } from "react"
import { User } from "@/types/posts"

export const useUsers = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)

  const fetchUserDetails = async (userId: number) => {
    try {
      const response = await fetch(`/api/users/${userId}`)
      const user = await response.json()
      setSelectedUser(user)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  const handleUserDetail = (userId: number) => {
    fetchUserDetails(userId)
  }

  return {
    selectedUser,
    showUserModal,
    setShowUserModal,
    handleUserDetail,
  }
}

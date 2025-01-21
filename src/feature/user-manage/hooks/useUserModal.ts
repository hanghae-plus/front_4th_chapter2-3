import { useState } from "react"

interface User {
  id: number
}

export const useUserModal = () => {
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const openUserModal = (user: User) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  const closeUserModal = () => {
    setShowUserModal(false)
    setSelectedUser(null)
  }

  return {
    showUserModal,
    selectedUser,
    setShowUserModal,
    openUserModal,
    closeUserModal,
  }
}

// 사용자 모달 열기
// const openUserModal = async (user) => {
//   try {
//     const response = await fetch(`/api/users/${user.id}`)
//     const userData = await response.json()
//     setSelectedUser(userData)

//     // openUserModal()  // 다른 이름으로 설정 필요
//     setShowUserModal(true)
//   } catch (error) {
//     console.error("사용자 정보 가져오기 오류:", error)
//   }
// }

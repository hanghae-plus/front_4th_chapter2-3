import { userApi } from "@/entities/user/api/userApi"
import { User } from "@/entities/user/model/types"
import { create } from "zustand"

interface UserStoreProps {
  selectedUser: User | null
  showUserModal: boolean
  setSelectedUser: (user: User) => void
  setShowUserModal: (open: boolean) => void
  openUserModal: (user: Partial<User>) => void
}

export const useUserStore = create<UserStoreProps>((set) => ({
  showUserModal: false,
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
  setShowUserModal: (open) => set({ showUserModal: open }),

  openUserModal: async (user) => {
    try {
      const userData = await userApi.getUser(user.id!)
      set({ selectedUser: userData, showUserModal: true })
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  },
}))

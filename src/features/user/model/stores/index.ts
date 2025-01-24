import { create } from "zustand"
import { User } from "@entities/user/model"
import { usersApi } from "@entities/user/api"

interface UserStore {
  selectedUser: User | null
  showUserModal: boolean

  // actions
  setSelectedUser: (user: User | null) => void
  setShowUserModal: (show: boolean) => void

  // async actions
  openUserModal: (user: User | undefined) => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
  selectedUser: null,
  showUserModal: false,

  setSelectedUser: (user) => set({ selectedUser: user }),
  setShowUserModal: (show) => set({ showUserModal: show }),

  openUserModal: async (user) => {
    if (!user?.id) return

    try {
      const userData = await usersApi.fetchUserById(user.id)
      set({
        selectedUser: userData,
        showUserModal: true,
      })
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  },
}))

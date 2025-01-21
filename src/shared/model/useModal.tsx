import { create } from "zustand"
import { getUserResponse } from "../../entities/user/model/type"

interface ModalState {
  selectedUser: getUserResponse | null
  setUserModalOpen: (user: getUserResponse | null) => void
}

export const useModalStore = create<ModalState>((set) => ({
  selectedUser: null,
  setUserModalOpen: (user: getUserResponse | null) => set({ selectedUser: user }),
}))

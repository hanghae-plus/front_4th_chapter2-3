import { ReactNode } from "react"
import { create } from "zustand/index"

interface ModalStore {
  content: ReactNode
  isOpen: boolean
  onOpen: (content: ReactNode) => void
  onClose: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  content: null,
  isOpen: false,
  onOpen: (content) => set(() => ({ isOpen: true, content })),
  onClose: () => set(() => ({ isOpen: false, content: null })),
}))

import { create } from "zustand/index"

interface UseModalStoreProps {
  content: React.ReactNode
  isOpen: boolean
  openModal: (content: React.ReactNode) => void
  closeModal: () => void
}

export const useModalStore = create<UseModalStoreProps>((set) => ({
  content: null,
  isOpen: false,
  openModal: (content) => set(() => ({ isOpen: true, content })),
  closeModal: () => set(() => ({ isOpen: false, content: null })),
}))

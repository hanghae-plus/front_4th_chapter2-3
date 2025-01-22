import { create } from "zustand";

interface ModalState {
  content: React.ReactNode | null;
  isOpen: boolean;
}

interface ModalAction {
  close: () => void;
  open: (content: ModalState["content"]) => void;
}

export const useModalStore = create<ModalState & ModalAction>((set) => ({
  content: null,
  isOpen: false,
  open: (content: ModalState["content"]) => {
    set({ isOpen: true, content });
  },
  close: () => {
    set({ isOpen: false, content: null });
  },
}));

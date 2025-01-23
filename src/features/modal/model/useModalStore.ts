import { create } from "zustand";

interface ModalState {
  contents: React.ReactNode[];
  isOpen: boolean;
}

interface ModalAction {
  close: () => void;
  open: (content: React.ReactNode) => void;
}

export const useModalStore = create<ModalState & ModalAction>((set) => ({
  contents: [],
  isOpen: false,
  open: (content: React.ReactNode) => {
    set((prev) => ({ ...prev, isOpen: true, contents: [...prev.contents, content] }));
  },
  close: () => {
    set((prev) => ({
      ...prev,
      isOpen: prev.contents.length === 1 ? false : true,
      contents: prev.contents.slice(0, prev.contents.length - 1),
    }));
  },
}));

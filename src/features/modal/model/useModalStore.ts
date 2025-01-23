import { create } from "zustand";

import { pop, push } from "@/shared/lib";

interface ModalState {
  contents: React.ReactNode[];
  isOpen: boolean;
}

interface ModalAction {
  close: () => void;
  open: (content: React.ReactNode) => void;
}

export const useModalStore = create<ModalState & ModalAction>((set, get) => ({
  contents: [],
  isOpen: false,
  open: (content: React.ReactNode) => {
    set((prev) => ({ ...prev, isOpen: true, contents: push(prev.contents, content) }));
  },
  close: () => {
    const { isOpen } = get();

    if (!isOpen) return;

    set((prev) => ({
      ...prev,
      isOpen: prev.contents.length !== 1,
      contents: pop(prev.contents),
    }));
  },
}));

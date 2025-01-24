import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface DialogState {
  stack: {
    component: React.ReactNode;
    id: string;
  }[];
  open: (component: React.ReactNode) => string;
  close: () => void;
  closeAll: () => void;
}

export const useDialog = create<DialogState>((set) => ({
  stack: [],
  open: (component) => {
    const id = uuidv4();
    set((state) => ({
      stack: [...state.stack, { component, id }],
    }));
    return id;
  },
  close: () =>
    set((state) => ({
      stack: state.stack.slice(0, -1),
    })),
  closeAll: () => set({ stack: [] }),
}));

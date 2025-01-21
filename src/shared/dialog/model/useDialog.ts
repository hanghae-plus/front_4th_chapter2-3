import { create } from "zustand";
import { DialogState, DialogStore } from "@shared/dialog/types";

const initialState: DialogState = {
  component: null,
  isOpen: false,
};

export const useDialog = create<DialogStore>((set) => ({
  ...initialState,
  open: (component) => set({ component, isOpen: true }),
  close: () => set(initialState),
}));

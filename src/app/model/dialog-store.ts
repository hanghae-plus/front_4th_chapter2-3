import { create } from "zustand"

export interface DialogState {
  dialogs: Record<DialogType, boolean>
  onOpenChange: (key: DialogType, open: boolean) => void
}

export type DialogType =
  | "addPostDialog"
  | "editPostDialog"
  | "addCommentDialog"
  | "editCommentDialog"
  | "postDetailDialog"
  | "userModal"

export const useDialogStore = create<DialogState>((set) => ({
  dialogs: {
    addPostDialog: false,
    editPostDialog: false,
    addCommentDialog: false,
    editCommentDialog: false,
    postDetailDialog: false,
    userModal: false,
  },
  onOpenChange: (key, open) =>
    set((state) => ({
      dialogs: {
        ...state.dialogs,
        [key]: open,
      },
    })),
}))

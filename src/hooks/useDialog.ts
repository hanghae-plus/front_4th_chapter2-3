import { useState } from "react"

export interface DialogComponentProps {
  onOpenChange: (open: boolean) => void
  open: boolean
}

export type DialogType =
  | "addPostDialog"
  | "editPostDialog"
  | "addCommentDialog"
  | "editCommentDialog"
  | "postDetailDialog"
  | "userModal"

export const useDialog = () => {
  const [dialogs, setDialogs] = useState<Record<DialogType, boolean>>({
    addPostDialog: false,
    editPostDialog: false,
    addCommentDialog: false,
    editCommentDialog: false,
    postDetailDialog: false,
    userModal: false,
  })

  const onOpenChange = (key: DialogType, open: boolean) => {
    setDialogs((prev) => ({
      ...prev,
      [key]: open,
    }))
  }

  return {
    dialogs,
    onOpenChange,
  }
}

import { CommentInput } from "@/entities/comment/model"
import { atom, useAtom } from "jotai"

const showAddCommentDialogAtom = atom<Partial<CommentInput> | null>(null)
const showEditCommentDialogAtom = atom(false)

export const useDialog = () => {
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)

  return new (class {
    showAddCommentDialog = showAddCommentDialog
    showEditCommentDialog = showEditCommentDialog

    setShowAddCommentDialog = setShowAddCommentDialog
    setShowEditCommentDialog = setShowEditCommentDialog
  })()
}

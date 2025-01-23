import { FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/Dialog/ui"
import useCommentModalStore from "../model/useCommentModalStore"

export const CommentModal: FC = () => {
  const { visible, children, title, closeCommentModal } = useCommentModalStore()
  return (
    <Dialog
      open={visible}
      onOpenChange={() => {
        closeCommentModal()
      }}
    >
      <DialogContent>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}

        {children}
      </DialogContent>
    </Dialog>
  )
}

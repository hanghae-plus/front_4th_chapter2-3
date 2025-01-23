import { FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/Dialog/ui"
import usePostModalStore from "../model/usePostModalStore"

export const PostModal: FC = () => {
  const { visible, children, title, desc, closePostModal } = usePostModalStore()
  console.log(title)
  return (
    <Dialog
      open={visible}
      onOpenChange={() => {
        closePostModal()
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

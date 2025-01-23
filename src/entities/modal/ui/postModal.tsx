import { FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/Dialog/ui"
import usePostModalStore from "../model/usePostModalStore"

export const PostModal: FC = () => {
  const { visible, children, title, desc, closeModal } = usePostModalStore()

  return (
    <>
      <Dialog
        open={visible}
        onOpenChange={() => {
          closeModal()
        }}
      >
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}

        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  )
}

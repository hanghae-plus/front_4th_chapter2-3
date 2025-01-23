import { FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/Dialog/ui"
import usePostModalStore from "../model/usePostModalStore"

export const PostModal: FC = () => {
  const { visible, children, title, desc, closePostModal } = usePostModalStore()

  return (
    <>
      <Dialog
        open={visible}
        onOpenChange={() => {
          closePostModal()
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

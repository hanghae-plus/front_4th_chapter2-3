import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog"
import { ModalProps } from "./types"

export const Modal = ({ open, onClose, title, children, className }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

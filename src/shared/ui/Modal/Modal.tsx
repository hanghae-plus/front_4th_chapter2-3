import { ReactNode } from "react"
import { Dialog, DialogHeader } from "../Dialog"
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog"

interface ModalProps {
  open: boolean
  onClose: () => void
  className?: string
  title: ReactNode
  children?: ReactNode
}

export const Modal = ({ open, onClose, className, title, children }: ModalProps) => {
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

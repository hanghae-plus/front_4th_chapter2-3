import { forwardRef } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { dialogStyles } from "./styles"

export const DialogContent = forwardRef<HTMLDivElement, DialogPrimitive.DialogContentProps>(
  ({ className, children, ...props }, ref) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={dialogStyles.overlay} />
      <DialogPrimitive.Content ref={ref} className={`${dialogStyles.content} ${className}`} {...props}>
        {children}
        <DialogPrimitive.Close className={dialogStyles.closeButton}>
          <X className="h-4 w-4" />
          <span className="sr-only">닫기</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  ),
)

DialogContent.displayName = DialogPrimitive.Content.displayName

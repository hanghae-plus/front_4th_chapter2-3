import { Dialog as DialogPrimitive } from "@shared/ui/Dialog"

export const Dialog = () => {
  return (
    <DialogPrimitive>
      <DialogPrimitive.Content>
        <DialogPrimitive.Header>
          <slot name="header" />
        </DialogPrimitive.Header>
        <div className="py-4">
          <slot name="content" />
        </div>
        <div className="mt-4">
          <slot name="footer" />
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive>
  )
}
import type { PropsWithChildren } from "react"

interface DialogHeaderProps {
  className: string
}

export const DialogHeader = ({ className, children, ...props }: PropsWithChildren<DialogHeaderProps>) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props}>
    {children}
    {/* DialogTitle */}
  </div>
)

DialogHeader.displayName = "DialogHeader"

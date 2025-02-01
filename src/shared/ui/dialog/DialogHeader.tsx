import { dialogStyles } from "./styles"
import { DialogHeaderProps } from "./types"

export const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div className={`${dialogStyles.header} ${className}`} {...props} />
)

DialogHeader.displayName = "DialogHeader"

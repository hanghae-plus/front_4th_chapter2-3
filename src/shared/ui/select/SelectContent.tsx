import { forwardRef } from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { selectStyles } from "./styles"

export const SelectContent = forwardRef<HTMLDivElement, SelectPrimitive.SelectContentProps>(
  ({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={`${selectStyles.content} ${className}`}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport className={selectStyles.viewport}>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  ),
)

SelectContent.displayName = SelectPrimitive.Content.displayName

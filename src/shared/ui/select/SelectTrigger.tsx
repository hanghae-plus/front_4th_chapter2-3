import { forwardRef } from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { ChevronDown } from "lucide-react"
import { SelectTriggerProps } from "./types"
import { selectStyles } from "./styles"

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger ref={ref} className={`${selectStyles.trigger} ${className}`} {...props}>
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Trigger>
  ),
)

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

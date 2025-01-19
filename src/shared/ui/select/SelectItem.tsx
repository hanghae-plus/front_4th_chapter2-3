import * as SelectPrimitive from "@radix-ui/react-select"
import { SelectItemProps } from "@radix-ui/react-select"
import { Check } from "lucide-react"
import { forwardRef } from "react"
import { selectStyles } from "./styles"

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} className={`${selectStyles.item} ${className}`} {...props}>
    <span className={selectStyles.itemIndicator}>
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))

SelectItem.displayName = SelectPrimitive.Item.displayName

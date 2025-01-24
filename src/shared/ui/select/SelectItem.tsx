import { forwardRef } from "react";
import { SelectItemProps } from "@radix-ui/react-select";
import { Check } from "lucide-react";
import { selectItemStyles } from "./Select.styles";
import * as SelectPrimitive from "@radix-ui/react-select"

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, value, ...props }, ref) => (
    <SelectPrimitive.Item
        ref={ref}
        value={value}
        className={`${selectItemStyles} ${className}`} 
        {...props}
      >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
);
SelectItem.displayName = SelectPrimitive.Item.displayName;
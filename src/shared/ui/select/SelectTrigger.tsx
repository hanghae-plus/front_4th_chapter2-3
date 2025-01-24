import { forwardRef } from "react";
import { SelectTriggerProps } from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { selectTriggerStyles } from "./Select.styles";
import * as SelectPrimitive from "@radix-ui/react-select"

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger ref={ref} className={`${selectTriggerStyles} ${className}`} {...props}>
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Trigger>
  )
);

SelectTrigger.displayName = "SelectTrigger";
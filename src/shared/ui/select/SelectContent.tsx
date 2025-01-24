import { forwardRef } from "react";
import { SelectContentProps } from "@radix-ui/react-select";
import { selectContentStyles } from "./Select.styles";
import * as SelectPrimitive from "@radix-ui/react-select"

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={`${selectContentStyles} ${className}`} 
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);

SelectContent.displayName = "SelectContent";
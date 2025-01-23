import * as SelectPrimitive from "@radix-ui/react-select"
import { ClassNameProps } from "../../type"

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    ClassNameProps {}

export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
    ClassNameProps {
  position?: "popper" | "item-aligned"
}
export interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>, ClassNameProps {}

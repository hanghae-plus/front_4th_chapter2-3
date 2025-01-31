import * as SelectPrimitive from "@radix-ui/react-select"
import type { PropsWithChildren } from "react"

export const SelectRoot = ({ children, ...props }: PropsWithChildren<SelectPrimitive.SelectProps>) => {
  return <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>
}

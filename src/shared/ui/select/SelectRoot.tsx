import * as SelectPrimitive from "@radix-ui/react-select"

import type { PropsWithChildren } from "react"

export const Select = SelectPrimitive.Root

export const SelectRoot = ({ children }: PropsWithChildren<SelectPrimitive.SelectProps>) => {
  return <Select>{children}</Select>
}

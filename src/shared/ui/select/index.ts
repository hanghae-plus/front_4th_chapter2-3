import * as SelectPrimitive from "@radix-ui/react-select"

import { SelectContent } from "./SelectContent"
import { SelectItem } from "./SelectItem"
import { SelectRoot } from "./SelectRoot"
import { SelectTrigger } from "./SelectTrigger"

export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Item: SelectItem,
  Content: SelectContent,
  Value: SelectPrimitive.Value,
  Group: SelectPrimitive.Group,
})

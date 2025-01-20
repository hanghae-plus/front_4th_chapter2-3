import * as SelectPrimitive from "@radix-ui/react-select"
import type {
  SelectContentProps,
  SelectItemProps,
  SelectTriggerProps,
} from "@radix-ui/react-select"
import { DynamicIcon } from "lucide-react/dynamic"
import { forwardRef } from "react"
import * as styles from "./Select.styles"

const Select = SelectPrimitive.Root

/** -----------------------------------------------------------------------------------------------
 * Sub Components
 * --------------------------------------------------------------------------------------------- */

const Group = SelectPrimitive.Group
const Value = SelectPrimitive.Value

/* --------------------------------------------------------------------------------------------- */

const Trigger = forwardRef(
  (
    { className, children, ...rest }: SelectTriggerProps,
    ref: React.ComponentPropsWithRef<typeof SelectPrimitive.Trigger>["ref"],
  ) => {
    return (
      <SelectPrimitive.Trigger {...rest} ref={ref} className={styles.trigger({ className })}>
        {children}
        <DynamicIcon name="chevron-down" className="opacity-50" size="16px" />
      </SelectPrimitive.Trigger>
    )
  },
)

/* --------------------------------------------------------------------------------------------- */

const Content = forwardRef(
  (
    { className, children, position = "popper", ...rest }: SelectContentProps,
    ref: React.ComponentPropsWithRef<typeof SelectPrimitive.Content>["ref"],
  ) => {
    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          {...rest}
          ref={ref}
          className={styles.content({ className })}
          position={position}
        >
          <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    )
  },
)

/* --------------------------------------------------------------------------------------------- */

const Item = forwardRef(
  (
    { className, children, ...rest }: SelectItemProps,
    ref: React.ComponentPropsWithRef<typeof SelectPrimitive.Item>["ref"],
  ) => {
    return (
      <SelectPrimitive.Item ref={ref} className={styles.item({ className })} {...rest}>
        <SelectPrimitive.ItemIndicator className={styles.itemIndicator()}>
          <DynamicIcon name="check" size="16px" />
        </SelectPrimitive.ItemIndicator>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    )
  },
)

/* --------------------------------------------------------------------------------------------- */

export default Object.assign(Select, {
  Group,
  Value,
  Trigger,
  Content,
  Item,
})

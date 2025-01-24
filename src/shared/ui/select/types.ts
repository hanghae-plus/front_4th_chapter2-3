import { HTMLAttributes, ReactElement } from "react"

export interface SelectTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: ReactElement
}

export interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  position?: "item-aligned" | "popper"
}

export interface SelectItemProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: ReactElement | string
  value: string
}

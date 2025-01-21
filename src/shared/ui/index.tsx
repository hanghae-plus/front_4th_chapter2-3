import { HTMLAttributes, ReactNode } from "react"

export interface BaseProps extends HTMLAttributes<HTMLElement> {
  className?: string
  children?: ReactNode
}

export * from "./Card"
export * from "./Select"
export * from "./Dialog"
export * from "./Table"

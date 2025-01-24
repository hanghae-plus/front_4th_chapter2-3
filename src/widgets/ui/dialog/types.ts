import { HTMLAttributes } from "react"

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string
}

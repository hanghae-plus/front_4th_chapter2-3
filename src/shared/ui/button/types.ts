import { VariantProps } from "class-variance-authority"
import { ButtonHTMLAttributes } from "react"
import { buttonVariants } from "./styles"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  className?: string
}

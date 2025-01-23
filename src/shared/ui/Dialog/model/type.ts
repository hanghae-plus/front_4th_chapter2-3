import { ClassNameProps } from "../../type"
import * as DialogPrimitive from "@radix-ui/react-dialog"

export interface DialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>,
    ClassNameProps {}
export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    ClassNameProps {}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement>, ClassNameProps {}

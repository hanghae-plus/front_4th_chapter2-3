import { HTMLAttributes } from "react";

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}
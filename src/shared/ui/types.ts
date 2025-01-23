import { ReactNode } from "react"

export interface ModalProps {
  open : boolean;
  onOpenChange:(...args : unknown) => void;
  title : ReactNode | string | number;
  children : ReactNode;
  className ?: string;
}
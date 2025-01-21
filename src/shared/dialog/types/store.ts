import { ReactNode } from "react";

export interface DialogState {
  component: ReactNode | null;
  isOpen: boolean;
}

export interface DialogStore extends DialogState {
  open: (component: ReactNode) => void;
  close: () => void;
}

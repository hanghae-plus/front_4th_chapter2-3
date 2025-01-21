import { memo } from "react";
import type { DialogHeaderProps } from "@shared/dialog/types";

export const DialogHeader = memo(({ className, ...props }: DialogHeaderProps) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props} />
));

DialogHeader.displayName = "DialogHeader";

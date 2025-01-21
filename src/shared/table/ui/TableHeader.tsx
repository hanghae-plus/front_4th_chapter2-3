import { forwardRef } from "react";
import { TableHeaderProps } from "../types";
import { cn } from "../../lib/cn.ts";

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

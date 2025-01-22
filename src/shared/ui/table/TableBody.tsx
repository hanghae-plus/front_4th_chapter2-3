import { forwardRef } from "react"

export const TableBody = forwardRef<HTMLTableSectionElement, React.ComponentProps<"tbody">>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
  ),
)
TableBody.displayName = "TableBody"

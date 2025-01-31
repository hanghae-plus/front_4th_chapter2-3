import { forwardRef } from "react"

export const TableHeader = forwardRef<HTMLTableSectionElement, React.ComponentProps<"thead">>(
  ({ className, ...props }, ref) => <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />,
)
TableHeader.displayName = "TableHeader"

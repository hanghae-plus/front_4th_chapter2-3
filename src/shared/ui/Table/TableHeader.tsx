import React, { forwardRef } from "react"

interface TableHeaderProps extends React.TableHTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(({ className, ...props }, ref) => (
  <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
))
TableHeader.displayName = "TableHeader"

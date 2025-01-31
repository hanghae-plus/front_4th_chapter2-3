import { forwardRef } from "react"

export const TableRoot = forwardRef<HTMLTableElement, React.ComponentProps<"table">>(
  ({ className, children, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table ref={ref} className={`table-fixed w-full caption-bottom text-sm ${className}`} {...props}>
        {children}
      </table>
    </div>
  ),
)
TableRoot.displayName = "Table"

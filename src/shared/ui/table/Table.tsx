import { ForwardedRef, forwardRef } from "react"
import { cn } from "../../lib"

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  className?: string
}

export const Table = forwardRef(({ className, ...props }: TableProps, ref: ForwardedRef<HTMLTableElement>) => {
  const baseClasses = "table-fixed w-full caption-bottom text-sm";

  return (
    <div className="w-full overflow-auto">
      <table ref={ref} className={cn(baseClasses, className)} {...props} />
    </div>
  );
});

Table.displayName = "Table"
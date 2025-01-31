import { forwardRef } from "react"

export const CardContent = forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  ),
)
CardContent.displayName = "CardContent"

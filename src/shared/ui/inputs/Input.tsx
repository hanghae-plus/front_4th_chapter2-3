import { ForwardedRef, forwardRef } from "react"
import { cn } from "../../lib"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

// 입력 컴포넌트
export const Input = forwardRef(({ className, type, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const baseClasses = "flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <input
      type={type}
      className={cn(baseClasses, className)}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"
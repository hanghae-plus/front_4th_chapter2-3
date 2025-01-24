import { forwardRef, HTMLAttributes } from "react"

// 카드 컴포넌트

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
))

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
))

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
))

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
))

CardTitle.displayName = "CardTitle"
CardHeader.displayName = "CardHeader"
Card.displayName = "Card"
CardContent.displayName = "CardContent"

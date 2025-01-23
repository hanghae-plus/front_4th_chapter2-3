import * as React from 'react';
import { forwardRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const baseButtonStyles =
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';

const buttonVariants = cva(baseButtonStyles, {
  variants: {
    variant: {
      default: 'bg-blue-500 text-white hover:bg-blue-600',
      destructive: 'bg-red-500 text-white hover:bg-red-600',
      outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
      link: 'underline-offset-4 hover:underline text-blue-500',
    },
    size: {
      default: 'h-10 py-2 px-4',
      sm: 'h-8 px-3 rounded-md text-xs',
      lg: 'h-11 px-8 rounded-md',
      icon: 'h-9 w-9',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

/**
 * 다양한 스타일과 크기를 지원하는 버튼 컴포넌트
 *
 * @example
 * // 기본 사용
 * <Button>클릭</Button>
 *
 * // 변형 사용
 * <Button variant="destructive">삭제</Button>
 *
 * // 크기 조절
 * <Button size="sm">작은 버튼</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={buttonVariants({ variant, size, className })} ref={ref} {...props} />
  ),
);

Button.displayName = 'Button';

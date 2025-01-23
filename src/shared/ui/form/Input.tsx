import * as React from 'react';
import { forwardRef } from 'react';

// 공통 입력 필드 스타일
const baseInputStyles =
  'flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

/**
 * 기본 입력 필드 컴포넌트
 *
 * @example
 * // 기본 사용
 * <Input placeholder="입력하세요" />
 *
 * // 타입 지정
 * <Input type="password" />
 *
 * // 비활성화
 * <Input disabled />
 */
export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input type={type} className={`${baseInputStyles} ${className}`} ref={ref} {...props} />
  ),
);

Input.displayName = 'Input';

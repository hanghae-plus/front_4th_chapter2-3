import React, { forwardRef } from 'react';

export const TableHead = forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th ref={ref} className={`py-3 px-5 text-sm font-semibold text-left ${className}`} {...props} />
));

TableHead.displayName = 'TableHead';

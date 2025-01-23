import React, { forwardRef } from 'react';

export const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} className={`py-3 px-5 ${className}`} {...props} />
));

TableCell.displayName = 'TableCell';

import React, { forwardRef } from 'react';
import { TableWrapper } from '..';

export const Table = forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <TableWrapper>
      <table
        ref={ref}
        className={`table-fixed w-full caption-bottom text-sm ${className}`}
        {...props}
      />
    </TableWrapper>
  ),
);

Table.displayName = 'Table';

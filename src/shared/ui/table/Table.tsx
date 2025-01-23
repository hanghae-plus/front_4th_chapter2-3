import React, { forwardRef } from 'react';
import { TableWrapper } from '..';

/**
 * 테이블 컴포넌트 모음
 *
 * @example
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>제목</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>내용</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 */
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

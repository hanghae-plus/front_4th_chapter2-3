import { FC, HTMLAttributes } from 'react';

interface TableWrapperProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const TableWrapper: FC<TableWrapperProps> = ({ className, children, ...props }) => (
  <div className={`w-full overflow-auto ${className}`} {...props}>
    {children}
  </div>
);

TableWrapper.displayName = 'TableWrapper';

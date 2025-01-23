import { forwardRef } from 'react';

// TableHeader Props Types
type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  className?: string;
};

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className = '', ...props }, ref) => (
    <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
  ),
);
TableHeader.displayName = 'TableHeader';

import { forwardRef } from 'react';

// 테이블 컴포넌트
interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  className?: string;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(({ className, ...props }, ref) => (
  <div className='w-full overflow-auto'>
    <table
      ref={ref}
      className={`table-fixed w-full caption-bottom text-sm ${className}`}
      {...props}
    />
  </div>
));
Table.displayName = 'Table';

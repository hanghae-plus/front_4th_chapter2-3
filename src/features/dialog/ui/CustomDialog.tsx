import type { PropsWithChildren } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui';

interface CustomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string | React.ReactNode;
  maxWidth?: string;
}
/**
 * 커스텀 다이얼로그 컴포넌트
 */
export const CustomDialog = ({
  open,
  onOpenChange,
  title,
  maxWidth = 'max-w-lg',
  children,
}: PropsWithChildren<CustomDialogProps>) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className={maxWidth}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className='space-y-4'>{children}</div>
    </DialogContent>
  </Dialog>
);

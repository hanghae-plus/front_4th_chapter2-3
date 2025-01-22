import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../shared/ui/dialog';

interface UserInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const UserInfoModal = ({ open, onOpenChange, children }: UserInfoModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

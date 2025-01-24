import { useAtom } from 'jotai';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui';
import { userModalAtom, selectedUserAtom } from '../model/store';

export const UserModal = () => {
  const [isOpen, setIsOpen] = useAtom(userModalAtom);
  const [user] = useAtom(selectedUserAtom);

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='text-center'>
            <img src={user.image} alt={user.username} className='w-24 h-24 rounded-full mx-auto' />
            <h3 className='mt-2 text-xl font-semibold'>{user.username}</h3>
          </div>
          <div className='space-y-2'>
            <p>
              <strong>이름:</strong> {user.firstName} {user.lastName}
            </p>
            <p>
              <strong>이메일:</strong> {user.email}
            </p>
            <p>
              <strong>전화번호:</strong> {user.phone}
            </p>
            {user.address && (
              <p>
                <strong>주소:</strong> {user.address.address}, {user.address.city},{' '}
                {user.address.state}
              </p>
            )}
            {user.company && (
              <p>
                <strong>직장:</strong> {user.company.name} - {user.company.title}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

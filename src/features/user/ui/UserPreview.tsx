import { User } from '@/entities/user';
import useUserDetailQuery from '@/features/user/ui/use-user-detail-query.ts';

interface UserPreviewProps {
  user?: User;
}

const UserPreview = ({ user }: UserPreviewProps) => {
  const { openUserModal } = useUserDetailQuery(user);

  return (
    <div className='flex items-center space-x-2 cursor-pointer' onClick={openUserModal}>
      <img src={user?.image} alt={user?.username} className='w-8 h-8 rounded-full' />
      <span>{user?.username}</span>
    </div>
  );
};

export default UserPreview;

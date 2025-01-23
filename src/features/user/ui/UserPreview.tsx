import { User } from '../../../entities/user/model';
import { useUserStore } from '../model';
import { getUserDetail } from '../../../entities/user/api';

interface UserCellProps {
  user?: User;
}

const UserPreview = ({ user }: UserCellProps) => {
  const { setSelectedUser, setShowUserModal } = useUserStore([
    'setSelectedUser',
    'setShowUserModal',
  ]);

  // 사용자 모달 열기
  const openUserModal = async (user: User | undefined) => {
    if (!user) return;
    try {
      const userData = await getUserDetail(user.id);
      setSelectedUser(userData);
      setShowUserModal(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className='flex items-center space-x-2 cursor-pointer' onClick={() => openUserModal(user)}>
      <img src={user?.image} alt={user?.username} className='w-8 h-8 rounded-full' />
      <span>{user?.username}</span>
    </div>
  );
};

export default UserPreview;

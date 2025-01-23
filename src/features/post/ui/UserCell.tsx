import { TableCell } from '../../../shared/ui';
import { Post } from '../../../entities/post/model';
import { User } from '../../../entities/user/model';
import { useUserStore } from '../../user/model/use-user-store.ts';
import { getUserDetail } from '../../../entities/user/api';

interface UserCellProps {
  post: Post;
}

const UserCell = ({ post }: UserCellProps) => {
  const { setSelectedUser, setShowUserModal } = useUserStore();

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
    <TableCell>
      <div
        className='flex items-center space-x-2 cursor-pointer'
        onClick={() => openUserModal(post?.author)}
      >
        <img
          src={post.author?.image}
          alt={post.author?.username}
          className='w-8 h-8 rounded-full'
        />
        <span>{post.author?.username}</span>
      </div>
    </TableCell>
  );
};

export default UserCell;

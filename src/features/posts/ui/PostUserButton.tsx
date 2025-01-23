import { useSelectedUserStore } from '../../../entities/user/model/store';
import { User } from '../../../shared/types';

interface PostUserButtonProps {
  author: User | undefined;
}

export const PostUserButton = ({ author }: PostUserButtonProps) => {
  const { openUserModal } = useSelectedUserStore();

  if (!author) return null;

  return (
    <div
      className='flex items-center space-x-2 cursor-pointer'
      onClick={() => openUserModal(author)}
    >
      <img src={author.image} alt={author.username} className='w-8 h-8 rounded-full' />
      <span>{author.username}</span>
    </div>
  );
};

import { useUserStore } from '../model/store';

interface UserAvatarProps {
  image?: string;
  username: string;
  userId: number;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

export const UserAvatar = ({
  image,
  username,
  userId,
  size = 'md',
  showName = true,
}: UserAvatarProps) => {
  const { setSelectedUser, setIsUserDetailOpen } = useUserStore();

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const handleClick = () => {
    setSelectedUser({ id: userId, username, image } as any);
    setIsUserDetailOpen(true);
  };

  return (
    <div className='flex items-center gap-2 cursor-pointer' onClick={handleClick}>
      {image && <img src={image} alt={username} className={`${sizeClasses[size]} rounded-full`} />}
      {showName && <span className='text-sm font-medium'>{username}</span>}
    </div>
  );
};

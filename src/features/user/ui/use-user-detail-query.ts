import { useUserStore } from '@/features/user';
import { useQuery } from '@tanstack/react-query';
import { userQueries } from '@/entities/user/api/queries.ts';
import { User } from '@/entities/user';

const useUserDetailQuery = (user?: User) => {
  const { setSelectedUserId, setShowUserModal } = useUserStore();

  const { refetch } = useQuery({
    ...userQueries.userDetail(user?.id || 0),
    enabled: false,
  });

  // 사용자 모달 열기
  const openUserModal = async () => {
    if (!user) return;
    try {
      const { data } = await refetch();
      setSelectedUserId(data?.id);
      setShowUserModal(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  return {
    openUserModal,
  };
};

export default useUserDetailQuery;

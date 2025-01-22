import { useEffect, useState } from 'react';
import { User } from 'src/shared/types';
import { getUserInfo } from '../api';

export const useUserInfo = (userId: number) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const data = await getUserInfo(userId);
        setUser(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};

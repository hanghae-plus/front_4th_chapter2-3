import { useUserStore } from "@core/store/useUserStore.ts";
import { fetchUsers } from "@entities/user/api/fetchUsers.ts";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useUser = () => {
  const { users, setUsers } = useUserStore();

  const query = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (query.data) {
      setUsers(query.data);
    }
  }, [query.data]);

  return {
    users,
    isLoading: query.isLoading,
  };
};

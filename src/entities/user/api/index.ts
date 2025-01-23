import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserResponse } from "@/types/user.ts";

export const useFetchUsersQuery = () => {
  return useQuery<UserResponse>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users?limit=0&select=username,image").then((res) => res.data),
  });
};

export const useFetchUserQuery = (userId: string) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => axios.get(`/api/users/${userId}`).then((res) => res.data),
    enabled: !!userId,
  });
};

import { fetchUserProfiles } from "@/entities/user/api"
import { useQuery } from "@tanstack/react-query"

export function useQueryUsersProfile() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUserProfiles(),
  })
}

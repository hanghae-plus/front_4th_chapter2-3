import { useQuery } from "@tanstack/react-query";
import { Tag, getTags } from "@entities/index";
import { tagQueryKey } from "./tagQueryKey";

export const useTagQuery = () => {
  return useQuery<Tag[]>({
    queryKey: tagQueryKey.list(),
    queryFn: async () => getTags(),
    placeholderData: [],
    staleTime: Infinity,
  });
};

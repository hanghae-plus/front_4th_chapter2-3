import { QUERY_KEY } from "@features/shared";

export const tagQueryKey = {
  base: [QUERY_KEY.TAG] as const,
  list: () => [tagQueryKey.base, "list"],
};

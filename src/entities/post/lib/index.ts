import { createQueryKeys } from "@lukemorales/query-key-factory"
import { SearchParams } from "@entities/post/types"

export const postKeys = createQueryKeys("posts", {
  fetch: (props: SearchParams & { searchQuery: string; tag: string }) => [props],
  tags: () => ["tags"],
})

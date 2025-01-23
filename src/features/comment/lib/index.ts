import { createQueryKeys } from "@lukemorales/query-key-factory"

export const commentKeys = createQueryKeys("comment", {
  fetch: () => ["comment"],
})

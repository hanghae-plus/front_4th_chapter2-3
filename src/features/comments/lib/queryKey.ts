import { createQueryKeys } from "@lukemorales/query-key-factory";

import { Comment } from "@/entities/comments";

export const commentsKeys = createQueryKeys("comments", {
  getComments: (postId: Comment["postId"]) => ["all", postId],
});

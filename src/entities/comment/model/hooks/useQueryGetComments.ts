import { useQuery } from "@tanstack/react-query"

import { fetchComments } from "../../api/fetchComments"

import type { Comment } from "../types/comments"

interface UseQueryGetCommentsParams {
  postId: number
}

export const getCommentsQueryKeys = {
  all: ["fetchComments"],
  detail: (postId: number) => ["fetchComments", { postId }],
}

export const useQueryGetComments = ({ postId }: UseQueryGetCommentsParams) => {
  return useQuery({
    queryKey: getCommentsQueryKeys.detail(postId),
    queryFn: async () => fetcher(postId),
  })
}

const fetcher = async (postId: number): Promise<Comment[] | undefined> => {
  try {
    const data = await fetchComments(postId)

    if (!data) return

    return data.comments
  } catch (error) {
    console.error("댓글 정보 가져오기 오류:", error)
  }
}

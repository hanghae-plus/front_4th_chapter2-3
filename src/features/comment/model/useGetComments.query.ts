import { useQuery } from "@tanstack/react-query"
import { getCommentsApi } from "../../../entities/comment/api/getComments.api"
import { Post } from "../../../entities/post/model/types"
import { useEffect } from "react"
import { PostComments } from "../../../entities/comment/model/types"

type Props = {
  postId: Post["id"]
  onSuccess?: (comments: PostComments) => void
  fallback?: () => void
}
const useGetComments = ({ postId, onSuccess, fallback }: Props) => {
  const { data, error, isFetched, isSuccess } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getCommentsApi(postId),
  })

  useEffect(() => {
    if (isSuccess && data && onSuccess) {
      onSuccess(data)
    }
  }, [data, isSuccess, onSuccess])

  useEffect(() => {
    if (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }, [error])

  useEffect(() => {
    if (isFetched && fallback) {
      fallback()
    }
  }, [isFetched, fallback])

  return {
    postComments: data,
  }
}

export { useGetComments }

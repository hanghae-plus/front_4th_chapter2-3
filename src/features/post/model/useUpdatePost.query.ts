import { useMutation } from "@tanstack/react-query"
import { Post } from "../../../entities/post/model/types"
import { updatePostApi } from "../../../entities/post/api/updatePost.api"

interface UpdatePostApiParams {
  onSuccess?: (post: Post) => void
  onError?: () => void
  fallback?: () => void
}

const useUpdatePost = ({
  onSuccess,
  onError,
  fallback,
}: UpdatePostApiParams) => {
  const { mutate } = useMutation({
    mutationKey: ["updatePost"],
    mutationFn: updatePostApi,
    onSuccess,
    onSettled: () => {
      if (fallback) fallback()
    },
    onError: () => {
      if (onError) onError()
    },
  })

  return { updatePost: mutate }
}

export { useUpdatePost }

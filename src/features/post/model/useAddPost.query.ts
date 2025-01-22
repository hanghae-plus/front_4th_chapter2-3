import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addPostApi } from "../../../entities/post/api/addPost.api"
import { Post } from "../../../entities/post/model/types"

interface Props {
  onSuccess?: (post: Post) => void
  onError?: () => void
  fallback?: () => void
}

const useAddPost = ({ onSuccess, onError, fallback }: Props) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: addPostApi,
    onSuccess: (post) => {
      // 성공 시 처리
      if (onSuccess) {
        onSuccess(post as Post)
      }
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
    onError: () => {
      // 실패 시 처리
      if (onError) {
        onError()
      }
    },
    onSettled: () => {
      // 성공/실패 시 처리
      if (fallback) {
        fallback()
      }
    },
  })

  return { addPost: mutate }
}

export { useAddPost }

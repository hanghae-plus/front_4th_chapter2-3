import { useCreatePost } from "../../../entities/post/api/hooks/usePostMutations"
import { CreatePostParams } from "../../../entities/post/api/postApi"

export const useAddPost = () => {
  const { mutate } = useCreatePost()

  const onAddPost = async (
    newPost: CreatePostParams["body"],
    callbacks?: { onSuccess?: () => void; onError?: (error: Error) => void; onSettled?: () => void },
  ) => {
    mutate(newPost, {
      onSuccess: () => {
        callbacks?.onSuccess?.()
      },
      onError: (error) => {
        callbacks?.onError?.(error)
      },
      onSettled: () => {
        callbacks?.onSettled?.()
      },
    })
  }

  return { onAddPost }
}

import { deletePost, postKeys, PostsResponse } from "@/entities/posts"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface UseMutationDeletePostProps {
  postId?: number
}

function useMutationDeletePost(props: UseMutationDeletePostProps) {
  const { postId } = props
  const queryClient = useQueryClient()

  const { mutate: deletePostMutation, isPending } = useMutation({
    mutationFn: () => {
      if (!postId) throw new Error("postId가 필요합ㄴ디ㅏ.")
      return deletePost(postId)
    },
    onSuccess: () => {
      queryClient.setQueryData(postKeys.all, (oldData: PostsResponse) => {
        return {
          ...oldData,
          posts: oldData.posts.filter((oldPost) => oldPost.id !== postId),
        }
      })
    },
  })

  return { deletePostMutation, isPending }
}

export { useMutationDeletePost }

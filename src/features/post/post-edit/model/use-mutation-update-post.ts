import { Post, postKeys, PostsResponse, updatePost } from "@/entities/posts"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface UseMutationUpdatePostProps {
  post?: Post
  title: string
  body: string
}

function useMutationUpdatePost(props: UseMutationUpdatePostProps) {
  const { post, title, body } = props
  const queryClient = useQueryClient()

  const { mutate: updatePostMutation, isPending } = useMutation({
    mutationFn: () => updatePost({ ...post, title, body }),
    onSuccess: () => {
      queryClient.setQueryData(postKeys.all, (oldData: PostsResponse) => {
        return {
          ...oldData,
          posts: oldData.posts.map((oldPost: Post) =>
            oldPost.id === post?.id ? { ...oldPost, title, body } : oldPost,
          ),
        }
      })
    },
  })

  return { updatePostMutation, isPending }
}

export { useMutationUpdatePost }

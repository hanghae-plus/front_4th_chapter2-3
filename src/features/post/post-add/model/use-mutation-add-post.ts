import { addPost, Post, postKeys, PostsResponse } from "@/entities/posts"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface UseMutationAddPostProps {
  newPost: Post
  setOpen: (open: boolean) => void
}

function useMutationAddPost(props: UseMutationAddPostProps) {
  const { newPost, setOpen } = props

  const queryClient = useQueryClient()

  const { mutate: addPostMutation, isPending } = useMutation({
    mutationFn: () => addPost(newPost),
    onSuccess: (response) => {
      queryClient.setQueryData(postKeys.all, (oldData: PostsResponse) => ({
        ...oldData,
        posts: [...oldData.posts, response],
      }))
      setOpen(false)
    },
  })

  return { addPostMutation, isPending }
}

export { useMutationAddPost }

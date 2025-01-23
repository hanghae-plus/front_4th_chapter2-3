import { postApi } from "./api"
import { queryClient } from "../../../shared/api"
import { CreatePostDto, Post } from "../model"
import { postQueries } from "./queries"

export const postMutations = {
  addMutation: () => ({
    mutationKey: [...postQueries.all(), "add"] as const,
    mutationFn: (post: CreatePostDto) => postApi.addPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postQueries.all(),
      })
    },
  }),

  updateMutation: () => ({
    mutationKey: [...postQueries.all(), "update"] as const,
    mutationFn: ({ id, post }: { id: number; post: Partial<Post> }) => postApi.updatePost(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postQueries.all(),
      })
    },
  }),

  deleteMutation: () => ({
    mutationKey: [...postQueries.all(), "delete"] as const,
    mutationFn: (id: number) => postApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postQueries.all(),
      })
    },
  }),
}

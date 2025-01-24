import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreatePostDto, Post } from "../../../entities/post/model/types"
import { PostApi } from "../../../entities/post/api/postApi"

export const useAddPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newPost: CreatePostDto) => PostApi.addPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      })
    },
  })
}

export const useEditPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (editedPost: Post) => PostApi.editPost(editedPost),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      })
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => PostApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      })
    },
  })
}

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addPostApi } from "../../../entities/post/api/addPost.api"
import { NewPost, Post } from "../../../entities/post/model/types"
import { usePostStore } from "../../../entities/post/model/usePost.store"

interface Props {
  onSuccess?: (post: Post) => void
  onError?: () => void
  fallback?: () => void
}

const toPost = (
  post: NewPost & {
    id: Post["id"]
  },
) => {
  return {
    id: post.id,
    title: post.title,
    body: post.body,
    tags: [],
    reactions: {
      likes: 0,
      dislikes: 0,
    },
    views: 0,
    userId: post.userId,
    author: {
      id: post.userId,
      username: "junman",
      email: "a@a.com",
    },
  } as unknown as Post
}

const useAddPost = ({ onSuccess, onError, fallback }: Props) => {
  const { addPost } = usePostStore()
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: addPostApi,
    onSuccess: (postDraft) => {
      // 성공 시 처리
      const post = toPost(postDraft)
      if (onSuccess) {
        onSuccess(post)
      }
      addPost(post)
      queryClient.invalidateQueries({ queryKey: ["posts"] }) //의미없음...
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

import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

import { postMutations, postQueries } from "../../../../entities/post/api"
import { Post } from "../../../../entities/post/model"
import { ToggleKey } from "../../../../pages/main/model"
import { queryClient } from "../../../../shared/api"
import { useToggleState } from "../../../../shared/model/ToggleStateContext"

export const useEditPostModal = () => {
  const { isOpen, onOpen } = useToggleState<ToggleKey>()
  const [postId, setPostId] = useState<number>()
  const [editingPost, setEditingPost] = useState<Post>()

  const { data: post } = useQuery({
    ...postQueries.detailQuery(postId?.toString() || ""),
    enabled: !!postId,
  })

  const isOpenEditPost = isOpen("editPost")

  useEffect(() => {
    if (isOpenEditPost && post) {
      setEditingPost(post)
    }
  }, [isOpenEditPost, post])

  const updatePostMutation = useMutation({
    ...postMutations.updateMutation(),
    onSuccess: () => {
      close()
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
    onError: (error) => {
      console.error("게시물 업데이트 오류:", error)
    },
  })

  const handleEdit = (id: number) => {
    setPostId(id)
    onOpen("editPost")
  }

  const handleChange = (field: string, value: string | number) => {
    if (!editingPost) return
    setEditingPost((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        [field]: value,
      }
    })
  }

  const handleSubmit = () => {
    if (!editingPost) return
    updatePostMutation.mutate({
      id: editingPost.id,
      post: editingPost,
    })
  }

  return {
    post: editingPost,
    handleEdit,
    handleChange,
    handleSubmit,
    isSubmitting: updatePostMutation.isPending,
  }
}

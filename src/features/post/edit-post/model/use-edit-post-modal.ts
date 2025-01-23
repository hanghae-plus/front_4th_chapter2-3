import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"

import { postMutations, postQueries } from "../../../../entities/post/api"
import { queryClient } from "../../../../shared/api"
import { useModal } from "../../../../shared/lib"
import { Post } from "../../../../entities/post/model"

export const useEditPostModal = () => {
  const { isOpen, open, close } = useModal()
  const [postId, setPostId] = useState<number>()
  const [editingPost, setEditingPost] = useState<Post>()

  const { data: post } = useQuery({
    ...postQueries.detailQuery(postId?.toString() || ""),
    enabled: !!postId,
  })

  useEffect(() => {
    if (isOpen && post) {
      setEditingPost(post)
    }
  }, [isOpen, post])

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
    open()
  }

  const handleClose = () => {
    close()
    setPostId(undefined)
    setEditingPost(undefined)
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
    isOpen,
    post: editingPost,
    handleEdit,
    handleClose,
    handleChange,
    handleSubmit,
    isSubmitting: updatePostMutation.isPending,
  }
}

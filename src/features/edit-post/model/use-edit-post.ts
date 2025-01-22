import { useEffect, useState } from "react"

import { useModal } from "../../../shared/lib/hooks/modal/use-modal"
import { useMutation, useQuery } from "@tanstack/react-query"
import { postMutations } from "../../../entities/post/api/mutations"
import { postQueries } from "../../../entities/post/api/queries"
import { queryClient } from "../../../shared/api/query-client"
import { Post } from "../../../entities/post/model/types"

export const useEditPost = () => {
  const { isOpen, open, close } = useModal()
  const [postId, setPostId] = useState<number>()
  const [editingPost, setEditingPost] = useState<Post>()

  const { data: post } = useQuery({
    ...postQueries.detailQuery(postId?.toString() || ""),
    enabled: !!postId,
  })

  useEffect(() => {
    if (post) {
      setEditingPost(post)
    }
  }, [post])

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

  const handleChange = (field: string, value: string) => {
    if (!editingPost) return
    setEditingPost({
      ...editingPost,
      [field]: value,
    })
  }

  const handleSubmit = () => {
    console.log(editingPost)
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
    handleClose: close,
    handleChange,
    handleSubmit,
    isSubmitting: updatePostMutation.isPending,
  }
}

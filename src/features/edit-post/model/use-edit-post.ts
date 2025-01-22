import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"

import { postMutations } from "../../../entities/post/api/mutations"
import { postQueries } from "../../../entities/post/api/queries"
import { queryClient } from "../../../shared/api/query-client"
import { Post } from "../../../entities/post/model/types"
import { useModal } from "../../../shared/lib/hooks/modal/use-modal"

export const useEditPost = () => {
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
    handleClose,
    handleChange,
    handleSubmit,
    isSubmitting: updatePostMutation.isPending,
  }
}

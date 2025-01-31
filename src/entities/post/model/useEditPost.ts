import { useState } from "react"
import { useDialog } from "@widgets/dialog/model/useDialog"
import { useUpdatePost } from "../api/useUpdatePost"
import { Post } from "./types"

export const useEditPost = () => {
  const { isOpen, open, close } = useDialog()
  const [post, setPost] = useState<Post>()
  const { mutate: editPost } = useUpdatePost()

  const handleSubmit = () => {
    if (!post) return
    editPost(post, {
      onSuccess: () => {
        close()
        setPost(undefined)
      },
    })
  }

  const handleChange = (field: keyof Post) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost((prev) => ({ ...prev!, [field]: e.target.value }))
  }

  const handleOpen = (postData: Post) => {
    setPost(postData)
    open()
  }

  return {
    isOpen,
    post,
    handleOpen,
    handleClose: close,
    handleChange,
    handleSubmit,
  }
}

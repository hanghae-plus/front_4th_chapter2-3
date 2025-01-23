import { useState } from "react"
import { useDialog } from "../../../features/dialog/model/useDialog"
import { usePostPost } from "../api/usePostPost"
import { Post } from "../model/types"

export const useAddPost = () => {
  const { isOpen, open, close } = useDialog()
  const { mutate: addPost } = usePostPost()
  const [newPost, setNewPost] = useState<Partial<Post>>({
    title: "",
    body: "",
    userId: 0,
  })

  const handleSubmit = () => {
    addPost(newPost, {
      onSuccess: () => {
        close() // Dialog 닫기
        setNewPost({ title: "", body: "", userId: 1 })
      },
    })
  }

  const handleChange =
    (field: keyof Partial<Post>) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = field === "userId" ? Number(e.target.value) : e.target.value
      setNewPost((prev) => ({ ...prev, [field]: value, userId: 1 }))
    }

  return {
    isOpen,
    open,
    handleClose: close,
    newPost,
    handleSubmit,
    handleChange,
  }
}

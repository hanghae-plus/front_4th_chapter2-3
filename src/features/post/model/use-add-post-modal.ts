import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { postMutations } from "../../../entities/post/api/mutations"
import { queryClient } from "../../../shared/api/query-client"
import { useModal } from "../../../shared/lib/hooks/modal/use-modal"

export const useAddPostModal = () => {
  const { isOpen, open, close } = useModal()
  const [formData, setFormData] = useState({ title: "", body: "", userId: 1 })

  const addPostMutation = useMutation({
    ...postMutations.addMutation(),
    onSuccess: () => {
      close()
      setFormData({ title: "", body: "", userId: 1 })
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
    onError: (error) => {
      console.error("게시물 추가 오류:", error)
    },
  })

  const handleChange = ({ field, value }: { field: string; value: string | number }) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    addPostMutation.mutateAsync(formData)
  }

  const onClose = () => {
    close()
    setFormData({ title: "", body: "", userId: 1 })
  }

  return {
    isOpen,
    formData,
    handleChange,
    handleOpen: open,
    handleClose: onClose,
    handleSubmit,
    isSubmitting: addPostMutation.isPending,
  }
}

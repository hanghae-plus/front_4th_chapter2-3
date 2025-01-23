import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { postMutations } from "../../../../entities/post/api"
import { ToggleKey } from "../../../../pages/main/model"
import { queryClient } from "../../../../shared/api"
import { useToggleState } from "../../../../shared/model/toggle-state.model"

export const useAddPostModal = () => {
  const { onClose } = useToggleState<ToggleKey>()
  const [formData, setFormData] = useState({ title: "", body: "", userId: 1 })

  const addPostMutation = useMutation({
    ...postMutations.addMutation(),
    onSuccess: () => {
      setFormData({ title: "", body: "", userId: 1 })
      queryClient.invalidateQueries({ queryKey: ["posts"] })

      handleClose()
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

  const handleClose = () => {
    setFormData({ title: "", body: "", userId: 1 })
    onClose("addPost")
  }

  return {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting: addPostMutation.isPending,
  }
}

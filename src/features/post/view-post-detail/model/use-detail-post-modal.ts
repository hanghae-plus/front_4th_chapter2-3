import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { commentQueries } from "../../../../entities/comment/api"
import { postQueries } from "../../../../entities/post/api"
import { ToggleKey } from "../../../../pages/main/model"
import { useToggleState } from "../../../../shared/model/toggle-state.model"

export const useDetailPostModal = () => {
  const { isOpen, onOpen, onClose } = useToggleState<ToggleKey>()
  const [selectedPostId, setSelectedPostId] = useState<string>()

  const { data: post } = useQuery({
    ...postQueries.detailQuery(selectedPostId || ""),
    enabled: !!selectedPostId,
  })

  const { data: comments } = useQuery({
    ...commentQueries.byPostQuery(Number(selectedPostId) || 0),
    select: (data) => data?.comments,
    enabled: !!selectedPostId,
  })

  const handleView = (id: string) => {
    setSelectedPostId(id)
    onOpen("detailPost")
  }

  const handleClose = () => {
    onClose("detailPost")
    setSelectedPostId(undefined)
  }
  return {
    isOpen,
    post,
    comments,
    handleView,
    handleClose,
  }
}

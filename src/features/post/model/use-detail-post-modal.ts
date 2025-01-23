import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { useModal } from "../../../shared/lib/hooks/modal/use-modal"
import { postQueries } from "../../../entities/post/api/queries"
import { commentQueries } from "../../../entities/comment/api/queries"

export const useDetailPostModal = () => {
  const { isOpen, open, close } = useModal()
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
    open()
  }

  const handleClose = () => {
    close()
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

import { useSetAtom } from "jotai"
import { selectedPostAtom } from "@features/postDetail/model"
import { Button } from "@shared/ui/common"
import { dialogAtomFamily } from "@shared/model"

import type { ReactNode } from "react"
import type { PostType } from "@entities/post/model"

interface Props {
  children: ReactNode
  post: PostType
}

export const OpenPostDetailButton = ({ children, post }: Props) => {
  const setShowDetailDialog = useSetAtom(dialogAtomFamily("post-detail"))
  const setSelectedPost = useSetAtom(selectedPostAtom)

  const openPostDetail = (post: PostType) => {
    setSelectedPost(post)
    setShowDetailDialog(true)
  }

  return (
    <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
      {children}
    </Button>
  )
}

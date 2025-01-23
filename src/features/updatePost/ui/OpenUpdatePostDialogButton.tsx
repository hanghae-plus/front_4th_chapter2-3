import { useSetAtom } from "jotai"
import { selectedPostAtom } from "../../postDetail/model"
import { dialogAtomFamily } from "../../../shared/model"
import { Button } from "../../../shared/ui/common"

import type { ReactNode } from "react"
import type { PostType } from "../../../entities/post/model"

interface Props {
  children: ReactNode
  post: PostType
}

export const OpenUpdatePostDialogButton = ({ children, post }: Props) => {
  const setShowEditDialog = useSetAtom(dialogAtomFamily("edit-post"))
  const setSelectedPost = useSetAtom(selectedPostAtom)

  const openUpdatePostDialog = () => {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  return (
    <Button variant="ghost" size="sm" onClick={openUpdatePostDialog}>
      {children}
    </Button>
  )
}

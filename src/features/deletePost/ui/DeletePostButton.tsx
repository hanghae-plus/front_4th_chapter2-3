import { useSetAtom } from "jotai"
import { useDeletePostMutation } from "../api"
import { postsWithUsersAtom } from "../../postsWithUsers/model"
import { Button } from "../../../shared/ui/common"

import type { ReactNode } from "react"

interface Props {
  children: ReactNode
  postId: number
}

export const DeletePostButton = ({ children, postId }: Props) => {
  const setPosts = useSetAtom(postsWithUsersAtom)

  const deletePostMutation = useDeletePostMutation({
    onSuccess: (postId) => {
      setPosts((prev) => prev?.filter((post) => post.id !== postId))
    },
  })

  return (
    <Button variant="ghost" size="sm" onClick={() => deletePostMutation.mutate(postId)}>
      {children}
    </Button>
  )
}

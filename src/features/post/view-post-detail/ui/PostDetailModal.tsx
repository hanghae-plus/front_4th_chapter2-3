import { DialogTitle } from "@radix-ui/react-dialog"
import { JSX } from "react"

import { Post } from "../../../../entities/post/model"
import { highlightText } from "../../../../shared/lib"
import { DialogHeader, Modal } from "../../../../shared/ui"
import { ToggleKey } from "../../../../pages/main/model"
import { useToggleState } from "../../../../shared/model/toggle-state.model"

interface PostDetailModalProps {
  post?: Post
  searchQuery?: string
  CommentList: () => JSX.Element | null
}

export const PostDetailModal = ({ post, searchQuery = "", CommentList }: PostDetailModalProps) => {
  const { isOpen, onClose } = useToggleState<ToggleKey>()
  return (
    <Modal open={isOpen("detailPost")} onClose={() => onClose("detailPost")}>
      <DialogHeader>
        <DialogTitle>{highlightText(post?.title ?? "", searchQuery)}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="overflow-hidden">
          <p className="break-words">{highlightText(post?.body ?? "", searchQuery)}</p>
          <CommentList />
        </div>
      </div>
    </Modal>
  )
}

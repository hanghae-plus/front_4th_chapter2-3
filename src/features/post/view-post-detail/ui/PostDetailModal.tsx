import { DialogTitle } from "@radix-ui/react-dialog"
import { JSX } from "react"

import { Post } from "../../../../entities/post/model"
import { highlightText } from "../../../../shared/lib"
import { DialogHeader, Modal } from "../../../../shared/ui"

interface PostDetailModalProps {
  isOpen: boolean
  onClose: () => void
  post?: Post
  searchQuery?: string
  CommentList: () => JSX.Element | null
}

export const PostDetailModal = ({ isOpen, onClose, post, searchQuery = "", CommentList }: PostDetailModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
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

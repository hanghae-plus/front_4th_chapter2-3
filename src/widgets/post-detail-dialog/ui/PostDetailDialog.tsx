import { Dialog, HighlightText } from "../../../shared/ui"

import type { Post } from "../../../entities/post/model/types/post"

interface PostDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedPost: Post | null
  searchQuery: string
}

export const PostDetailDialog = ({ open, onOpenChange, selectedPost, searchQuery }: PostDetailDialogProps) => {
  if (selectedPost === null) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="max-w-3xl">
        <Dialog.Header>
          <Dialog.Title>
            <HighlightText text={selectedPost.title} highlight={searchQuery} />
          </Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <p>
            <HighlightText text={selectedPost.body} highlight={searchQuery} />
          </p>
          {/* TODO: 댓글 렌더링 */}
          {/* {renderComments(selectedPost?.id)} */}
        </div>
      </Dialog.Content>
    </Dialog>
  )
}

import { Dialog } from "@shared/ui"
import { CommentList } from "@features/comment/ui"
import { usePostStore } from "@features/post/model/stores"

export const PostDetailDialog = () => {
  const { showPostDetailDialog: open, setShowPostDetailDialog: onOpenChange } = usePostStore()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content aria-describedby="post-detail-description">
        <Dialog.Header>
          <Dialog.Title>게시물 상세</Dialog.Title>
          <p id="post-detail-description">게시물의 상세 내용과 댓글을 확인할 수 있습니다.</p>
        </Dialog.Header>
        <CommentList />
      </Dialog.Content>
    </Dialog>
  )
}

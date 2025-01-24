import { usePostStore } from "./store"
import { Post } from "../../../entities/post/model/types"
import { useDialogStore } from "../../../shared/model/useDialogStore"

export const usePostDetailActions = () => {
  const { setSelectedPost } = usePostStore()

  const { setShowPostDetailDialog } = useDialogStore()

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  return {
    openPostDetail,
  }
}

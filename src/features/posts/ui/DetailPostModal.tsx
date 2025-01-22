import { Modal } from "../../../shared/ui"
import { highlightText } from "../lib/highlightText.tsx"
import RenderComments from "../../comments/ui/RenderComments.tsx"
import { useAtom, useAtomValue } from "jotai"
import { showPostDetailDialogAtom } from "../../../entities/modal/model/modalOpenerStore.ts"
import { selectedPostsAtom } from "../model/postsStore.ts"
import { searchQueryAtom } from "../../search/model/searchQueryStore.ts"
{/* 게시물 상세 보기 대화상자 */}
export default function DetailPostModal() {
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom);
  const selectedPost = useAtomValue(selectedPostsAtom);
  const searchQuery = useAtomValue(searchQueryAtom);
  
  return (
    <Modal
      open={showPostDetailDialog}
      onOpenChange={setShowPostDetailDialog}
      title={highlightText(selectedPost?.title, searchQuery)}
    >
      <div className="space-y-4">
        <p>{highlightText(selectedPost?.body, searchQuery)}</p>
        {RenderComments(selectedPost?.id)}
      </div>
    </Modal>
  )
}
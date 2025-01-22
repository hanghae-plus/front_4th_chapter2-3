import { Button, Input, Modal, Textarea } from "../../../shared/ui"
import { useAtom } from "jotai"
import { showEditDialogAtom } from "../../../entities/modal/model/modalOpenerStore.ts"
import { selectedPostsAtom } from "../model/postsStore.ts"
import usePostData from "../model/usePostData.ts"

{/* 게시물 수정 대화상자 */}
export default function EditPostModal() {
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom);
  const [selectedPost, setSelectedPost] = useAtom(selectedPostsAtom);
  const {updatePost} = usePostData();
  return (
    <Modal
      open={showEditDialog}
      onOpenChange={setShowEditDialog}
      title="게시물 수정"
    >
      <div className="space-y-4">
        <Input
          placeholder="제목"
          value={selectedPost?.title || ""}
          onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
        />
        <Textarea
          rows={15}
          placeholder="내용"
          value={selectedPost?.body || ""}
          onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
        />
        <Button onClick={() => updatePost(selectedPost)}>게시물 업데이트</Button>
      </div>
    </Modal>
  )
}
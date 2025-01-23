import { Button, Input, Modal, Textarea } from "../../../shared/ui"
import { useAtom, useAtomValue } from "jotai"
import { showAddDialogAtom } from "../../../entities/modal/model/modalOpenerStore.ts"
import { newPostsAtom } from "../model/postsStore.ts"
import usePostData from "../model/usePostData.ts"

{/* 게시물 추가 대화상자 */}
export default function PostAddModal() {
  const [showAddDialog,setShowAddDialog]  = useAtom(showAddDialogAtom);
  const [newPost, setNewPost] = useAtom(newPostsAtom);
  const {addPost} = usePostData()
  return (
    <Modal
      open={showAddDialog}
      onOpenChange={setShowAddDialog}
      title="새 게시물 추가"
    >
      <div className="space-y-4">
        <Input
          placeholder="제목"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <Textarea
          rows={30}
          placeholder="내용"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />
        <Input
          type="number"
          placeholder="사용자 ID"
          value={newPost.userId}
          onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
        />
        <Button onClick={() => addPost(newPost)}>게시물 추가</Button>
      </div>
    </Modal>
  )
}
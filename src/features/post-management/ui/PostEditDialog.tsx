import { Dialog, DialogContent, DialogHeader, DialogTitle, Input, Button, Textarea } from "../../shared/ui"
import { usePostsStore } from "../../entities/post/model/postsStore"
import { useState, useEffect } from "react"

export const PostEditDialog = () => {
  const { selectedPost, showEditDialog, setShowEditDialog, handlePostUpdate } = usePostsStore()

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title)
      setBody(selectedPost.body)
      setTags(selectedPost.tags || [])
    }
  }, [selectedPost])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPost) return

    handlePostUpdate({
      ...selectedPost,
      title,
      body,
      tags,
    })
  }

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label>제목</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요" />
          </div>
          <div className="space-y-2">
            <label>내용</label>
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="내용을 입력하세요" />
          </div>
          <div className="space-y-2">
            <label>태그</label>
            <Input
              value={tags.join(", ")}
              onChange={(e) => setTags(e.target.value.split(",").map((tag) => tag.trim()))}
              placeholder="태그를 입력하세요 (쉼표로 구분)"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setShowEditDialog(false)}>
              취소
            </Button>
            <Button type="submit">저장</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog/Dialog"
import { Input } from "@/shared/ui/"
import { Textarea } from "@/shared/ui/"
import { Button } from "@/shared/ui/"
import { usePostsStore } from "@/entities/post/model/postsStore"

interface AddPostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface NewPost {
  title: string
  body: string
  userId: number
}

export const AddPostDialog = ({ open, onOpenChange }: AddPostDialogProps) => {
  const { setLoading, fetchPosts } = usePostsStore()
  const [newPost, setNewPost] = useState<NewPost>({
    title: "",
    body: "",
    userId: 0,
  })

  const handleAddPost = async () => {
    try {
      setLoading(true)
      // 여기에 게시물 추가 API 호출 로직 구현
      // await addPost(newPost)
      await fetchPosts(0, 10) // 목록 새로고침
      onOpenChange(false) // 다이얼로그 닫기
      // 입력 폼 초기화
      setNewPost({
        title: "",
        body: "",
        userId: 0,
      })
    } catch (error) {
      console.error("Failed to add post:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewPost({ ...newPost, userId: Number(e.target.value) })
            }
          />
          <Button onClick={handleAddPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

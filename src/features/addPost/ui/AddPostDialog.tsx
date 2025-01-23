import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
import { CreatePostParams } from "../../../entities/post/api/postApi"
import { useAddPost } from "../model/useAddPost"

export const AddPostDialog = () => {
  const [newPost, setNewPost] = useState<CreatePostParams["body"]>({ title: "", body: "", userId: 1 })

  const { onAddPost } = useAddPost()

  const handleAddPost = () => {
    onAddPost(newPost, {
      onSuccess: () => {
        alert("게시물 추가 성공")
      },
      onError: (error) => {
        alert("게시물 추가 오류:" + error.message)
      },
      onSettled: () => {
        setNewPost({ title: "", body: "", userId: 1 })
      },
    })
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>

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

          <DialogClose>
            <Button onClick={handleAddPost}>게시물 추가</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

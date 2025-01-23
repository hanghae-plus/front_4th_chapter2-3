import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { CreatePostParams } from "../../../entities/post/api/postApi"
import { useCreatePost } from "../../../entities/post/api/hooks/usePostQueries"
import { PostForm } from "../../../entities/post/ui/PostForm"

export const AddPostDialog = () => {
  const [newPost, setNewPost] = useState<CreatePostParams["body"]>({ title: "", body: "", userId: 1 })

  const { mutate: createPost } = useCreatePost({
    onSuccess: () => {
      alert("게시물 추가 성공")
    },
    onError: (error) => {
      alert("게시물 추가 오류:" + error)
    },
  })

  const addPost = async () => {
    await createPost(newPost)
    setNewPost({ title: "", body: "", userId: 1 })
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

        <div>
          <PostForm post={newPost} onChange={setNewPost} />

          <DialogClose>
            <Button onClick={addPost}>게시물 추가</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

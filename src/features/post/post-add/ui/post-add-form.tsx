import { Post } from "@/entities/posts"
import { Button, Input, Textarea } from "@/shared"
import { Loader } from "lucide-react"
import { useState } from "react"
import { useMutationAddPost } from "../model/use-mutation-add-post"

interface PostAddFormProps {
  setOpen: (open: boolean) => void
}

function PostAddForm(props: PostAddFormProps) {
  const { setOpen } = props

  const [newPost, setNewPost] = useState<Post>({
    id: 0,
    title: "",
    body: "",
    userId: 0,
  })
  const { addPostMutation, isPending } = useMutationAddPost({ setOpen, newPost })

  return (
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

      <Button onClick={() => addPostMutation()} disabled={isPending}>
        {isPending ? <Loader className="w-3 h-3 animate-spin" /> : "게시물 추가"}
      </Button>
    </div>
  )
}

export { PostAddForm }

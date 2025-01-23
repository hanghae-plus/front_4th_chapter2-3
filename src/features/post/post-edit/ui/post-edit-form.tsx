import { Post } from "@/entities/posts"

import { Button, Input, Textarea } from "@/shared"
import { DialogClose } from "@radix-ui/react-dialog"
import { useState } from "react"
import { useMutationUpdatePost } from "../model/use-mutation-update-post"

interface PostEditFormProps {
  post?: Post
}

function PostEditForm(props: PostEditFormProps) {
  const { post } = props
  const [title, setTitle] = useState(post?.title || "")
  const [body, setBody] = useState(post?.body || "")

  const { updatePostMutation, isPending } = useMutationUpdatePost({ post, title, body })

  return (
    <div className="space-y-4">
      <Input placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Textarea rows={15} placeholder="내용" value={body} onChange={(e) => setBody(e.target.value)} />
      <DialogClose asChild>
        <Button onClick={() => updatePostMutation()} disabled={isPending}>
          게시물 업데이트
        </Button>
      </DialogClose>
    </div>
  )
}

export { PostEditForm }

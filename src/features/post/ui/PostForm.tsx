import { Post } from "../../../entities/post/model/type"
import { Input } from "../../../shared/ui/Input/ui"
import { Textarea } from "../../../shared/ui/Textarea/ui"
import { Button } from "../../../shared/ui/Button/ui"
import { useForm } from "../../../shared/model/useForm"
import { useEffect } from "react"
import { PostFormValues } from "../../../features/post/model/type"

interface PostFormProps {
  posts?: Post
  onSubmit: (form: PostFormValues) => void
}

function PostForm(props: PostFormProps) {
  const { posts, onSubmit } = props

  const isCreate = !posts

  const { values, handleChange, handleSubmit, setValue } = useForm<PostFormValues>({
    initialValues: {
      title: "",
      body: "",
      userId: 1,
    },
    onSubmit,
  })

  useEffect(() => {
    if (posts) {
      setValue("title", posts.title)
      setValue("body", posts.body)
      setValue("userId", posts.userId)
    }
  }, [posts])

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4 pt-5">
        <Input placeholder="제목" name="title" value={values.title} onChange={handleChange} />
        <Textarea name="body" rows={30} placeholder="내용" value={values.body} onChange={handleChange} />
        <Input
          name="userId"
          type="number"
          placeholder="사용자 ID"
          value={values.userId}
          onChange={handleChange}
          disabled={!isCreate}
        />
        <Button type="submit">{isCreate ? "게시물 추가" : "게시물 업데이트"}</Button>
      </div>
    </form>
  )
}

export default PostForm

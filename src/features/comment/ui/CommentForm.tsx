import { Textarea } from "../../../shared/ui/Textarea/ui"
import { Button } from "../../../shared/ui/Button/ui"
import { Comment } from "../../../entities/comment/model/type"
import { useForm } from "../../../shared/model/useForm"
import { useEffect } from "react"
import { CommentFormValues } from "../../../features/comment/model/type"

interface CommentFormProps {
  comment?: Comment
  onSubmit: (form: CommentFormValues) => void
}

function CommentForm(props: CommentFormProps) {
  const { comment, onSubmit } = props

  const isCreate = !comment

  const { values, handleChange, handleSubmit, setValue } = useForm<CommentFormValues>({
    initialValues: {
      body: "",
      id: comment?.id,
    },
    onSubmit,
  })

  useEffect(() => {
    if (comment) {
      setValue("body", comment.body)
    }
  }, [comment])

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Textarea placeholder="댓글 내용" name="body" value={values.body} onChange={handleChange} />
        <Button type="submit">{isCreate ? "댓글 추가" : "댓글 업데이트"}</Button>
      </div>
    </form>
  )
}

export default CommentForm

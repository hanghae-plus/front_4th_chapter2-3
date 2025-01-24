import { Button } from "@shared/ui"
import { PostForm } from "@features/post/ui"

interface PostFormContainerProps {
  isEdit: boolean
  title: string
  body: string
  onTitleChange: (title: string) => void
  onBodyChange: (body: string) => void
  onSubmit: () => void
}

export const PostFormContainer = ({
  isEdit,
  title,
  body,
  onTitleChange,
  onBodyChange,
  onSubmit,
}: PostFormContainerProps) => {
  return (
    <>
      <PostForm title={title} body={body} onTitleChange={onTitleChange} onBodyChange={onBodyChange} />
      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={onSubmit}>{isEdit ? "게시물 업데이트" : "게시물 추가"}</Button>
      </div>
    </>
  )
}

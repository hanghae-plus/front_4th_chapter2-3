import { Post } from "../../../entities/post/model/type"
import { highlightText } from "../../../shared/ui/highlightText"
import { useSearchStore } from "../../../shared/model/useSearchStore"
import CommentList from "../../../features/comment/ui/CommentList"

interface PostDetailProps {
  post?: Post
}

function PostDetail(props: PostDetailProps) {
  const { post } = props
  const { search } = useSearchStore()

  return (
    <div className="space-y-4">
      <p>{highlightText(post?.body || "", search)}</p>
      <CommentList post={post!} />
    </div>
  )
}

export default PostDetail

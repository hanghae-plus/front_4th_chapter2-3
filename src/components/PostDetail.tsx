import { Post } from "../entities/post/model/type"
import { highlightText } from "../util/highlightText"
import { useSearchStore } from "../shared/model/useSearchStore"
import CommentList from "./CommentList"

interface PostDetailProps {
  post?: Post
}

function PostDetail(props: PostDetailProps) {
  const { post } = props
  const { search } = useSearchStore()

  return (
    <div className="space-y-4">
      <p>{highlightText(post?.body || "", search)}</p>
      <CommentList postId={post?.id!} />
    </div>
  )
}

export default PostDetail

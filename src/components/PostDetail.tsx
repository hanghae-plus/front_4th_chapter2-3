import { Post } from "../entities/post/model/type"
import { highlightText } from "../util/highlightText"
import { useSearchStore } from "../shared/model/useSearchStore"

interface PostDetailProps {
  post?: Post
}

function PostDetail(props: PostDetailProps) {
  const { post } = props
  const { search } = useSearchStore()

  return (
    <div className="space-y-4">
      <p>{highlightText(post?.body || "", search)}</p>
      {/* {post?.id !== undefined && renderComments(selectedPost.id)} */}
      {post?.id !== undefined && <>댓글</>}
    </div>
  )
}

export default PostDetail

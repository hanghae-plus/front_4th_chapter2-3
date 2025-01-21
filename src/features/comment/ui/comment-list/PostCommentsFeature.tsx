import { Comment } from "@entities/comment/model"
import { Post } from "@entities/post/model"
import { CommentsList } from "@features/comment/ui"

interface PostCommentsFeatureProps {
  post: Post | null
  comments: Comment[]
  onAddComment: () => void
  onEditComment: (comment: Comment) => void
  onDeleteComment: (id: number, postId: number) => void
  onLikeComment: (id: number, postId: number) => void
}

export const PostCommentsFeature = ({
  post,
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
}: PostCommentsFeatureProps) => {
  return (
    <div className="space-y-4">
      <p>{post?.body}</p>
      {post?.id && (
        <CommentsList
          postId={post.id}
          comments={comments}
          onAddClick={onAddComment}
          onLike={onLikeComment}
          onEdit={onEditComment}
          onDelete={onDeleteComment}
        />
      )}
    </div>
  )
}

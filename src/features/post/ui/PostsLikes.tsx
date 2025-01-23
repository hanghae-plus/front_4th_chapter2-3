import { ThumbsDown, ThumbsUp } from "lucide-react"
import { PostItem } from "../../../entities/post";

interface PostsLikesProps {
  post: PostItem;
}

export const PostsLikes = ({ post }: PostsLikesProps) => {
  return (
    <div className="flex items-center gap-2">
      <ThumbsUp className="w-4 h-4" />
      <span>{post.reactions?.likes || 0}</span>
      <ThumbsDown className="w-4 h-4" />
      <span>{post.reactions?.dislikes || 0}</span>
    </div>
  )
}
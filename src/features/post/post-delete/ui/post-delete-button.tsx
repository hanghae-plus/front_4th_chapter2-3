import { usePostStore } from "@/entities/posts"
import { Button } from "@/shared"
import { Trash2 } from "lucide-react"
import { deletePost } from "../api/delete-post"

interface PostDeleteButtonProps {
  postId?: number
}

function PostDeleteButton(props: PostDeleteButtonProps) {
  const { postId } = props
  const { posts, setPosts } = usePostStore()
  console.log("🚀 ~ PostDeleteButton ~ posts:", posts)

  const handleDeletePost = async () => {
    if (!postId) return
    await deletePost(postId)
    setPosts(posts.filter((post) => post.id !== postId))
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleDeletePost}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}

export { PostDeleteButton }

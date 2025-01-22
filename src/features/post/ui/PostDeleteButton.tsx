import { Trash2 } from "lucide-react"

import { Button } from "../../../shared/ui"

interface PostDeleteButtonProps {
  postId: number
}

export const PostDeleteButton = ({ postId }: PostDeleteButtonProps) => {
  const deletePost = async (postId: number) => {}

  //   const deletePost = async (id) => {
  //     try {
  //       await fetch(`/api/posts/${id}`, {
  //         method: "DELETE",
  //       })
  //       setPosts(posts.filter((post) => post.id !== id))
  //     } catch (error) {
  //       console.error("게시물 삭제 오류:", error)
  //     }
  //   }

  return (
    <Button variant="ghost" size="sm" onClick={() => deletePost(postId)}>
      {/* <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}> */}
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}

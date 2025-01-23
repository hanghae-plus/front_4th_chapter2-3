import { usePostStore } from "@/entities/posts"
import { Button, Input, Textarea } from "@/shared"
import { updatePost } from "../api/update-post"

function PostEditForm() {
  const { selectedPost, setSelectedPost, posts, setPosts } = usePostStore()

  const handleSubmit = async () => {
    if (!selectedPost) return
    const response = await updatePost({ selectedPost })
    setPosts(posts.map((post) => (post.id === response.id ? response : post)))
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="제목"
        value={selectedPost?.title || ""}
        onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
      />
      <Textarea
        rows={15}
        placeholder="내용"
        value={selectedPost?.body || ""}
        onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
      />
      <Button onClick={handleSubmit}>게시물 업데이트</Button>
    </div>
  )
}

export { PostEditForm }

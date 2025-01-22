import { Button } from "../../../shared/ui"

export const PostAddButton = () => {
  const addPost = () => {}

  // TODO: 추후 내부 엔티티들은 전역 상태로 관리하고 API 로직은 React Query로 추출
  //   const addPost = async () => {
  //     try {
  //       const response = await fetch("/api/posts/add", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(newPost),
  //       })
  //       const data = await response.json()
  //       setPosts([data, ...posts])
  //       setShowAddDialog(false)
  //       setNewPost({ title: "", body: "", userId: 1 })
  //     } catch (error) {
  //       console.error("게시물 추가 오류:", error)
  //     }
  //   }

  return <Button onClick={addPost}>게시물 추가</Button>
}

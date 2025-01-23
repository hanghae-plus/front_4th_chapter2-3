import { Button } from "../../../shared/ui"

export const PostAddButton = () => {
  // TODO: 추후 내부 엔티티들은 전역 상태로 관리하고 API 로직은 React Query로 추출
  const handleAddPostButtonClick = async () => {
    try {
      // TODO: NewPost를 파라미터로 전달
      // const response = addPost()
      // setPosts([data, ...posts])
      // setShowAddDialog(false)
      // setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  return <Button onClick={handleAddPostButtonClick}>게시물 추가</Button>
}

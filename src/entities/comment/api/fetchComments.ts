import type { Comment } from "../model/types/comments"

export const fetchComments = async (postId: number): Promise<Comment[] | undefined> => {
  // TODO: 사용하는 곳에서 처리
  //   if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음

  try {
    const response = await fetch(`/api/comments/post/${postId}`)
    const data = await response.json()
    return data

    // TODO: 사용하는 곳에서 처리
    // setComments((prev) => ({ ...prev, [postId]: data.comments }))
  } catch (error) {
    console.error("댓글 가져오기 오류:", error)
  }
}

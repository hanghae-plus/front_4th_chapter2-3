import { User } from "../../user/model/type"

//댓글 조회
export interface getCommentsResponse {
  limit: number
  total: number
  skip: number
  comments: Comment[]
}

export interface Comment {
  body: string
  id: number
  likes: number
  postId: number
  user: User
}

//댓글 추가
export interface postCommentsRequest {
  body: string
  postId: number
  userId: number
}

//댓글 업데이트
export interface putCommentsRequest {
  body: string
}

//댓글 좋아요
export interface patchCommentsLikeRequest {
  likes: number
}

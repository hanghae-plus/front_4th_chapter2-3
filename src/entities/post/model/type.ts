// 게시물 조회
export interface getPostRequest {
  limit: number
  skip: number
}

export interface getPostResponse {
  limit: number
  skip: number
  total: number
  posts: Post[]
}

interface Reactions {
  likes: number
  dislikes: number
}

export interface Post {
  body: string
  id: number
  title: string
  userId: number
  views: number
  reactions: Reactions
  tags: string[]
}

// 게시물 검색
export interface getSearchPostsRequest {
  q: string
}

export interface getSearchPostsResponse {
  limit: number
  skip: number
  totla: number
  posts: Post[]
}

// 게시물 등록
export interface postPostsRequest {
  body: string
  title: string
  userId: number
}

//게시물 업데이트
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface putPostsRequest extends Post {}

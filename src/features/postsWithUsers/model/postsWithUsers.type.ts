import { PostType } from "../../../entities/post/model"
import { UserType } from "../../../entities/user/model"

export interface PostWithUsers extends PostType {
  author?: UserType
}

export interface PostsWithUsersResponse {
  posts: PostWithUsers[] | undefined
  skip: number
  limit: number
  total: number
}

export interface PostsWithUsersQueryResponse {
  postsResponse: PostsWithUsersResponse | undefined
  isLoading: boolean
  error: Error | null
}

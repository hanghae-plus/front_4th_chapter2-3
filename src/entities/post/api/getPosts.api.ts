import axios from "axios"
import { PostDTO } from "../model/types"

interface GetPostsApiParams {
  limit: number
  skip: number
}

const getPostsApi = ({ limit, skip }: GetPostsApiParams) =>
  axios
    .get<{ posts: PostDTO[] }>(`/api/posts?limit=${limit}&skip=${skip}`)
    .then((res) => res.data.posts)

export { getPostsApi }

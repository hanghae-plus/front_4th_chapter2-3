import axios, { AxiosResponse } from "axios"
import { NewPost, Post } from "../model/types"

const addPostApi = (post: NewPost) =>
  axios.post<NewPost, AxiosResponse<NewPost & { id: Post["id"] }>>("/api/posts/add", post).then((res) => res.data)

export { addPostApi }

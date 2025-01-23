import axios from "axios"
import { Post } from "../model/types"

const updatePostApi = (post: Post) =>
  axios.put<Post>(`/api/posts/${post.id}`, post).then((res) => res.data)

export { updatePostApi }

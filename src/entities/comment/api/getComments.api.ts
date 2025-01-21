import axios from "axios"
import { Post } from "../../post/model/types"
import { Comment, PostComments } from "../model/types"

const getCommentsApi = (postId: Post["id"]): Promise<PostComments> => {
  return axios
    .get<{ limit: number; total: number; comments: Comment[] }>(`/api/comments/post/${postId}`)
    .then((response) => {
      return { [postId]: response.data.comments }
    })
}

export { getCommentsApi }

import axios from "axios"
import { Comment } from "../model/types"

const updateCommentApi = (comment: Comment) =>
  axios
    .put<Comment>(`/api/comments/${comment.id}`, comment.body)
    .then((res) => res.data)

export { updateCommentApi }

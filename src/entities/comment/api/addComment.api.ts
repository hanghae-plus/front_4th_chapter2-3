import axios, { AxiosResponse } from "axios"
import { Comment, NewComment } from "../model/types"

const addCommentApi = (comment: NewComment): Promise<Comment> =>
  axios
    .post<NewComment, AxiosResponse<Comment>>("/api/comments/add", {
      ...comment,
    })
    .then((response) => {
      return response.data
    })

export { addCommentApi }

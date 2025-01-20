import axios from "axios"
import { Post } from "../model/types"

export const PostApi = {
  getPosts: async (limit: number, skip: number): Promise<Post[]> => {
    const { data } = await axios.get(`/posts?limit=${limit}&skip=${skip}`)
    return data
  },
}

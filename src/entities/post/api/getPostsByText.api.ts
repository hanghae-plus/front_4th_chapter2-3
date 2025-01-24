import axios from "axios"
import { Post } from "../model/types"

const getPostsByTextApi = async (text: string) =>
  axios
    .get<{ posts: Post[]; total: number }>(`/api/posts/search?q=${text}`)
    .then((res) => res.data)

export { getPostsByTextApi }

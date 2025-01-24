import axios from "axios"
import { User } from "../model/types"

const getUsersApi = () =>
  axios
    .get<{ users: User[] }>("/api/users?limit=0&select=username,image")
    .then((res) => res.data.users)

export { getUsersApi }

import { User } from "../../user/model/types"

export interface Comment {
	id: number
	user: User
	body: string
	likes: number
}

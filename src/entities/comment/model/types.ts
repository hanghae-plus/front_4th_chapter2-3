import { UserType } from "../../user/model/types"

export interface CommentType {
	id: number
	user: UserType
	body: string
	likes: number
}

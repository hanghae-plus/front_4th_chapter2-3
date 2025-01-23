export interface UserInfoType {
  id: number
	firstName: string
  username: string
	age: number
	email: string
	phone: string
	address: string
	compony: string
  image: string
}

export interface UserType {
  users: UserInfoType[];
	total: number;
	skip: number;
	limit: number;
}
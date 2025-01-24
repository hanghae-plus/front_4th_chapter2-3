export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags?: string[];
  reactions?: {
    likes: number;
    dislikes: number;
  };
  author?: UserThumbnail;
}

export interface Comment {
  id: number;
  body: string;
  postId: number;
  userId: number;
  user: UserThumbnail;
  likes?: number;
}

export interface UserThumbnail {
  id: number;
  username: string;
  image: string;
}

export interface User extends UserThumbnail {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  address?: {
    address: string;
    city: string;
    state: string;
  };
  company?: {
    name: string;
    title: string;
  };
}

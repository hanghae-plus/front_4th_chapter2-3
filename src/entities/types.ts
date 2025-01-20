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
  author?: User;
}

export interface PostFilters {
  search: string;
  tag: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface PaginationParams {
  skip: number;
  limit: number;
}

export interface Comment {
  id: number;
  body: string;
  postId: number;
  userId: number;
  user: User;
  likes: number;
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  image: string;
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
import { User } from "@entities/user";

export type SortBy = "id" | "title" | "reactions";
export type SortOrder = "asc" | "desc";

export interface PostSearchParams {
  skip?: number;
  limit?: number;
  searchQuery?: string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  selectedTag?: string;
}

export interface PostsRequestDto {
  limit?: number;
  skip?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}

export interface PostsResponseDto {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
}

export type NewPost = Pick<Post, "userId" | "title" | "body">;

export interface PostWithUser extends Post {
  author?: User | null;
}

export interface Reaction {
  likes: number;
  dislikes: number;
}

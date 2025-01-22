import { Dispatch, SetStateAction } from "react";

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
export interface PostApiResponse {
  posts: Post[];
  total: number;
}

export interface PostFilters {
  search: string;
  tag: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
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

export interface PostFormState {
  title: string;
  body: string;
  tags?: string[];
  userId: number;
}

export interface PostManagementState {
  selectedPost: Post | null;
  selectedUser: User | null;
  isAddDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isDetailDialogOpen: boolean;
  isUserModalOpen: boolean;
}

export type PostManagementAction =
  | { type: "SET_SELECTED_POST"; payload: Post | null }
  | { type: "SET_ADD_DIALOG_OPEN"; payload: boolean }
  | { type: "SET_EDIT_DIALOG_OPEN"; payload: boolean }
  | { type: "SET_DETAIL_DIALOG_OPEN"; payload: boolean }
  | { type: "SET_USER_MODAL_OPEN"; payload: boolean }
  | { type: "SET_SELECTED_USER"; payload: User | null }
  
export interface CommentFormState {
  body: string;
  postId: number;
  userId: number;
}

export interface CommentManagementState {
  selectedComment: Comment | null;
  isAddDialogOpen: boolean;
  isEditDialogOpen: boolean;
}

export type CommentManagementAction =
  | { type: "SET_SELECTED_COMMENT"; payload: Comment | null }
  | { type: "SET_ADD_DIALOG_OPEN"; payload: boolean }
  | { type: "SET_EDIT_DIALOG_OPEN"; payload: boolean };

export type SearchTag = string;
export type SortBy = "none" | "id" | "title" | "reactions";
export type SortOrder = "asc" | "desc";

export interface PostFiltersProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedTag: SearchTag;
  setSelectedTag: Dispatch<SetStateAction<SearchTag>>;
  sortBy: SortBy;
  setSortBy: (value: SortBy) => void;
  sortOrder: SortOrder;
  setSortOrder: (value: SortOrder) => void;
  tags: { slug: string; url: string }[];
  updateURL: () => void;
}

export interface DashboardContentProps {
  posts: Post[];
  loading: boolean;
  total: number;
}

export interface PostPaginationProps {
  total: number;
  skip: number;
  limit: number;
  onLimitChange: (value: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}
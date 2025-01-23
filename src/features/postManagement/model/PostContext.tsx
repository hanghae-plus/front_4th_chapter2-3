import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Post, User } from "../../../entities/types";

interface PostState {
  posts: Post[];
  total: number;
  loading: boolean;
  selectedPost: Post | null;
  selectedUser: User | null;
  comments: Comment[];
  skip: number;
  limit: number;
  searchQuery: string;
  selectedTag: string;
  sortBy: "none" | "id" | "title" | "reactions";
  sortOrder: "asc" | "desc";
}

type PostAction = 
| { type: "SET_POSTS"; payload: Post[] }
| { type: "SET_TOTAL"; payload: number }
| { type: "SET_LOADING"; payload: boolean }
| { type: "SET_SELECTED_POST"; payload: Post | null }
| { type: "SET_SELECTED_USER"; payload: User | null }
| { type: "SET_COMMENTS"; payload: Comment[] }
| { type: "SET_SEARCH_QUERY"; payload: string }
| { type: "SET_SELECTED_TAG"; payload: string }
| { type: "SET_SKIP"; payload: number }
| { type: "SET_LIMIT"; payload: number }
| { type: "SET_SORT_BY"; payload: PostState["sortBy"] }
| { type: "SET_SORT_ORDER"; payload: PostState["sortOrder"] }
| { type: "SET_EDIT_DIALOG_OPEN"; payload: boolean }
| { type: "SET_DETAIL_DIALOG_OPEN"; payload: boolean }
| { type: "SET_USER_MODAL_OPEN"; payload: boolean }

const initialState: PostState = {
  posts: [],
  total: 0,
  loading: false,
  selectedPost: null,
  selectedUser: null,
  comments: [],
  skip: 0,
  limit: 10,
  searchQuery: "",
  selectedTag: "",
  sortBy: "none",
  sortOrder: "asc",
};

const postReducer = (state: PostState, action: PostAction): PostState => {
  switch (action.type) {
    case "SET_POSTS":
      return { ...state, posts: action.payload };
    case "SET_TOTAL":
      return { ...state, total: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_SELECTED_POST":
      return { ...state, selectedPost: action.payload };
    case "SET_SELECTED_USER":
      return { ...state, selectedUser: action.payload };
    case "SET_COMMENTS":
      return { ...state, comments: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_SELECTED_TAG":
      return { ...state, selectedTag: action.payload };
    case "SET_SKIP":
      return { ...state, skip: action.payload };
    case "SET_LIMIT":
      return { ...state, limit: action.payload };
    case "SET_SORT_BY":
      return { ...state, sortBy: action.payload };
    case "SET_SORT_ORDER":
      return { ...state, sortOrder: action.payload };
    default:
      return state;
  }
};

const PostContext = createContext<{
  state: PostState;
  dispatch: React.Dispatch<PostAction>;
}>({
  state: initialState,
  dispatch: () => null
});

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
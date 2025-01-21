import React, { 
  createContext, 
  useContext, 
  useReducer, 
  ReactNode 
} from "react";

import { 
  PostManagementState, 
  PostManagementAction 
} from "../../../entities/types";

const initialState: PostManagementState = {
  selectedPost: null,
  isAddDialogOpen: false,
  isEditDialogOpen: false,
  isDetailDialogOpen: false,
};

const postManagementReducer = (
  state: PostManagementState,
  action: PostManagementAction
): PostManagementState => {
  switch (action.type) {
    case "SET_SELECTED_POST":
      return { ...state, selectedPost: action.payload };
    case "SET_ADD_DIALOG_OPEN":
      return { ...state, isAddDialogOpen: action.payload };
    case "SET_EDIT_DIALOG_OPEN":
      return { ...state, isEditDialogOpen: action.payload };
    case "SET_DETAIL_DIALOG_OPEN":
      return { ...state, isDetailDialogOpen: action.payload };
    default:
      return state;
  }
};

const PostManagementContext = createContext<{
  state: PostManagementState;
  dispatch: React.Dispatch<PostManagementAction>;
} | null>(null);

export const PostManagementProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(postManagementReducer, initialState);

  return (
    <PostManagementContext.Provider value={{ state, dispatch }}>
      {children}
    </PostManagementContext.Provider>
  );
};

export const usePostManagement = () => {
  const context = useContext(PostManagementContext);
  if (!context) {
    throw new Error("usePostManagement must be used within a PostManagementProvider");
  }
  return context;
};

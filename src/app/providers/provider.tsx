import React, { createContext, useContext, useReducer } from "react";
import { Post, Comment, User } from "../../entities/types"

// State 타입 정의
interface StoreState {
  posts: {
    items: Post[];
    total: number;
    loading: boolean;
    error: string | null;
  };
  comments: {
    byPostId: Record<number, Comment[]>;
    loading: boolean;
    error: string | null;
  };
  users: {
    items: User[];
    loading: boolean;
    error: string | null;
  };
}

// Action 타입 정의
type Action =
  | { type: 'SET_POSTS'; payload: { items: Post[]; total: number } }
  | { type: 'SET_POSTS_LOADING'; payload: boolean }
  | { type: 'SET_POSTS_ERROR'; payload: string }
  | { type: 'SET_COMMENTS'; payload: { postId: number; comments: Comment[] } }
  | { type: 'SET_COMMENTS_LOADING'; payload: boolean }
  | { type: 'SET_COMMENTS_ERROR'; payload: string }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'SET_USERS_LOADING'; payload: boolean }
  | { type: 'SET_USERS_ERROR'; payload: string };

// Context 타입 정의
interface StoreContextType {
  state: StoreState;
  dispatch: React.Dispatch<Action>;
}

// 초기 상태
const initialState: StoreState = {
  posts: {
    items: [],
    total: 0,
    loading: false,
    error: null,
  },
  comments: {
    byPostId: {},
    loading: false,
    error: null,
  },
  users: {
    items: [],
    loading: false,
    error: null,
  },
};

// Context 생성
const StoreContext = createContext<StoreContextType | null>(null);

// Reducer 함수
const storeReducer = (state: StoreState, action: Action): StoreState => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: {
          ...state.posts,
          items: action.payload.items,
          total: action.payload.total,
        },
      };
    case 'SET_POSTS_LOADING':
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: action.payload,
        },
      };
    case 'SET_POSTS_ERROR':
      return {
        ...state,
        posts: {
          ...state.posts,
          error: action.payload,
        },
      };
    case 'SET_COMMENTS':
      return {
        ...state,
        comments: {
          ...state.comments,
          byPostId: {
            ...state.comments.byPostId,
            [action.payload.postId]: action.payload.comments,
          },
        },
      };
    case 'SET_COMMENTS_LOADING':
      return {
        ...state,
        comments: {
          ...state.comments,
          loading: action.payload,
        },
      };
    case 'SET_COMMENTS_ERROR':
      return {
        ...state,
        comments: {
          ...state.comments,
          error: action.payload,
        },
      };
    case 'SET_USERS':
      return {
        ...state,
        users: {
          ...state.users,
          items: action.payload,
        },
      };
    case 'SET_USERS_LOADING':
      return {
        ...state,
        users: {
          ...state.users,
          loading: action.payload,
        },
      };
    case 'SET_USERS_ERROR':
      return {
        ...state,
        users: {
          ...state.users,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

// Provider 컴포넌트
interface StoreProviderProps {
  children: React.ReactElement;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

// 커스텀 훅
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
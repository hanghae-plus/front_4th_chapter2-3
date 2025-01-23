// 댓글 타입
export interface CommentType {
  id: number;
  body: string;
  postId?: number;
  likes: number;

  userId: number;
  user: {
    id: number;
    username: string;
  };
}

// 댓글 목록 컴포넌트 타입
export interface CommentListProps {
  postId: number;
  searchQuery?: string;
}

// 댓글 데이터 타입
export interface CommentDataType {
  comment: CommentType;
  isEdit: boolean;
}

// 댓글 아이템 컴포넌트 타입
export interface CommentItemProps {
  comment: CommentType;
  postId: number;
  searchQuery?: string;
}

// 댓글 스토어 상태 타입
export interface CommentStoreStateType {
  comments: Record<number, CommentType[]>;
  selectedComment: CommentType | null;
  isCommentFormOpen: boolean;
  setComments: (postId: number, comments: CommentType[]) => void;
  setSelectedComment: (comment: CommentType | null) => void;
  setIsCommentFormOpen: (isOpen: boolean) => void;
  addComment: (postId: number, comment: CommentType) => void;
  updateComment: (postId: number, comment: CommentType) => void;
  deleteComment: (postId: number, commentId: number) => void;
  likeComment: (postId: number, commentId: number) => void;
}

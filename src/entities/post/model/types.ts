import type { User } from 'src/entities/user';

export interface Reactions {
  likes: number;
  dislikes: number;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  reactions?: Reactions;
  tags: string[];
  author?: User;
}

// store 관련 타입들
export interface PostState {
  selectedPost: Post | null; // 현재 선택된 게시물
  isEditing: boolean; // 수정 모드 여부
}

export interface PostActions {
  // CRUD actions
  selectPost: (post: Post | null) => void;
  setIsEditing: (isEditing: boolean) => void;
  updatePost: (post: Post) => void;
  deletePost: (postId: number) => Promise<void>;

  // 게시물 반응 관련
  updateReactions: (postId: number, reactions: Reactions) => void;
}

export interface PostStore extends PostState, PostActions {}

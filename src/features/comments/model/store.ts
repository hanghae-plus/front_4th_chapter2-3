import { create } from 'zustand';
import { Comment } from '../../../shared/types';
import { getComments } from '../api/comment';

interface CommentStore {
  // 상태
  comments: Record<number, Comment[]>;

  // 액션
  setComments: (updater: (prev: Record<number, Comment[]>) => Record<number, Comment[]>) => void;
  fetchComments: (postId: number) => Promise<void>;
}

export const useCommentStore = create<CommentStore>((set, get) => ({
  // 초기 상태
  comments: {},

  // 액션 구현
  setComments: (updater) =>
    set((state) => ({
      comments: updater(state.comments),
    })),

  fetchComments: async (postId) => {
    const { comments } = get();
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음

    try {
      const data = await getComments(postId);

      set((state) => ({
        comments: { ...state.comments, [postId]: data.comments },
      }));
    } catch (error) {
      console.error('댓글 가져오기 오류:', error);
    }
  },
}));

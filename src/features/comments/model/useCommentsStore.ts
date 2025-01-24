import type { Comment } from '@/entities/comments/model';
import { get as fetchGet } from '@/shared/api/fetch';
import { createStoreSelector } from '@/shared/lib';
import { create } from 'zustand';

export const useCommentsStore = create<{
  comments: Record<number, Comment[]>;
  setComments: (
    updateFn: (prevComments: Record<number, Comment[]>) => Record<number, Comment[]>,
  ) => void;
  fetchComments: (postId: number) => void;
}>((set, get) => ({
  comments: {},
  setComments: (updateFn) =>
    set((state) => ({
      comments: updateFn(state.comments),
    })),
  fetchComments: async (postId: number) => {
    const { comments, setComments } = get();

    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const data = await fetchGet(`/api/comments/post/${postId}`);
      setComments((prev) => ({ ...prev, [postId]: data.comments }));
    } catch (error) {
      console.error('댓글 가져오기 오류:', error);
    }
  },
}));

export const useCommentsStoreSelector = createStoreSelector(useCommentsStore);

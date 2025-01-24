import { atom } from 'jotai';
import { Comment } from '../../../shared/api/types';

export interface CommentsState {
  byPost: Record<number, Comment[]>;
  selectedComment: Comment | null;
  dialogs: {
    add: boolean;
    edit: boolean;
  };
}

const initialCommentsState: CommentsState = {
  byPost: {},
  selectedComment: null,
  dialogs: {
    add: false,
    edit: false,
  },
};

export const commentsAtom = atom<CommentsState>(initialCommentsState);

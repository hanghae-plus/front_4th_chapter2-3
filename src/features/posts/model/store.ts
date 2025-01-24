import { atom } from 'jotai';
import { Post } from '../../../shared/api/types';

export interface PostsState {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  pagination: {
    skip: number;
    limit: number;
    total: number;
  };
  filters: {
    search: string;
    tag: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };
  dialogs: {
    add: boolean;
    edit: boolean;
    detail: boolean;
  };
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  loading: false,
  pagination: {
    skip: 0,
    limit: 10,
    total: 0,
  },
  filters: {
    search: '',
    tag: '',
    sortBy: '',
    sortOrder: 'asc',
  },
  dialogs: {
    add: false,
    edit: false,
    detail: false,
  },
};

export const postsAtom = atom<PostsState>(initialState);

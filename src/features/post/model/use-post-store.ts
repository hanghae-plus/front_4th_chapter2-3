import { StateCreator } from 'zustand/vanilla';
import { create } from 'zustand/react';
import { createStoreSelector } from '../../../shared/lib';
import { NewPost, Post } from '../../../entities/post/model';
import { initNewPost } from '../../../entities/post/config/init-data.ts';

interface State {
  posts: Post[];
  selectedPost: Post | null;
  newPost: NewPost;
  showAddDialog: boolean;
  showEditDialog: boolean;
  showPostDetailDialog: boolean;
  loading: boolean;
}
//(update: ((prev: NewPost) => NewPost) | NewPost) => void;
interface Action {
  setPosts: (posts: ((prev: Post[]) => Post[]) | Post[]) => void;
  setSelectedPost: (post: Post | null) => void;
  setNewPost: (update: ((prev: NewPost) => NewPost) | NewPost) => void;
  setShowAddDialog: (show: boolean) => void;
  setShowEditDialog: (show: boolean) => void;
  setShowPostDetailDialog: (show: boolean) => void;
  setLoading: (loading: boolean) => void;
}

type PostStoreProps = State & Action;

const usePostStoreCreator: StateCreator<PostStoreProps> = (set) => ({
  posts: [],
  selectedPost: null,
  newPost: initNewPost,
  showAddDialog: false,
  showEditDialog: false,
  showPostDetailDialog: false,
  loading: false,
  setPosts: (update) =>
    set((state) => ({ posts: typeof update === 'function' ? update(state.posts) : update })),
  setSelectedPost: (post) => set({ selectedPost: post }),
  setNewPost: (update) =>
    set((state) => ({
      newPost: typeof update === 'function' ? update(state.newPost) : update,
    })),
  setShowAddDialog: (show) => set({ showAddDialog: show }),
  setShowEditDialog: (show) => set({ showEditDialog: show }),
  setShowPostDetailDialog: (show) => set({ showPostDetailDialog: show }),
  setLoading: (loading) => set({ loading }),
});

const postStore = create(usePostStoreCreator);

const usePostStore = createStoreSelector(postStore);
export default usePostStore;

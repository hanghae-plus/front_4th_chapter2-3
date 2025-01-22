import { StateCreator } from 'zustand/vanilla';
import { create } from 'zustand/react';
import { createStoreSelector } from '../../../shared/model';
import { NewPost, Post } from '../../../entities/post/model';

interface State {
  posts: Post[];
  selectedPost: Post | null;
  newPost: NewPost | null;
  showAddDialog: boolean;
  showEditDialog: boolean;
  showPostDetailDialog: boolean;
}
interface Action {
  setPosts: (posts: ((prev: Post[]) => Post[]) | Post[]) => void;
  setSelectedPost: (post: Post | null) => void;
  setNewPost: (newPost: NewPost | null) => void;
  setShowAddDialog: (show: boolean) => void;
  setShowEditDialog: (show: boolean) => void;
  setShowPostDetailDialog: (show: boolean) => void;
}

type PostStoreProps = State & Action;

const usePostStoreCreator: StateCreator<PostStoreProps> = (set) => ({
  posts: [],
  selectedPost: null,
  newPost: null,
  showAddDialog: false,
  showEditDialog: false,
  showPostDetailDialog: false,
  setPosts: (update) =>
    set((state) => ({ posts: typeof update === 'function' ? update(state.posts) : update })),
  setSelectedPost: (post) => set({ selectedPost: post }),
  setNewPost: (newPost) => set({ newPost }),
  setShowAddDialog: (show) => set({ showAddDialog: show }),
  setShowEditDialog: (show) => set({ showEditDialog: show }),
  setShowPostDetailDialog: (show) => set({ showPostDetailDialog: show }),
});

const postStore = create(usePostStoreCreator);

const usePostStore = createStoreSelector(postStore);
export default usePostStore;

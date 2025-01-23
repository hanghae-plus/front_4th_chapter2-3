// src/atoms/postsManagerAtoms.ts
import { atom } from 'jotai';
import { Post, Comment, Tag } from '../models/type';

export const postsAtom = atom<Post[]>([]);
export const commentsAtom = atom<{ [postId: number]: Comment[] }>({});
export const tagsAtom = atom<Tag[]>([]);
export const loadingAtom = atom<boolean>(false);

export const skipAtom = atom<number>(0);
export const limitAtom = atom<number>(10);
export const searchQueryAtom = atom<string>('');
export const sortByAtom = atom<string>('');
export const sortOrderAtom = atom<string>('asc');
export const selectedTagAtom = atom<string>('');

import { atom } from "jotai";
import { Post } from "../../entities/post/model/types";
import { Comment } from "../../entities/comment/model/types";
import { User } from "../../entities/user/model/types";
import { NewPostProps } from "../../entities/post/model/types";
import { Tags } from "../../entities/tag/model/types";

// 전체 게시물 개수
export const totalAtom = atom(0);

// 게시물 리스트 상태
export const postsAtom = atom<Post[]>([]);

// 현재 선택된 게시물
export const selectedPostAtom = atom<Post>({
  id: 0,
  userId: 0,
  title: "",
  body: "",
});

// 코멘트 리스트 상태
export const commentsAtom = atom<Record<number, Comment[]>>({});

// 현재 선택된 코멘트
export const selectedCommentAtom = atom<Comment>({
  body: "",
  postId: null,
  userId: 0,
  likes: 0,
});

// 현재 선택된 유저
export const selectedUserAtom = atom<User | null>(null);

// 현재 선택된 태그
export const selectedTagAtom = atom<string>("");

// 검색어
export const searchQueryAtom = atom<string>("");

// 로딩 상태
export const loadingAtom = atom<boolean>(false);

export const skipAtom = atom<number>(0);

export const limitAtom = atom<number>(10);

export const addDialogAtom = atom<boolean>(false);

export const newPostAtom = atom<NewPostProps>({
  title: "",
  body: "",
  userId: 1,
});

export const editDialogAtom = atom<boolean>(false);

// comment
export const newCommentAtom = atom<Comment>({
  body: "",
  postId: null,
  userId: 1,
});

export const addCommentDialogAtom = atom<boolean>(false);

export const editCommentDialogAtom = atom<boolean>(false);

// tag
export const tagsAtom = atom<Tags[]>([]);

//
export const sortByAtom = atom<string>("");
export const sortOrderAtom = atom<string>("asc");

// pages/lib
export const postDetailDialogAtom = atom<boolean>(false);
export const userModalAtom = atom<boolean>(false);

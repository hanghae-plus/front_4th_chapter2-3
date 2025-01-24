import { Post } from "../../types";

export const selectPostById = (posts: Post[], id: number) =>
  posts.find(post => post.id === id);

export const selectPostsByAuthor = (posts: Post[], authorId: number) =>
  posts.filter(post => post.userId === authorId);

export const selectPostsByTag = (posts: Post[], tag: string) =>
  posts.filter(post => post.tags?.includes(tag));
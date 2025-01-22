import { Post, PostResponse } from "../../../types/post.ts";

export const fetchPosts = async (): Promise<Post[]> => {
  const response: Response = await fetch("/api/posts");
  const postResponse: PostResponse = await response.json();
  return postResponse.posts;
};

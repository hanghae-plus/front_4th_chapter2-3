import { Post } from "@/types/post.ts";

interface SearchPostsResponse {
  posts: Post[];
  total: number;
}

export const searchPosts = async (query: string): Promise<SearchPostsResponse> => {
  const response = await fetch(`/api/posts/search?q=${query}`);
  if (!response.ok) {
    throw new Error("Failed to search posts.ts");
  }
  return response.json();
};

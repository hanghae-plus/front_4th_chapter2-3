import { NewPost, Post, PostsRequestDto, PostsResponseDto } from "./types";

export const getPosts = async ({ limit = 0, skip = 0 }: PostsRequestDto): Promise<PostsResponseDto> =>
  fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("게시물 가져오기 오류:", error);
    });

export const searchPosts = async (searchQuery: string): Promise<PostsResponseDto> =>
  fetch(`/api/posts/search?q=${searchQuery}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("게시물 검색 오류:", error);
    });

export const getPostsByTag = async (tag: string): Promise<PostsResponseDto> =>
  fetch(`/api/posts/tag/${tag}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("태그별 게시물 가져오기 오류:", error);
    });

export const addPost = async (newPost: NewPost): Promise<Post> =>
  fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("새 게시물 추가 오류:", error);
    });

export const updatePost = async (post: Post): Promise<Post> =>
  fetch(`/api/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("게시물 업데이트 오류:", error);
    });

export const deletePost = async (id: number) =>
  await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  }).catch((error) => {
    console.error("게시물 삭제 오류:", error);
  });

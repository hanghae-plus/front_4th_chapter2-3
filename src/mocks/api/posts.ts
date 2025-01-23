import { http, HttpResponse } from "msw";

import { AddPostProps, getPosts } from "@/entities/posts";

let { posts } = await getPosts(300, 0);

const getAllPost = http.get("/api/posts", async ({ request }) => {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit")) || 10;
  const skip = Number(url.searchParams.get("skip")) || 0;

  const paginatedPosts = posts.slice(skip, skip + limit);
  return HttpResponse.json({
    posts: paginatedPosts,
    total: posts.length,
    skip,
    limit,
  });
});

const addPost = http.post("/api/posts/add", async ({ request }) => {
  const post = (await request.json()) as AddPostProps;
  const newPost = {
    ...post,
    id: Math.max(...posts.map((post) => post.id)) + 1,
    tags: [],
    reactions: { likes: 0, dislikes: 0 },
    views: 0,
  };

  posts = [...posts, newPost];

  return HttpResponse.json(newPost);
});

const deletePost = http.delete("/api/posts/:postId", ({ params }) => {
  const { postId } = params;

  const deletedPost = posts.find((post) => post.id !== Number(postId));
  posts = posts.filter((post) => post.id !== Number(postId));

  return HttpResponse.json(deletedPost);
});

const getPostsByQuery = http.get("/api/posts/search", async ({ request }) => {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit")) || 10;
  const skip = Number(url.searchParams.get("skip")) || 0;
  const q = url.searchParams.get("q");

  let filteredPosts = [...posts];
  if (q) {
    const searchLower = q.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (post) => post.title.toLowerCase().includes(searchLower) || post.body.toLowerCase().includes(searchLower),
    );
  }
  const paginatedPosts = filteredPosts.slice(skip, skip + limit);
  return HttpResponse.json({
    posts: paginatedPosts,
    total: filteredPosts.length,
    skip: skip,
    limit: limit,
  });
});

const getPostsByTag = http.get("/api/posts/tag/:tag", ({ params, request }) => {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit")) || 10;
  const skip = Number(url.searchParams.get("skip")) || 0;

  const { tag } = params;
  let filteredPosts = [...posts];
  if (tag) {
    filteredPosts = filteredPosts.filter((post) => post.tags.includes(tag as string));
  }
  const paginatedPosts = filteredPosts.slice(skip, skip + limit);

  return HttpResponse.json({
    posts: paginatedPosts,
    total: filteredPosts.length,
    skip,
    limit,
  });
});

export const postsApis = [getAllPost, addPost, deletePost, getPostsByQuery, getPostsByTag];

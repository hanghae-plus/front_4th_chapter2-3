import { http, HttpResponse } from "msw";
import { Post, PostResponse } from "@/types/post.ts";
import { dummyUser } from "@/mocks/dummy/user.ts";

let { posts }: PostResponse = await fetch("https://dummyjson.com/posts?limit=0").then((res) => res.json());

const parseQueryParams = (request: Request) => {
  const url = new URL(request.url);
  return {
    limit: Number(url.searchParams.get("limit")) || 10,
    skip: Number(url.searchParams.get("skip")) || 0,
    query: url.searchParams.get("q") || "",
  };
};

const getAllPost = http.get("/api/posts", async ({ request }) => {
  const { limit, skip } = parseQueryParams(request);

  return HttpResponse.json({
    posts: posts,
    total: posts.length,
    skip,
    limit,
  });
});

const addPost = http.post("/api/posts/add", async ({ request }) => {
  const post = (await request.json()) as Pick<Post, "title" | "body">;
  const newPost: Post = {
    ...post,
    id: 0,
    // id: Math.max(...posts.map((post) => post.id)) + 1,
    tags: [],
    reactions: { likes: 0, dislikes: 0 },
    views: 0,
    comments: [],
    userId: 0,
    author: dummyUser,
  };

  posts = [newPost, ...posts];

  return HttpResponse.json(newPost);
});

const deletePost = http.delete("/api/posts/:postId", ({ params }) => {
  const { postId } = params;

  const deletedPost = posts.find((post) => post.id !== Number(postId));
  posts = posts.filter((post) => post.id !== Number(postId));

  return HttpResponse.json(deletedPost);
});

const updatePost = http.put("/api/posts/:postId", async ({ request, params }) => {
  const { postId } = params;
  const { title, body } = (await request.json()) as Pick<Post, "title" | "body">;

  const updatedPost = posts.find((post) => post.id === Number(postId));
  posts = posts.map((post) => (post.id === Number(postId) ? { ...post, title, body } : post));

  return HttpResponse.json(updatedPost);
});

const getPostsByQuery = http.get("/api/posts/search", async ({ request }) => {
  const { limit, skip, query } = parseQueryParams(request);

  const regex = new RegExp(`(${query})`, "gi");
  const sortedPosts = posts.filter((post) => regex.test(post.title));

  const paginatedPosts = sortedPosts.slice(skip, skip + limit);
  return HttpResponse.json({
    posts: paginatedPosts,
    total: sortedPosts.length,
    skip: skip,
    limit: limit,
  });
});

const getPostsByTag = http.get("/api/posts/tag/:tag", ({ params, request }) => {
  const { limit, skip } = parseQueryParams(request);
  const { tag } = params;

  const sortedPosts = posts.filter((post) => post.tags.includes(tag as string));
  const paginatedPosts = sortedPosts.slice(skip, skip + limit);

  return HttpResponse.json({
    posts: paginatedPosts,
    total: sortedPosts.length,
    skip,
    limit,
  });
});

export const postsApis = [getAllPost, addPost, updatePost, deletePost, getPostsByQuery, getPostsByTag];

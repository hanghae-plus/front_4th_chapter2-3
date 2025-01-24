import { http, HttpResponse } from "msw";

import { AddPostProps, getPosts, Post } from "@/entities/posts";

let { posts } = await getPosts({ limit: 300, skip: 0 });

const comparePost = (sortBy: string, order: string) => (postA: Post, postB: Post) => {
  if (order === "asc") {
    if (sortBy === "id") {
      return postA[sortBy] - postB[sortBy];
    }

    if (sortBy === "title") {
      return postA[sortBy].localeCompare(postB[sortBy]);
    }

    if (sortBy === "reactions") {
      const { likes: likesA, dislikes: dislikesA } = postA[sortBy];
      const { likes: likesB, dislikes: dislikesB } = postB[sortBy];
      return likesA + dislikesA - (likesB + dislikesB);
    }
  } else if (order === "desc") {
    if (sortBy === "id") {
      return postB[sortBy] - postA[sortBy];
    }

    if (sortBy === "title") {
      return postB[sortBy].localeCompare(postA[sortBy]);
    }

    if (sortBy === "reactions") {
      const { likes: likesA, dislikes: dislikesA } = postA[sortBy];
      const { likes: likesB, dislikes: dislikesB } = postB[sortBy];
      return likesB + dislikesB - (likesA + dislikesA);
    }
  }
  return 0;
};

const getAllPost = http.get("/api/posts", async ({ request }) => {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit")) || 10;
  const skip = Number(url.searchParams.get("skip")) || 0;
  const sortBy = url.searchParams.get("sortBy") || "id";
  const order = url.searchParams.get("order") || "asc";

  const sortedPosts = [...posts].sort(comparePost(sortBy, order));

  const paginatedPosts = sortedPosts.slice(skip, skip + limit);

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
  const sortBy = url.searchParams.get("sortBy") || "id";
  const order = url.searchParams.get("order") || "asc";

  let filteredPosts = [...posts].sort(comparePost(sortBy, order));
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
  const sortBy = url.searchParams.get("sortBy") || "id";
  const order = url.searchParams.get("order") || "asc";

  const { tag } = params;

  let filteredPosts = [...posts].sort(comparePost(sortBy, order));
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

import { http, HttpResponse } from "msw";
import { Post, PostResponse } from "@/types/post.ts";
import { sortPost } from "@features/posts/lib/sortPost.ts";
import { User } from "@/types/user.ts";

let { posts }: PostResponse = await fetch("https://dummyjson.com/posts?limit=0").then((res) => res.json());

const dummyUser: User = {
  id: 1,
  firstName: "aaaaa",
  lastName: "Doe",
  maidenName: "Smith",
  age: 32,
  gender: "male",
  email: "john.doe@example.com",
  phone: "+1-555-123-4567",
  username: "aaaaa",
  password: "password123",
  birthDate: "1991-05-15",
  image: "https://example.com/avatar.jpg",
  bloodGroup: "O+",
  height: 180,
  weight: 75,
  eyeColor: "blue",
  hair: { color: "brown", type: "straight" },
  ip: "192.168.1.1",
  address: {
    address: "123 Main St",
    city: "New York",
    state: "New York",
    stateCode: "NY",
    postalCode: "10001",
    coordinates: { lat: 40.7128, lng: -74.006 },
    country: "United States",
  },
  macAddress: "00:0a:95:9d:68:16",
  university: "Columbia University",
  bank: {
    cardExpire: "06/2025",
    cardNumber: "4532123456789",
    cardType: "visa",
    currency: "USD",
    iban: "US4515485415948",
  },
  company: {
    department: "Engineering",
    name: "Tech Corp",
    title: "Senior Developer",
    address: {
      address: "456 Business Ave",
      city: "New York",
      state: "New York",
      stateCode: "NY",
      postalCode: "10002",
      country: "United States",
      coordinates: { lat: 40.7589, lng: -73.9851 },
    },
  },
  ein: "12-3456789",
  ssn: "123-45-6789",
  userAgent: "Mozilla/5.0",
  crypto: {
    coin: "Bitcoin",
    wallet: "0x123456789",
    network: "BTC",
  },
  role: "user",
};

const parseQueryParams = (request: Request) => {
  const url = new URL(request.url);
  return {
    limit: Number(url.searchParams.get("limit")) || 10,
    skip: Number(url.searchParams.get("skip")) || 0,
    sortBy: url.searchParams.get("sortBy") || "id",
    order: url.searchParams.get("order") || "asc",
    query: url.searchParams.get("q") || null,
  };
};

const getAllPost = http.get("/api/posts", async ({ request }) => {
  const { limit, sortBy, order, skip } = parseQueryParams(request);

  const sortedPosts = sortPost([...posts], sortBy, order);

  const paginatedPosts = sortedPosts.slice(skip, skip + limit);

  return HttpResponse.json({
    posts: paginatedPosts,
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

const getPostsByQuery = http.get("/api/posts/search", async ({ request }) => {
  const { limit, skip, query, sortBy, order } = parseQueryParams(request);

  let sortedPosts = sortPost([...posts], sortBy, order);

  if (query) {
    const searchLower = query.toLowerCase();
    sortedPosts = sortedPosts.filter(
      (post) => post.title.toLowerCase().includes(searchLower) || post.body.toLowerCase().includes(searchLower),
    );
  }
  const paginatedPosts = sortedPosts.slice(skip, skip + limit);
  return HttpResponse.json({
    posts: paginatedPosts,
    total: sortedPosts.length,
    skip: skip,
    limit: limit,
  });
});

const getPostsByTag = http.get("/api/posts/tag/:tag", ({ params, request }) => {
  const { limit, skip, sortBy, order } = parseQueryParams(request);
  const { tag } = params;

  let sortedPosts = sortPost([...posts], sortBy, order);
  sortedPosts = sortedPosts.filter((post) => post.tags.includes(tag as string));
  const paginatedPosts = sortedPosts.slice(skip, skip + limit);

  return HttpResponse.json({
    posts: paginatedPosts,
    total: sortedPosts.length,
    skip,
    limit,
  });
});

export const postsApis = [getAllPost, addPost, deletePost, getPostsByQuery, getPostsByTag];

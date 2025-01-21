import { InfPost, TypeLimit, TypeSkip } from "../types/types.ts"

interface fetchPostsProps {
  limit : TypeLimit;
  skip : TypeSkip;
}

export const fetchPosts = async ({ limit, skip }: fetchPostsProps): Promise<InfPost[]> => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`);
  console.log("response", response)
  return response.json();
};

export const addingPostApi = async (newPost : InfPost) : Promise<InfPost> => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  return response.json();
}

export const updatingPostApi = async (selectedPost : InfPost) : Promise<InfPost> => {
  const response = await fetch(`/api/posts/${selectedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedPost),
  });
  return response.json();
}

export const deletingPostApi = async (id : number) : Promise<void> => {
  await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })
}


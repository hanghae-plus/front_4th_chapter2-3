import { InfPost } from "../types/types.ts"


export const postsApi = async (params: string): Promise<InfPost[]> => {
  const response = await fetch(`/api/posts${params}`);
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


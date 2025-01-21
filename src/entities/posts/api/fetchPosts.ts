export const fetchPosts = async ({ limit, skip }: any) => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`);
  console.log("response", response)
  return response.json();
};

export const addingPostApi = async (newPost) : any => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  return response.json();
}

export const updatingPostApi = async (selectedPost) : any => {
  const response = await fetch(`/api/posts/${selectedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedPost),
  });
  return response.json();
}

export const deletingPostApi = async (id) : Promise<void> => {
  await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })
}


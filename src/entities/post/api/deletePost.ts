export const deletePost = async (id: number) => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
  } catch (error) {
    throw error
  }
}

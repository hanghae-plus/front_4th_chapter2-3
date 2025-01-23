export const deleteComment = async (id: number) => {
  try {
    await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    })
  } catch (error) {
    throw error
  }
}

const deletePost = async (id: number) => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
  } catch (error) {
    console.error("게시물 삭제 오류:", error)
  }
}

export { deletePost }

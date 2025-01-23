async function postCommentLike(commentId: number, currentLikes: number) {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: currentLikes + 1 }),
  })

  if (!response.ok) {
    throw new Error("좋아요 업데이트에 실패했습니다.")
  }

  return await response.json()
}

export { postCommentLike }

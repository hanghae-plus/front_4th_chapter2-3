import { Comment } from "../model/types";

// post에 해당하는 댓글 조회
export const fetchCommentList = async (postId: number): Promise<Comment[]> => {
	const response = await fetch(`/api/commentList/post/${postId}`);
	return response.json();
};

// 댓글 추가
export const addComment = async (newComment: Comment): Promise<Comment> => {
	const response = await fetch(`/api/commentList/add`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newComment),
	});

	return response.json();
}

// 댓글 업데이트
export const updateComment = async (selectedComment: Comment): Promise<Comment> => {
	const response = await fetch(`/api/commentList/${selectedComment.id}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ body: selectedComment.body }),
	});

	return response.json();
}

// 댓글 삭제
export const deleteComment = async (commentId: number): Promise<Comment> => {
	const response = await fetch(`/api/commentList/${commentId}`, {
		method: "DELETE",
	});

	return response.json();
}

// 댓글 좋아요
export const likeComment = async (commentId: number, commentLikes: number): Promise<Comment> => {
	const response = await fetch(`/api/commentList/${commentId}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ likes: commentLikes + 1 }),
	});

	return response.json();
}
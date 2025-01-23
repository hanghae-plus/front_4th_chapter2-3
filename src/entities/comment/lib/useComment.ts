import { useAtom } from "jotai";
import {
  addComments,
  deleteComments,
  fetchComments,
  likeComments,
  updateComments,
} from "../api/commentApi";
import {
  addCommentDialogAtom,
  commentsAtom,
  editCommentDialogAtom,
  newCommentAtom,
  selectedCommentAtom,
} from "../../../app/store/atom";
import { Comment } from "../model/types";

export const useComment = () => {
  const [comments, setComments] = useAtom(commentsAtom);
  const [newComment, setNewComment] = useAtom(newCommentAtom);
  const [, setShowAddCommentDialog] = useAtom(addCommentDialogAtom);
  const [selectedComment] = useAtom(selectedCommentAtom);
  const [, setShowEditCommentDialog] = useAtom(editCommentDialogAtom);

  // 댓글 가져오기
  const handleFetchComments = async (postId: number) => {
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음

    try {
      const data = await fetchComments(postId);

      setComments((prev) => ({ ...prev, [postId]: data.comments }));
    } catch (error) {
      console.error("댓글 가져오기 오류:", error);
    }
  };

  // 댓글 추가
  const handleAddComments = async () => {
    try {
      const data = await addComments(newComment);

      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data?.postId] || []), data],
      }));
    } catch (error) {
      console.error("댓글 추가 오류:", error);
    } finally {
      setShowAddCommentDialog(false);
      setNewComment({ body: "", postId: null, userId: 1 });
    }
  };

  // 댓글 업데이트
  const handleUpdateComments = async () => {
    try {
      const data = await updateComments(selectedComment.id, {
        body: selectedComment.body,
      });

      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) =>
          comment.id === data.id ? data : comment
        ),
      }));
    } catch (error) {
      console.error("댓글 업데이트 오류:", error);
    } finally {
      setShowEditCommentDialog(false);
    }
  };

  // 댓글 삭제
  const handleDeleteComments = async (id: number, postId: number) => {
    try {
      await deleteComments(id);

      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }));
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
    }
  };

  // 댓글 좋아요
  const handleLikeComments = async (id: number, postId: number) => {
    const foundComment = comments[postId]?.find((c) => c.id === id);

    try {
      const data = await likeComments(id, {
        likes: (foundComment?.likes ?? 0) + 1,
      });

      setComments((prevComments) => ({
        ...prevComments,
        [postId]: prevComments[postId].map((comment: Comment) =>
          comment.id === data.id
            ? { ...data, likes: (comment.likes ?? 0) + 1 }
            : comment
        ),
      }));
    } catch (error) {
      console.error("댓글 좋아요 오류:", error);
    }
  };

  return {
    handleFetchComments,
    handleAddComments,
    handleUpdateComments,
    handleDeleteComments,
    handleLikeComments,
  };
};

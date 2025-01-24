import React, { useState } from "react";
import { usePostContext } from "../features/postManagement/model/PostContext";
import { usePostActions } from "../features/postManagement/model/PostActions";
import { useUserActions } from "../features/userManagement/model/UserActions";
import { useCommentActions } from "../features/commentManagement/model/CommentActions";
import { PostDashboard } from "../widgets/postDashboard";
import { Comment, User } from "../entities/types";
import { UserModal } from "../features/userManagement/ui/UserModal";
import { CommentList } from "../features/commentManagement/ui/CommentList";
import { EditPostModal } from "../features/postManagement/ui/EditPostModal";
import { NewPostModal } from "../features/postManagement/ui/NewPostModal";

const PostsManagerPage: React.FC = () => {
  const { state, dispatch } = usePostContext();
  const postActions = usePostActions();
  const userActions = useUserActions();
  const commentActions = useCommentActions();

  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const handlePostDetail = async (postId: number) => {
    try {
      const postData = await postActions.getPostById(postId);
      dispatch({ type: "SET_SELECTED_POST", payload: postData });
      setShowDetailDialog(true);
    } catch (error) {
      console.error("게시물 상세 정보 가져오기 실패:", error);
    }
  };

  const handleUserClick = async (user: User) => {
    await userActions.getUserById(user.id);
    setShowUserModal(true);
  };

  const handleCommentDelete = async (commentId: number) => {
    if (state.selectedPost) {
      await commentActions.deleteComment(commentId, state.selectedPost.id);
    }
  };

  const handleCommentLike = async (comment: Comment) => {
    await commentActions.updateComment(comment.id, comment.body);
  };

  return (
    <div>
      <PostDashboard 
        onPostDetail={handlePostDetail} 
        onUserClick={handleUserClick}
      />

      {state.selectedPost && (
        <CommentList 
          postId={state.selectedPost.id}
          onCommentUpdate={() => {}}
          onCommentDelete={handleCommentDelete}
          onCommentLike={handleCommentLike}
        />
      )}

      <UserModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
      />
      <NewPostModal />
      <EditPostModal />
    </div>
  );
};

export default PostsManagerPage;
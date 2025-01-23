import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from "../shared/ui";
import { Post } from "../entities/post/model/types.ts";
import { User } from "../entities/user/model/types.ts";
import { Tags } from "../entities/tag/model/types.ts";
import { PostItem, PostFilter, PostPagination } from "../entities/post/ui";

import { CommentItem } from "../entities/comment/ui/CommentItem.tsx";
import { Comment } from "./../entities/comment/model/types";
import { highlightText } from "../shared/lib/handleHighlightText.tsx";
import { UserModal } from "../entities/user/ui/UserModal.tsx";
import { DialogAddPost } from "../entities/post/ui/DialogAddPost.tsx";

import { fetchTag } from "../entities/tag/api/tagApi.ts";
import {
  addComments,
  deleteComments,
  fetchComments,
  likeComments,
  updateComments,
} from "../entities/comment/api/commentApi.ts";
import { useAtom } from "jotai";
import {
  totalAtom,
  postsAtom,
  selectedPostAtom,
  searchQueryAtom,
  selectedCommentAtom,
  commentsAtom,
  selectedUserAtom,
  selectedTagAtom,
  loadingAtom,
  limitAtom,
  skipAtom,
  addDialogAtom,
  editDialogAtom,
} from "../app/store/atom.ts";
import { useQueryParams } from "../shared/lib/useQueryParams.ts";
import { usePosts } from "../entities/post/lib/usePosts.ts";
const PostsManager = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 전역 변수
  const [total] = useAtom(totalAtom);
  const [posts] = useAtom(postsAtom);
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom);
  const [comments, setComments] = useAtom(commentsAtom);
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
  const [loading] = useAtom(loadingAtom);
  const [skip, setSkip] = useAtom(skipAtom);
  // useState(parseInt(useQueryParams("skip") || "0"));
  const [limit, setLimit] = useAtom(limitAtom);
  // useState(parseInt(useQueryParams("limit") || "10"));
  const [showEditDialog, setShowEditDialog] = useAtom(editDialogAtom);

  const [showAddDialog, setShowAddDialog] = useAtom(addDialogAtom);

  // 상태 관리

  const [sortBy, setSortBy] = useState(useQueryParams("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(
    useQueryParams("sortOrder") || "asc"
  );

  const [tags, setTags] = useState<Tags[]>([]);

  const [newComment, setNewComment] = useState<Comment>({
    body: "",
    postId: null,
    userId: 1,
  });

  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false);
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false);
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams();
    if (skip) params.set("skip", skip.toString());
    if (limit) params.set("limit", limit.toString());
    if (searchQuery) params.set("search", searchQuery);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder) params.set("sortOrder", sortOrder);
    if (selectedTag) params.set("tag", selectedTag);
    navigate(`?${params.toString()}`);
  };

  // 태그 가져오기
  const handleFetchTags = async () => {
    try {
      const data = await fetchTag();
      setTags(data);
    } catch (error) {
      console.error("태그 가져오기 오류:", error);
    }
  };

  const {
    handleFetchPost,
    handleFetchPostsByTag,
    handleSearchPost,
    handleAddPost,
    handleUpdatePost,
    handleDeletePost,
  } = usePosts();

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

      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment: Comment) =>
          comment.id === data.id
            ? { ...data, likes: (comment.likes ?? 0) + 1 }
            : comment
        ),
      }));
    } catch (error) {
      console.error("댓글 좋아요 오류:", error);
    }
  };

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    handleFetchComments(post.id);
    setShowPostDetailDialog(true);
  };

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    if (!user) return;

    try {
      const response = await fetch(`/api/users/${user?.id}`);
      const userData = await response.json();
      setSelectedUser(userData);
      setShowUserModal(true);
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    handleFetchTags();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      handleFetchPostsByTag(selectedTag);
    } else {
      handleFetchPost();
    }
    updateURL();
  }, [skip, limit, sortBy, sortOrder, selectedTag]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSkip(parseInt(params.get("skip") || "0"));
    setLimit(parseInt(params.get("limit") || "10"));
    setSearchQuery(params.get("search") || "");
    setSortBy(params.get("sortBy") || "");
    setSortOrder(params.get("sortOrder") || "asc");
    setSelectedTag(params.get("tag") || "");
  }, [location.search]);

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <PostFilter
            // onInputChange={(value: string) => setSearchQuery(value)}
            onKeyDown={handleSearchPost}
            selectedTag={selectedTag}
            tags={tags}
            onValueChange={(value: string) => {
              setSelectedTag(value);
              handleFetchPostsByTag(value);
              updateURL();
            }}
            sortBy={sortBy}
            onSelectChange={setSortBy}
            sortOrder={sortOrder}
            onSelectOrderChange={setSortOrder}
          />

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostItem
              posts={posts}
              selectedTag={selectedTag}
              searchQuery={searchQuery}
              setSelectedTag={setSelectedTag}
              updateURL={updateURL}
              onViewAuthor={(author: User) => {
                if (author) openUserModal(author);
              }}
              onView={(post: Post) => openPostDetail(post)}
              onEdit={(post: Post) => {
                setSelectedPost(post);
                setShowEditDialog(true);
              }}
              onDelete={(postId: number) => handleDeletePost(postId)}
            />
          )}
          <PostPagination
            limit={limit}
            skip={skip}
            total={total}
            onClickPage={(skip) => setSkip(skip)}
            onValueChange={(value) => setLimit(Number(value))}
          />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <DialogAddPost
        onOpen={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddPost={handleAddPost}
      />

      {/* 게시물 수정 대화상자 */}
      <Dialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={selectedPost?.title || ""}
              onChange={(e) =>
                setSelectedPost({ ...selectedPost, title: e.target.value })
              }
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={selectedPost?.body || ""}
              onChange={(e) =>
                setSelectedPost({ ...selectedPost, body: e.target.value })
              }
            />
            <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 추가 대화상자 */}
      <Dialog
        open={showAddCommentDialog}
        onOpenChange={setShowAddCommentDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 댓글 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={newComment.body}
              onChange={(e) =>
                setNewComment({ ...newComment, body: e.target.value })
              }
            />
            <Button onClick={handleAddComments}>댓글 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 대화상자 */}
      <Dialog
        open={showEditCommentDialog}
        onOpenChange={setShowEditCommentDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e) =>
                setSelectedComment({ ...selectedComment, body: e.target.value })
              }
            />
            <Button onClick={handleUpdateComments}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 상세 보기 대화상자 */}
      <Dialog
        open={showPostDetailDialog}
        onOpenChange={setShowPostDetailDialog}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {highlightText(selectedPost?.title, searchQuery)}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(selectedPost.body, searchQuery)}</p>
            <CommentItem
              comments={comments}
              postId={selectedPost.id}
              searchQuery={searchQuery}
              onAdd={() => {
                setNewComment((prev: Comment) => ({
                  ...prev,
                  postId: selectedPost.id,
                }));
                setShowAddCommentDialog(true);
              }}
              onLikeComment={(comment: Comment) => {
                if (comment.id && comment.postId)
                  handleLikeComments(comment.id, comment.postId);
              }}
              onEditComment={(comment: Comment) => {
                setSelectedComment(comment);
                setShowEditCommentDialog(true);
              }}
              onDeleteComment={(comment: Comment) => {
                if (comment?.id && comment.postId)
                  handleDeleteComments(comment.id, comment.postId);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* 사용자 모달 */}
      <UserModal
        onOpen={showUserModal}
        onOpenChange={setShowUserModal}
        selectedUser={selectedUser}
      />
    </Card>
  );
};

export default PostsManager;

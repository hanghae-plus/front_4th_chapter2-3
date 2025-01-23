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
import { PostItem, PostFilter, PostPagination } from "../entities/post/ui";

import { CommentItem } from "../entities/comment/ui/CommentItem.tsx";
import { Comment } from "./../entities/comment/model/types";
import { highlightText } from "../shared/lib/handleHighlightText.tsx";
import { UserModal } from "../entities/user/ui/UserModal.tsx";
import { DialogAddPost } from "../entities/post/ui/DialogAddPost.tsx";

import { useAtom } from "jotai";
import {
  totalAtom,
  postsAtom,
  selectedPostAtom,
  searchQueryAtom,
  selectedCommentAtom,
  selectedUserAtom,
  selectedTagAtom,
  loadingAtom,
  limitAtom,
  skipAtom,
  addDialogAtom,
  editDialogAtom,
  newCommentAtom,
  addCommentDialogAtom,
  editCommentDialogAtom,
} from "../app/store/atom.ts";
import { useQueryParams } from "../shared/lib/useQueryParams.ts";
import { usePosts } from "../entities/post/lib/usePosts.ts";
import { useComment } from "../entities/comment/lib/useComment.ts";
import { useTags } from "../entities/tag/lib/useTags.ts";

const PostsManager = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 전역 변수
  const [total] = useAtom(totalAtom);
  const [posts] = useAtom(postsAtom);
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom);
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
  const [loading] = useAtom(loadingAtom);
  const [skip, setSkip] = useAtom(skipAtom);
  const [limit, setLimit] = useAtom(limitAtom);
  const [showEditDialog, setShowEditDialog] = useAtom(editDialogAtom);

  const [showAddDialog, setShowAddDialog] = useAtom(addDialogAtom);
  const [newComment, setNewComment] = useAtom(newCommentAtom);
  const [showAddCommentDialog, setShowAddCommentDialog] =
    useAtom(addCommentDialogAtom);
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(
    editCommentDialogAtom
  );

  // 상태 관리

  const [sortBy, setSortBy] = useState(useQueryParams("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(
    useQueryParams("sortOrder") || "asc"
  );

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

  const { handleFetchTags } = useTags();

  const {
    handleFetchPost,
    handleFetchPostsByTag,
    handleSearchPost,
    handleAddPost,
    handleUpdatePost,
    handleDeletePost,
  } = usePosts();

  const { handleFetchComments, handleAddComments, handleUpdateComments } =
    useComment();

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
            onKeyDown={handleSearchPost}
            selectedTag={selectedTag}
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
              postId={selectedPost.id}
              onAdd={() => {
                setNewComment((prev: Comment) => ({
                  ...prev,
                  postId: selectedPost.id,
                }));
                setShowAddCommentDialog(true);
              }}
              onEditComment={(comment: Comment) => {
                setSelectedComment(comment);
                setShowEditCommentDialog(true);
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

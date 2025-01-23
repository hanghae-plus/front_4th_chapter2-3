import { useEffect } from "react";
import { Plus } from "lucide-react";
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
import { PostItem, PostFilter, PostPagination } from "../entities/post/ui";

import { CommentItem } from "../entities/comment/ui/CommentItem.tsx";
import { highlightText } from "../shared/lib/handleHighlightText.tsx";
import { UserModal } from "../entities/user/ui/UserModal.tsx";
import { DialogAddPost } from "../entities/post/ui/DialogAddPost.tsx";

import { useAtom } from "jotai";
import {
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
  sortByAtom,
  sortOrderAtom,
  postDetailDialogAtom,
  userModalAtom,
} from "../app/store/atom.ts";
import { usePosts } from "../entities/post/lib/usePosts.ts";
import { useComment } from "../entities/comment/lib/useComment.ts";
import { useTags } from "../entities/tag/lib/useTags.ts";
import { useQuery } from "../shared/hook/useQuery.ts";
import { useInitializePosts } from "../shared/hook/useInitializePosts.ts";

const PostsManager = () => {
  // 전역 변수
  const [searchQuery] = useAtom(searchQueryAtom);
  const [selectedUser] = useAtom(selectedUserAtom);
  const [selectedTag] = useAtom(selectedTagAtom);
  const [loading] = useAtom(loadingAtom);
  const [skip] = useAtom(skipAtom);
  const [limit] = useAtom(limitAtom);
  const [sortBy] = useAtom(sortByAtom);
  const [sortOrder] = useAtom(sortOrderAtom);

  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom);
  const [newComment, setNewComment] = useAtom(newCommentAtom);

  const [showEditDialog, setShowEditDialog] = useAtom(editDialogAtom);
  const [showAddDialog, setShowAddDialog] = useAtom(addDialogAtom);
  const [showAddCommentDialog, setShowAddCommentDialog] =
    useAtom(addCommentDialogAtom);
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(
    editCommentDialogAtom
  );
  const [showPostDetailDialog, setShowPostDetailDialog] =
    useAtom(postDetailDialogAtom);
  const [showUserModal, setShowUserModal] = useAtom(userModalAtom);

  const { handleFetchTags } = useTags();

  const {
    handleFetchPost,
    handleFetchPostsByTag,
    handleAddPost,
    handleUpdatePost,
  } = usePosts();

  const { handleAddComments, handleUpdateComments } = useComment();

  useEffect(() => {
    handleFetchTags();
  }, [handleFetchTags]);

  const { updateURL } = useQuery();

  // usePost
  useEffect(() => {
    if (selectedTag) {
      handleFetchPostsByTag(selectedTag);
    } else {
      handleFetchPost();
    }
    updateURL();
  }, [
    skip,
    limit,
    sortBy,
    sortOrder,
    selectedTag,
    handleFetchPost,
    handleFetchPostsByTag,
    updateURL,
  ]);

  useInitializePosts();

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
          <PostFilter />
          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostItem />
          )}
          <PostPagination />
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
            <CommentItem />
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

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../shared/ui";
import {
  Post,
  Comment,
  Tag,
  fetchTags,
  createPost,
  updatePost,
  deletePost,
  createComment,
  updateComment,
  UserDetail,
} from "../entities";

import { fetchCommentsByPostId } from "../features";
import { PostsManager } from "../widgets/PostsManager/ui/PostsManager";
import { UserInformationDialog } from "../widgets/ui/UserInformationDialog";
import { ModalProvider } from "../shared";
import { PostDetailDialog } from "../widgets/ui/PostDetailDialog";

const PostsManagerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"));
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"));
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 });
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "");
  const [comments, setComments] = useState<Record<Post["id"], Comment[]>>({});
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [newComment, setNewComment] = useState<Comment>({
    id: 0,
    body: "",
    postId: null,
    likes: 0,
    user: null,
  });
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false);
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);

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
  const setFetchedTags = async () => {
    try {
      setTags(await fetchTags());
    } catch (error) {
      console.error("태그 가져오기 오류:", error);
    }
  };

  // 게시물 추가
  // shared/lib/fetch
  const addPost = async () => {
    try {
      const data = await createPost({ newPost });
      setPosts([data, ...posts]);
      setShowAddDialog(false);
      setNewPost({ title: "", body: "", userId: 1 });
    } catch (error) {
      console.error("게시물 추가 오류:", error);
    }
  };

  // 게시물 업데이트
  const setUpdatedPost = async () => {
    try {
      const data = await updatePost({ post: selectedPost! });
      setPosts(posts.map((post) => (post.id === data.id ? data : post)));
      setShowEditDialog(false);
    } catch (error) {
      console.error("게시물 업데이트 오류:", error);
    }
  };

  // 게시물 삭제
  const removePost = async (id: Post["id"]) => {
    try {
      await deletePost({ postId: id });
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("게시물 삭제 오류:", error);
    }
  };

  // 댓글 가져오기
  const fetchComments = async (postId: Post["id"]) => {
    if (comments?.[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const data = await fetchCommentsByPostId({ postId });
      setComments((prev) => ({ ...prev, [postId]: data.comments }));
    } catch (error) {
      console.error("댓글 가져오기 오류:", error);
    }
  };

  // 댓글 추가
  const addComment = async () => {
    try {
      const data = await createComment({ newComment: newComment });
      setComments((prev) => ({
        ...prev,
        [data.postId!]: [...(prev[data.postId!] || []), data],
      }));
      setShowAddCommentDialog(false);
      setNewComment({
        id: 0,
        body: "",
        postId: null,
        likes: 0,
        user: null,
      });
    } catch (error) {
      console.error("댓글 추가 오류:", error);
    }
  };

  // 댓글 업데이트
  const modifyComment = async () => {
    try {
      const data = await updateComment({ comment: selectedComment! });
      setComments((prev) => ({
        ...prev,
        [data.postId!]: prev[data.postId!].map((comment) => (comment.id === data.id ? data : comment)),
      }));
      setShowEditCommentDialog(false);
    } catch (error) {
      console.error("댓글 업데이트 오류:", error);
    }
  };

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    fetchComments(post.id);
  };

  const openPostEdit = (post: Post) => {
    setSelectedPost(post);
    setShowEditDialog(true);
  };

  useEffect(() => {
    setFetchedTags();
  }, []);

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
    <ModalProvider
      modalKeys={[
        "userModal",
        "addPostModal",
        "modifyPostModal",
        "addCommentModal",
        "modifyCommentModal",
        "postDetailModal",
      ]}
    >
      <Card className="w-full max-w-6xl mx-auto">
        <PostsManager
          posts={posts}
          setShowAddDialog={setShowAddDialog}
          searchQuery={searchQuery}
          setPosts={setPosts}
          setTotal={setTotal}
          setSearchQuery={setSearchQuery}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          updateURL={updateURL}
          tags={tags}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          limit={limit}
          setLimit={setLimit}
          skip={skip}
          setSkip={setSkip}
          total={total}
          setSelectedUser={setSelectedUser}
          openPostDetail={openPostDetail}
          removePost={removePost}
          openPostEdit={openPostEdit}
        />
        {/* 게시물 추가 대화상자 */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>새 게시물 추가</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="제목"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
              <Textarea
                rows={30}
                placeholder="내용"
                value={newPost.body}
                onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
              />
              <Input
                type="number"
                placeholder="사용자 ID"
                value={newPost.userId}
                onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
              />
              <Button onClick={addPost}>게시물 추가</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* 게시물 수정 대화상자 */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>게시물 수정</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="제목"
                value={selectedPost?.title || ""}
                onChange={(e) => setSelectedPost({ ...selectedPost!, title: e.target.value })}
              />
              <Textarea
                rows={15}
                placeholder="내용"
                value={selectedPost?.body || ""}
                onChange={(e) => setSelectedPost({ ...selectedPost!, body: e.target.value })}
              />
              <Button onClick={setUpdatedPost}>게시물 업데이트</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* 댓글 추가 대화상자 */}
        <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>새 댓글 추가</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="댓글 내용"
                value={newComment.body}
                onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
              />
              <Button onClick={addComment}>댓글 추가</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* 댓글 수정 대화상자 */}
        <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>댓글 수정</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="댓글 내용"
                value={selectedComment?.body || ""}
                onChange={(e) => setSelectedComment({ ...selectedComment!, body: e.target.value })}
              />
              <Button onClick={modifyComment}>댓글 업데이트</Button>
            </div>
          </DialogContent>
        </Dialog>

        {selectedPost && (
          <PostDetailDialog
            post={selectedPost}
            searchQuery={searchQuery}
            comments={comments}
            setComments={setComments}
            setNewComment={setNewComment}
            setSelectedComment={setSelectedComment}
          />
        )}

        {selectedUser && <UserInformationDialog user={selectedUser} />}
      </Card>
    </ModalProvider>
  );
};

export default PostsManagerPage;

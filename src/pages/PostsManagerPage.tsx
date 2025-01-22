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
import {
  addNewPost,
  deletePost,
  getPosts,
  getPostsByTag,
  getUser,
  searchPost,
  updatePost,
} from "../entities/post/api/postApi.ts";
import { fetchTag } from "../entities/tag/api/tagApi.ts";
import {
  addComments,
  deleteComments,
  fetchComments,
  likeComments,
  updateComments,
} from "../entities/comment/api/commentApi.ts";

const PostsManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post>({
    id: 0,
    userId: 0,
    title: "",
    body: "",
  });
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 });

  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"));
  const [limit, setLimit] = useState(
    parseInt(queryParams.get("limit") || "10")
  );
  const [searchQuery, setSearchQuery] = useState(
    queryParams.get("search") || ""
  );

  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(
    queryParams.get("sortOrder") || "asc"
  );

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const [tags, setTags] = useState<Tags[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>(
    queryParams.get("tag") || ""
  );

  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [selectedComment, setSelectedComment] = useState<Comment>({
    body: "",
    postId: null,
    userId: 0,
    likes: 0,
  });
  const [newComment, setNewComment] = useState<Comment>({
    body: "",
    postId: null,
    userId: 1,
  });

  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false);
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false);
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false);

  const [showUserModal, setShowUserModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

  // 게시물 가져오기
  const handleFetchPost = async () => {
    try {
      setLoading(true);

      const [postsData, usersData] = await Promise.all([
        getPosts(limit, skip),
        getUser(),
      ]);

      // postsData에서 posts 배열을 매핑하여 user 정보 추가
      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }));

      // 상태 업데이트
      setPosts(postsWithUsers);
      setTotal(postsData.total);
    } catch (error) {
      console.error("게시물 가져오기 오류:", error);
    } finally {
      setLoading(false);
    }
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

  // 게시물 검색
  const handleSearchPost = async () => {
    if (!searchQuery) return handleFetchPost();

    setLoading(true);

    try {
      const data = await searchPost(searchQuery);

      setPosts(data.posts);
      setTotal(data.total);
    } catch (error) {
      console.error("게시물 검색 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") return handleFetchPost();

    setLoading(true);
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        getPostsByTag(tag),
        getUser(),
      ]);

      const postsWithUsers = postsResponse.posts.map((post: Post) => ({
        ...post,
        author: usersResponse.users.find(
          (user: User) => user.id === post.userId
        ),
      }));

      setPosts(postsWithUsers);
      setTotal(postsResponse.total);
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 게시물 추가
  const handleAddPost = async () => {
    try {
      const data = await addNewPost(newPost);

      setPosts((prevPost) => [data, ...prevPost]);
    } catch (error) {
      console.error("게시물 추가 오류:", error);
    } finally {
      setShowAddDialog(false);
      setNewPost({ title: "", body: "", userId: 1 });
    }
  };

  // 게시물 업데이트
  const handleUpdatePost = async () => {
    try {
      const data = await updatePost(selectedPost.id, selectedPost);

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === data.id ? data : post))
      );
    } catch (error) {
      console.error("게시물 업데이트 오류:", error);
    } finally {
      setShowEditDialog(false);
    }
  };

  // 게시물 삭제
  const handleDeletePost = async (id: number) => {
    try {
      await deletePost(id);

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("게시물 삭제 오류:", error);
    }
  };

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
      fetchPostsByTag(selectedTag);
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
            searchQuery={searchQuery}
            onInputChange={(value: string) => setSearchQuery(value)}
            onKeyDown={handleSearchPost}
            selectedTag={selectedTag}
            tags={tags}
            onValueChange={(value: string) => {
              setSelectedTag(value);
              fetchPostsByTag(value);
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
        newPost={newPost}
        onOpen={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSetNewPost={(field, value) =>
          setNewPost((prev) => ({ ...prev, [field]: value }))
        }
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

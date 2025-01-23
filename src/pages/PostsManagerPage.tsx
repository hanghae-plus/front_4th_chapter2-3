import { useEffect, useState } from "react";
import { Edit2, Plus, Search, ThumbsUp, Trash2 } from "lucide-react";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "../shared/ui";

import { Post, Tag, User, Comment, NewComment, addPost, updatePost } from "@entities/index";
import { addComment, deleteComment, likeComment, updateComment } from "@entities/comment/model";
import { usePostQuery, usePostStore } from "@features/post";
import { useUserQuery } from "@features/user";
import { useTagQuery } from "@features/tag";
import { commentQueryKey, useCommentQuery } from "@features/comment";
import { useQueryClient } from "@tanstack/react-query";
import { getPostWithUser } from "@features/post/model/post";
import PostTable from "@features/post/ui/PostTable";

const PostsManager = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 });
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false);
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false);
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { posts, total, selectedPost, newPost, setPosts, setNewPost, setSelectedPost } = usePostStore();
  const queryClient = useQueryClient();

  const {
    data: postsData,
    isSuccess: isPostsSuccess,
    isLoading: isPostsLoading,
    limit,
    skip,
    searchQuery,
    selectedTag,
    sortBy,
    sortOrder,
    updatePostSearchParams,
  } = usePostQuery();

  const { data: usersData, isSuccess: isUsersSucess, isLoading: isUsersLoading } = useUserQuery();
  const { data: tags } = useTagQuery();
  const { data: comments } = useCommentQuery(selectedPost?.id);

  useEffect(() => {
    if (isPostsSuccess && isUsersSucess) {
      const postsWithUsers = postsData?.posts.map((post) => getPostWithUser(post, usersData.users)) ?? [];
      setPosts(postsWithUsers);
    }
  }, [isPostsSuccess, isUsersSucess, postsData, usersData, setPosts]);

  useEffect(() => {
    setLoading(isPostsLoading || isUsersLoading);
  }, [isPostsLoading, isUsersLoading]);

  // 게시물 검색
  const searchPosts = async (searchQuery: string) => {
    updatePostSearchParams("searchQuery", searchQuery);
  };

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (tag === "all") {
      updatePostSearchParams("selectedTag", "");
      return;
    }
    updatePostSearchParams("selectedTag", tag);
  };

  // 게시물 추가
  const addPostAndUpdate = async () => {
    const data = await addPost(newPost);

    setPosts([data, ...posts]);
    setShowAddDialog(false);
    setNewPost({ title: "", body: "", userId: 1 });
  };

  // 게시물 업데이트
  const editPostAndUpdate = async () => {
    if (!selectedPost) return;

    const data = await updatePost(selectedPost);

    setPosts(
      posts.map((post) =>
        post.id === data.id ? { ...data, author: null } : getPostWithUser(post, usersData?.users ?? []),
      ),
    );
    setShowEditDialog(false);
  };

  // 댓글 추가
  const addCommentAndUpdate = async () => {
    const data = await addComment(newComment);

    if (!selectedPost) return;

    queryClient.setQueryData<Comment[]>(commentQueryKey.list(selectedPost.id), (prev) => [...(prev || []), data]);

    setShowAddCommentDialog(false);
    setNewComment({ body: "", postId: null, userId: 1 });
  };

  // 댓글 업데이트
  const editCommentAndUpdate = async () => {
    if (!selectedComment) return;
    const data = await updateComment(selectedComment);

    if (!selectedPost) return;
    queryClient.setQueryData<Comment[]>(commentQueryKey.list(selectedPost.id), (prev) => [...(prev || []), data]);

    setShowEditCommentDialog(false);
  };

  // 댓글 삭제
  const deleteCommentAndUpdate = async (id: number, postId: number) => {
    await deleteComment(id);

    queryClient.setQueryData<Comment[]>(commentQueryKey.list(postId), (prev) =>
      prev?.filter((comment) => comment.id !== id),
    );
  };

  // 댓글 좋아요
  const likeCommentAndUpdate = async (id: number, postId: number) => {
    const updatedLikes = (comments?.find((c) => c.id === id)?.likes ?? 0) + 1;
    const data = await likeComment(id, updatedLikes);
    queryClient.setQueryData<Comment[]>(commentQueryKey.list(postId), (prev) =>
      prev?.map((comment) => (comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment)),
    );
  };

  // 하이라이트 함수 추가
  const highlightText = (text: string, highlight: string) => {
    if (!text) return null;
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
      </span>
    );
  };

  // 댓글 렌더링
  const renderComments = (postId?: number) =>
    postId && (
      <div className="mt-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold">댓글</h3>
          <Button
            size="sm"
            onClick={() => {
              setNewComment((prev) => ({ ...prev, postId }));
              setShowAddCommentDialog(true);
            }}
          >
            <Plus className="w-3 h-3 mr-1" />
            댓글 추가
          </Button>
        </div>
        <div className="space-y-1">
          {comments?.map((comment) => (
            <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
              <div className="flex items-center space-x-2 overflow-hidden">
                <span className="font-medium truncate">{comment.user.username}:</span>
                <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" onClick={() => likeCommentAndUpdate(comment.id, postId)}>
                  <ThumbsUp className="w-3 h-3" />
                  <span className="ml-1 text-xs">{comment.likes}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedComment(comment);
                    setShowEditCommentDialog(true);
                  }}
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deleteCommentAndUpdate(comment.id, postId)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

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
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="게시물 검색..."
                  className="pl-8"
                  defaultValue={searchQuery}
                  onKeyPress={(e) => e.key === "Enter" && searchPosts(e.target.value)}
                />
              </div>
            </div>
            <Select
              value={selectedTag}
              onValueChange={(value: string) => {
                fetchPostsByTag(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="태그 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 태그</SelectItem>
                {tags?.map((tag: Tag) => (
                  <SelectItem key={tag.url} value={tag.slug}>
                    {tag.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(value) => updatePostSearchParams("sortBy", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">없음</SelectItem>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="title">제목</SelectItem>
                <SelectItem value="reactions">반응</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={(value) => updatePostSearchParams("sortOrder", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 순서" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">오름차순</SelectItem>
                <SelectItem value="desc">내림차순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 게시물 테이블 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select
                value={limit.toString()}
                onValueChange={(value) => {
                  updatePostSearchParams("limit", value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
              <span>항목</span>
            </div>
            <div className="flex gap-2">
              <Button
                disabled={skip === 0}
                onClick={() => updatePostSearchParams("sortBy", Math.max(0, skip - limit).toString())}
              >
                이전
              </Button>
              <Button
                disabled={skip + limit >= total}
                onClick={() => updatePostSearchParams("skip", (skip + limit).toString())}
              >
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

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
            <Button onClick={addPostAndUpdate}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 수정 대화상자 */}
      <Dialog open={showEditDialog && !!selectedPost} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={selectedPost?.title || ""}
              onChange={(e) => setSelectedPost({ ...(selectedPost as Post), title: e.target.value })}
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={selectedPost?.body || ""}
              onChange={(e) => setSelectedPost({ ...(selectedPost as Post), body: e.target.value })}
            />
            <Button onClick={editPostAndUpdate}>게시물 업데이트</Button>
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
            <Button onClick={addCommentAndUpdate}>댓글 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 대화상자 */}
      <Dialog open={showEditCommentDialog && !!selectedComment} onOpenChange={setShowEditCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e) => setSelectedComment({ ...(selectedComment as Comment), body: e.target.value })}
            />
            <Button onClick={editCommentAndUpdate}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 상세 보기 대화상자 */}
      <Dialog open={showPostDetailDialog && !!selectedPost} onOpenChange={setShowPostDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText((selectedPost as Post)?.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText((selectedPost as Post)?.body, searchQuery)}</p>
            {renderComments(selectedPost?.id)}
          </div>
        </DialogContent>
      </Dialog>

      {/* 사용자 모달 */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>사용자 정보</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <img src={selectedUser?.image} alt={selectedUser?.username} className="w-24 h-24 rounded-full mx-auto" />
            <h3 className="text-xl font-semibold text-center">{selectedUser?.username}</h3>
            <div className="space-y-2">
              <p>
                <strong>이름:</strong> {selectedUser?.firstName} {selectedUser?.lastName}
              </p>
              <p>
                <strong>나이:</strong> {selectedUser?.age}
              </p>
              <p>
                <strong>이메일:</strong> {selectedUser?.email}
              </p>
              <p>
                <strong>전화번호:</strong> {selectedUser?.phone}
              </p>
              <p>
                <strong>주소:</strong> {selectedUser?.address?.address}, {selectedUser?.address?.city},{" "}
                {selectedUser?.address?.state}
              </p>
              <p>
                <strong>직장:</strong> {selectedUser?.company?.name} - {selectedUser?.company?.title}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PostsManager;

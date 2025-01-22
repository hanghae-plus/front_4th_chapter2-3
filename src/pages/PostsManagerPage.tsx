import { useEffect, useState } from "react";
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/card/ui";
import PostTable from "../widgets/post/PostTable.tsx";
import Pagination from "@features/ui/pagination.tsx";
import PostFilter from "@features/postFilter/ui/PostFilter.tsx";
import { NewPost, Post, PostResponse } from "../types/post.ts";
import { User, UserResponse } from "../types/user.ts";
import { Tag } from "../types/tag.ts";
import { usePostStore } from "@core/store/usePostStore.ts";
import { Button } from "@shared/button/ui";
import { useDialog } from "@shared/dialog/model/useDialog.ts";
import PostAddDialog from "@features/ui/PostAddDialog.tsx";
import { useTagStore } from "@core/store/useTagStore.ts";

const PostsManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const { posts, setPosts } = usePostStore();
  const { tags, setTags } = useTagStore();
  // UI 데이터

  const [comments, setComments] = useState({});

  // 페이지네이션 데이터
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"));
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"));
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "");
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc");

  // 새로 등록할 데이터
  const [newPost, setNewPost] = useState<NewPost>({ title: "", body: "", userId: 1 });
  const [newComment, setNewComment] = useState({ body: "", postId: null, userId: 1 });

  // 선택된 데이터
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "");
  const [selectedComment, setSelectedComment] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const { open } = useDialog();

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
  const fetchPosts = async () => {
    setLoading(true);
    let postsData: Post[];
    let usersData: User[];

    try {
      const postResponse: PostResponse = await (await fetch(`/api/posts?limit=${limit}&skip=${skip}`)).json();
      const userResponse: UserResponse = await (await fetch("/api/users?limit=0&select=username,image")).json();

      postsData = postResponse.posts;
      usersData = userResponse.users;

      const postsWithUsers = postsData.map((post) => ({
        ...post,
        author: usersData.find((user) => user.id === post.userId),
      }));

      setPosts(postsWithUsers);
      setTotal(postResponse.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const response = await fetch("/api/posts/tags");
      const data: Tag[] = await response.json();
      console.log(data);
      setTags(data);
    } catch (error) {
      console.error("태그 가져오기 오류:", error);
    }
  };

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts();
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`);
      const data = await response.json();
      setPosts(data.posts);
      setTotal(data.total);
    } catch (error) {
      console.error("게시물 검색 오류:", error);
    }
    setLoading(false);
  };

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag) => {
    if (!tag || tag === "all") {
      fetchPosts();
      return;
    }
    setLoading(true);
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ]);
      const postsData = await postsResponse.json();
      const usersData = await usersResponse.json();

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }));

      setPosts(postsWithUsers);
      setTotal(postsData.total);
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error);
    }
    setLoading(false);
  };

  // 게시물 추가
  const addPost = async () => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      setPosts([data, ...posts]);

      setNewPost({ title: "", body: "", userId: 1 });
    } catch (error) {
      console.error("게시물 추가 오류:", error);
    }
  };

  // 게시물 업데이트
  const updatePost = async () => {
    try {
      const response = await fetch(`/api/posts/${selectedPost.id}`, {
        // * 특정 함수 타입을 다른 함수로 취급해도 괜찮은가를 판단하는 기준

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPost),
      });
      const data = await response.json();
      setPosts(posts.map((post) => (post.id === data.id ? data : post)));
      setShowEditDialog(false);
    } catch (error) {
      console.error("게시물 업데이트 오류:", error);
    }
  };

  // 게시물 삭제
  const deletePost = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("게시물 삭제 오류:", error);
    }
  };

  // 댓글 가져오기
  const fetchComments = async (postId) => {
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const response = await fetch(`/api/comments/post/${postId}`);
      const data = await response.json();
      setComments((prev) => ({ ...prev, [postId]: data.comments }));
    } catch (error) {
      console.error("댓글 가져오기 오류:", error);
    }
  };

  // 댓글 추가
  const addComment = async () => {
    try {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });
      const data = await response.json();
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }));
      setShowAddCommentDialog(false);
      setNewComment({ body: "", postId: null, userId: 1 });
    } catch (error) {
      console.error("댓글 추가 오류:", error);
    }
  };

  // 댓글 업데이트
  const updateComment = async () => {
    try {
      const response = await fetch(`/api/comments/${selectedComment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: selectedComment.body }),
      });
      const data = await response.json();
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }));
      setShowEditCommentDialog(false);
    } catch (error) {
      console.error("댓글 업데이트 오류:", error);
    }
  };

  // 댓글 삭제
  const deleteComment = async (id, postId) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      });
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }));
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
    }
  };

  // 댓글 좋아요
  const likeComment = async (id, postId) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: comments[postId].find((c) => c.id === id).likes + 1 }),
      });
      const data = await response.json();
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
        ),
      }));
    } catch (error) {
      console.error("댓글 좋아요 오류:", error);
    }
  };

  // 게시물 상세 보기
  const openPostDetail = (post) => {
    setSelectedPost(post);
    fetchComments(post.id);
    setShowPostDetailDialog(true);
  };

  // 사용자 모달 열기
  const openUserModal = async (user) => {
    try {
      const response = await fetch(`/api/users/${user.id}`);
      const userData = await response.json();
      setSelectedUser(userData);
      setShowUserModal(true);
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag);
    } else {
      console.log("fetch");

      async function fetchPostData() {
        await fetchPosts();
      }

      fetchPostData();
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
  const renderComments = (postId) => (
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
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
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
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const handleOpenAddDialog = () => {
    open(<PostAddDialog />);
  };
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={handleOpenAddDialog}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostFilter />
          {/* 게시물 테이블 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}
          {/* 페이지네이션 */}
          <Pagination skip={skip} limit={limit} setLimit={setLimit} setSkip={setSkip} total={total} />
        </div>
      </CardContent>

      {/*/!* 게시물 추가 대화상자 *!/*/}

      {/*/!* 게시물 수정 대화상자 *!/*/}
      {/*<Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>*/}
      {/*  <DialogContent>*/}
      {/*    <DialogHeader>*/}
      {/*      <DialogTitle>게시물 수정</DialogTitle>*/}
      {/*    </DialogHeader>*/}
      {/*    <div className="space-y-4">*/}
      {/*      <Input*/}
      {/*        placeholder="제목"*/}
      {/*        value={selectedPost?.title || ""}*/}
      {/*        onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}*/}
      {/*      />*/}
      {/*      <Textarea*/}
      {/*        rows={15}*/}
      {/*        placeholder="내용"*/}
      {/*        value={selectedPost?.body || ""}*/}
      {/*        onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}*/}
      {/*      />*/}
      {/*      <Button onClick={updatePost}>게시물 업데이트</Button>*/}
      {/*    </div>*/}
      {/*  </DialogContent>*/}
      {/*</Dialog>*/}

      {/*/!* 댓글 추가 대화상자 *!/*/}
      {/*<Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>*/}
      {/*  <DialogContent>*/}
      {/*    <DialogHeader>*/}
      {/*      <DialogTitle>새 댓글 추가</DialogTitle>*/}
      {/*    </DialogHeader>*/}
      {/*    <div className="space-y-4">*/}
      {/*      <Textarea*/}
      {/*        placeholder="댓글 내용"*/}
      {/*        value={newComment.body}*/}
      {/*        onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}*/}
      {/*      />*/}
      {/*      <Button onClick={addComment}>댓글 추가</Button>*/}
      {/*    </div>*/}
      {/*  </DialogContent>*/}
      {/*</Dialog>*/}

      {/*/!* 댓글 수정 대화상자 *!/*/}
      {/*<Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>*/}
      {/*  <DialogContent>*/}
      {/*    <DialogHeader>*/}
      {/*      <DialogTitle>댓글 수정</DialogTitle>*/}
      {/*    </DialogHeader>*/}
      {/*    <div className="space-y-4">*/}
      {/*      <Textarea*/}
      {/*        placeholder="댓글 내용"*/}
      {/*        value={selectedComment?.body || ""}*/}
      {/*        onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}*/}
      {/*      />*/}
      {/*      <Button onClick={updateComment}>댓글 업데이트</Button>*/}
      {/*    </div>*/}
      {/*  </DialogContent>*/}
      {/*</Dialog>*/}

      {/*/!* 게시물 상세 보기 대화상자 *!/*/}
      {/*<Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>*/}
      {/*  <DialogContent className="max-w-3xl">*/}
      {/*    <DialogHeader>*/}
      {/*      <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>*/}
      {/*    </DialogHeader>*/}
      {/*    <div className="space-y-4">*/}
      {/*      <p>{highlightText(selectedPost?.body, searchQuery)}</p>*/}
      {/*      {renderComments(selectedPost?.id)}*/}
      {/*    </div>*/}
      {/*  </DialogContent>*/}
      {/*</Dialog>*/}

      {/*/!* 사용자 모달 *!/*/}
      {/*<Dialog open={showUserModal} onOpenChange={setShowUserModal}>*/}
      {/*  <DialogContent>*/}
      {/*    <DialogHeader>*/}
      {/*      <DialogTitle>사용자 정보</DialogTitle>*/}
      {/*    </DialogHeader>*/}
      {/*    <div className="space-y-4">*/}
      {/*      <img src={selectedUser?.image} alt={selectedUser?.username} className="w-24 h-24 rounded-full mx-auto" />*/}
      {/*      <h3 className="text-xl font-semibold text-center">{selectedUser?.username}</h3>*/}
      {/*      <div className="space-y-2">*/}
      {/*        <p>*/}
      {/*          <strong>이름:</strong> {selectedUser?.firstName} {selectedUser?.lastName}*/}
      {/*        </p>*/}
      {/*        <p>*/}
      {/*          <strong>나이:</strong> {selectedUser?.age}*/}
      {/*        </p>*/}
      {/*        <p>*/}
      {/*          <strong>이메일:</strong> {selectedUser?.email}*/}
      {/*        </p>*/}
      {/*        <p>*/}
      {/*          <strong>전화번호:</strong> {selectedUser?.phone}*/}
      {/*        </p>*/}
      {/*        <p>*/}
      {/*          <strong>주소:</strong> {selectedUser?.address?.address}, {selectedUser?.address?.city},{" "}*/}
      {/*          {selectedUser?.address?.state}*/}
      {/*        </p>*/}
      {/*        <p>*/}
      {/*          <strong>직장:</strong> {selectedUser?.company?.name} - {selectedUser?.company?.title}*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </DialogContent>*/}
      {/*</Dialog>*/}
    </Card>
  );
};

export default PostsManager;
